import { device_type, devices, movers, nest_2_mover } from './constants';
import { Graph } from './graph';
import { TimelineContainer } from './timeline'

const name2type = new Map(devices.map(item => [item.name, item.type]));

export const parse_gos_to_simple_graph = (content) => {
  const result = {
    nodes: [
      { name: 'Start', barrier: true },
      { name: 'End', barrier: true },
    ], edges: []
  };
  const node_map = { 'Start': 1, 'End': 1 };
  const edge_map = {};
  const proc_prefix = /proc .*{/
  const index = content.indexOf(proc_prefix);
  let procs;
  if (index !== -1) {
    procs = content.substring(index).split(proc_prefix);
  }
  else {
    procs = content.split(proc_prefix);
  }
  for (let i = 0; i < procs.length; i++) {
    const lines = procs[i].split(/\r?\n/);
    let current = 'Start';
    let current_type = 'barrier';
    for (let j = 0; j < lines.length; j++) {
      const line = lines[j].trimStart();
      const is_barrier = line.indexOf('barrier') === 0;
      const is_run = line.indexOf('run') === 0;
      const is_move = line.indexOf('move') === 0;
      const args = line.split(' ');
      let name = args[1];
      if (is_barrier) {
        if (!node_map[name]) {
          result.nodes.push({ name: name, barrier: true });
          node_map[name] = 1;
        }
      }
      else if (is_run || is_move) {
        let type;
        if (is_move) { type = 'mover' }
        else { type = name2type.get(name) || name }
        const count = node_map[type] || 0;
        node_map[type] = count + 1;
        name = `${type}_${count}`;
        result.nodes.push({ name: name, type: type, barrier: false });
      }
      if (is_barrier || is_run || is_move) {
        if ((current_type !== 'barrier' || !is_barrier) && !(edge_map[current]?.has(name))) {
          result.edges.push([current, name]);
          if (!edge_map[current]) {
            edge_map[current] = new Set([name]);
          } else {
            edge_map[current].add(name);
          }
        }
        current = name;
        current_type = is_barrier ? 'barrier' : 'other';
      }
    }
    const name = 'End';
    if (current_type !== 'barrier' && !(edge_map[current]?.has(name))) {
      result.edges.push([current, name]);
      if (!edge_map[current]) {
        edge_map[current] = new Set([name]);
      } else {
        edge_map[current].add(name);
      }
    }
  }
  return result;
}

export const parse_gos_to_full_graph = (content) => {
  const graph = {
    nodes: [
      { name: 'Start', type: 'barrier' },
      { name: 'End', type: 'barrier' },
    ], edges: []
  };
  const node_map = { 'Start': 1, 'End': 1 };
  const edge_map = {};
  const proc_prefix = /proc .*{/
  const procs = content.split(proc_prefix).slice(1);
  const find_name_prefix = /proc\s+(\w+)\s*{/g;
  const procs_name = [];
  let matches;
  while ((matches = find_name_prefix.exec(content)) !== null) {
    procs_name.push(matches[1]);
  }
  if (procs.length !== procs_name.length) {
    throw Error("Procs length doesn't match");
  }

  for (let i = 0; i < procs.length; i++) {
    const proc_name = procs_name[i];
    const lines = procs[i].split(/\r?\n/);
    let current = 'Start';
    for (let j = 0; j < lines.length; j++) {
      const line = lines[j].trimStart();
      const is_barrier = line.indexOf('barrier') === 0;
      const is_run = line.indexOf('run') === 0;
      const is_move = line.indexOf('move') === 0;
      const is_lock = line.indexOf('lock') === 0;
      const is_unlock = line.indexOf('unlock') === 0;
      const args = line.split(' ');
      let name = args[1];
      if (is_barrier) {
        if (!node_map[name]) {
          graph.nodes.push({ name: name, type: 'barrier', display: name, proc: proc_name });
          node_map[name] = 1;
        }
      }
      else if (is_run || is_move) {
        let display, type;
        if (is_move) {
          display = 'mover';
          type = 'move';
        }
        else {
          display = name2type.get(name) || name;
          type = 'run';
        }
        const count = node_map[type] || 0;
        node_map[type] = count + 1;
        name = `${type}_${count}`;
        graph.nodes.push({ name: name, type: type, display: display, args: args, proc: proc_name });
      }
      else if (is_lock) {
        const display = name;
        const count = node_map[name] || 0;
        node_map[name] = count + 1;
        name = `${name}_${count}`;
        graph.nodes.push({ name: name, type: 'lock', display: display, proc: proc_name });
      }
      else if (is_unlock) {
        const display = name;
        const count = node_map[name] || 0;
        node_map[name] = count + 1;
        name = `${name}_${count}`;
        graph.nodes.push({ name: name, type: 'unlock', display: display, proc: proc_name });
      }
      if (is_barrier || is_run || is_move || is_lock || is_unlock) {
        if (!(edge_map[current]?.has(name))) {
          graph.edges.push([current, name]);
          if (!edge_map[current]) {
            edge_map[current] = new Set([name]);
          } else {
            edge_map[current].add(name);
          }
        }
        current = name;
      }
    }
    const name = 'End';
    if (!(edge_map[current]?.has(name))) {
      graph.edges.push([current, name]);
      if (!edge_map[current]) {
        edge_map[current] = new Set([name]);
      } else {
        edge_map[current].add(name);
      }
    }
  }
  return { graph, procs_name };
}

const MOVER_ESTIMATE = 19;

function get_estimate(device, method) {
  const info = device_type[name2type.get(device)];
  if (!info) throw Error(device + ' not found');
  const estimate = info['estimator']['estimate'];
  if (typeof estimate === 'number') {
    return estimate;
  }
  const method_estimate = estimate.filter(v => v[0] === method);
  // if (!method_estimate) throw Error(method + ' not found on ' + device);
  if (!method_estimate) return 0;
  return method_estimate[0][1];
}

function get_mover(src_nest, dest_nest) {
  // adhoc for handling script tag, not robust
  if (src_nest.indexOf("[%") === 0) {
    src_nest = src_nest.split(':')[1].split("%]")[0].trim();
  }
  if (dest_nest.indexOf("[%") === 0) {
    dest_nest = dest_nest.split(':')[1].split("%]")[0].trim();
  }
  const mover_src = nest_2_mover.get(src_nest);
  const mover_dest = nest_2_mover.get(dest_nest);
  if ((mover_src || mover_dest)) {
    if (!mover_src || !mover_dest) {
      return mover_src || mover_dest;
    }
    if (mover_src === mover_dest) {

    }
  }
  throw Error(`Mover not found for src: ${src_nest} and dest: ${dest_nest}\n src_mover: ${mover_src} \n dest_mover: ${mover_dest}`)
}

export const parse_gos_to_timeline = (content) => {
  if (!content) return { timeline: {} };
  const { graph, procs_name } = parse_gos_to_full_graph(content);
  const gg = new Graph(graph);
  const stack = []; // use stack to enforce always going through a proc if possible
  const prereq_count_map = gg.get_prereq_count();
  prereq_count_map.forEach((v, k) => {
    if (v === 0) stack.push(k);
  })
  const finish_time_map = gg.get_node_map();
  const lock_map = new Map();
  const timeline = new TimelineContainer();
  while (stack.length > 0) {
    const node_name = stack.pop();
    const node = gg.get_node(node_name);
    for (let i = 0; i < node.next.length; i++) {
      const key = node.next[i].value.name;
      const count = prereq_count_map.get(key);
      prereq_count_map.set(key, count - 1);
      if (count === 1) {
        stack.push(key);
      }
    }
    let finish_time = 0;
    for (let i = 0; i < node.prev.length; i++) {
      const key = node.prev[i].value.name;
      finish_time = Math.max(finish_time, finish_time_map.get(key));
    }
    if (node.value.type === 'run') {
      const device = node.value.args[1];
      const method = node.value.args[2];
      finish_time += get_estimate(device, method);
    }
    if (node.value.type === 'move') {
      const src = node.value.args[1];
      const dest = node.value.args[2];
      const mover = get_mover(src, dest);
      const lock_start = timeline.find_time_from(finish_time, MOVER_ESTIMATE, mover);
      finish_time = lock_start + MOVER_ESTIMATE;
      timeline.add_interval(mover, lock_start, finish_time, node.value.proc);
    }
    else if (node.value.type === 'lock') {
      const lock_name = node.value.display;
      let curr = node;
      let has_barrier = false;
      let duration = 0;
      let found = false;
      while (true) {
        curr = curr.next[0];
        if (curr.value.type === 'barrier') {
          has_barrier = true;
          break;
        }
        else if (curr.value.type === 'move') {
          duration += MOVER_ESTIMATE;
        }
        else if (curr.value.type === 'run') {
          const device = curr.value.args[1];
          const method = curr.value.args[2];
          duration += get_estimate(device, method);
        }
        else if (curr.value.type === 'unlock' && curr.value.display === lock_name) {
          found = true;
          break;
        }
      }
      if (has_barrier) {
        duration = null; // TODO: resolved lock duration with barriers
      }
      else if (found) {
      }
      else {
        throw Error("no unlock found for: " + lock_name)
      }
      const lock_start = timeline.find_time_from(finish_time, duration, lock_name);
      finish_time = lock_start;
      lock_map.set(lock_name, lock_start);
    }
    else if (node.value.type === 'unlock') {
      const lock_name = node.value.display;
      const lock_start = lock_map.get(lock_name);
      timeline.add_interval(lock_name, lock_start, finish_time, node.value.proc);
    }
    finish_time_map.set(node_name, finish_time);
  }
  const result = {};

  timeline.validate()
  const intervals = timeline.get_intervals();

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const name = interval.name;
    const type = name2type.has(name) ? 'device' : 'location';
    if (!result[name]) {
      result[name] = { locks: [], type: type }
    }
    result[name].locks.push([interval.start, interval.end, interval.data]);
  }
  return { timeline: result, procs_name };
}