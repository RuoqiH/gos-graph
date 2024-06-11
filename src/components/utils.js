import { device_type, devices } from "./constants";
const name2type = new Map(devices.map(item => [item.name, item.type]));

export const parse_gos_to_graph = (content) => {
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
    let current = "Start";
    let current_type = "barrier";
    for (let j = 0; j < lines.length; j++) {
      const line = lines[j].trimStart();
      const is_barrier = line.indexOf("barrier") === 0;
      const is_run = line.indexOf("run") === 0;
      const is_move = line.indexOf("move") === 0;
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
        if (is_move) { type = "mover" }
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
    const name = "End";
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

function get_estimate(device, method) {
  const info = device_type[device];
  if (!info) throw Error(device + " not found");
  const estimate = info['estimator']['estimate'];
  if (typeof estimate === 'number') {
    return estimate;
  }
  const method_estimate = estimate[method];
  if (!method_estimate) throw Error(method + " not found on " + device);
  return method_estimate;
}

export const parse_gos_to_timeline = (content) => {
  const graph = parse_gos_to_graph(content);

  return {
    "device 1": { locks: [[1, 100], [150, 200]], type: 'device' },
    "device 2": { locks: [[1, 50], [150, 250]], type: 'device' },
    "device 3": { locks: [[120, 140], [60, 100]], type: 'device' },
    "location 3": { locks: [[50, 60], [100, 140]], type: 'location' },
  };
}