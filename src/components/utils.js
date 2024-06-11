const devices = [
  {
    "name": "sf2-preamp-a-bioshake-1",
    "url": "https://sf2prabska1.robo.counsyl.com",
    "type": "bioshake"
  },
  {
    "name": "sf2-preamp-a-bioshake-2",
    "url": "https://sf2prabska2.robo.counsyl.com",
    "type": "bioshake"
  },
  {
    "name": "sf2-preamp-a-bioshake-3",
    "url": "https://sf2prabska3.robo.counsyl.com",
    "type": "bioshake"
  },
  {
    "name": "sf2-preamp-b-bioshake-1",
    "url": "https://sf2prbbska1.robo.counsyl.com",
    "type": "bioshake"
  },
  {
    "name": "sf2-preamp-b-bioshake-2",
    "url": "https://sf2prbbska2.robo.counsyl.com",
    "type": "bioshake"
  },
  {
    "name": "sf2-preamp-b-bioshake-3",
    "url": "https://sf2prbbska3.robo.counsyl.com",
    "type": "bioshake"
  },
  {
    "name": "sf2-preamp-a-delidder-1",
    "url": "https://sf2pradlda1.robo.counsyl.com",
    "type": "delidder"
  },
  {
    "name": "sf2-preamp-b-delidder-1",
    "url": "https://sf2prbdlda1.robo.counsyl.com",
    "type": "delidder"
  },
  {
    "name": "sf2-preamp-a-labeling-1",
    "url": "https://sf2pralbla1.robo.counsyl.com",
    "type": "labeler"
  },
  {
    "name": "sf2-preamp-b-labeling-1",
    "url": "https://sf2prblbla1.robo.counsyl.com",
    "type": "labeler"
  },
  {
    "name": "sf2-preamp-a-m200-1",
    "url": "https://sf2pram2ha1.robo.counsyl.com",
    "type": "m200"
  },
  {
    "name": "sf2-preamp-b-m200-1",
    "url": "https://sf2prbm2ha1.robo.counsyl.com",
    "type": "m200"
  },
  {
    "name": "sf2-preamp-a-microserve-1",
    "url": "https://sf2pramsva1.robo.counsyl.com",
    "type": "microserve"
  },
  {
    "name": "sf2-preamp-b-microserve-1",
    "url": "https://sf2prbmsva1.robo.counsyl.com",
    "type": "microserve"
  },
  {
    "name": "sf2-preamp-a-mover-1",
    "url": "https://sf2pramvra1.robo.counsyl.com",
    "type": "mover"
  },
  {
    "name": "sf2-preamp-a-mover-2",
    "url": "https://sf2pramvra2.robo.counsyl.com",
    "type": "mover"
  },
  {
    "name": "sf2-preamp-b-mover-1",
    "url": "https://sf2prbmvra1.robo.counsyl.com",
    "type": "mover"
  },
  {
    "name": "sf2-preamp-b-mover-2",
    "url": "https://sf2prbmvra2.robo.counsyl.com",
    "type": "mover"
  },
  {
    "name": "sf2-preamp-a-plateloc-1",
    "url": "https://sf2praploa1.robo.counsyl.com",
    "type": "plateloc"
  },
  {
    "name": "sf2-preamp-b-plateloc-1",
    "url": "https://sf2prbploa1.robo.counsyl.com",
    "type": "plateloc"
  },
  {
    "name": "sf2-preamp-a-platescanner-1",
    "url": "https://sf2praztha1.robo.counsyl.com",
    "type": "platescanner"
  },
  {
    "name": "sf2-preamp-b-platescanner-1",
    "url": "https://sf2prbztha1.robo.counsyl.com",
    "type": "platescanner"
  },
  {
    "name": "sf2-preamp-a-slide-1",
    "url": "https://sf2praslda1.robo.counsyl.com",
    "type": "slide"
  },
  {
    "name": "sf2-preamp-a-slide-2",
    "url": "https://sf2praslda2.robo.counsyl.com",
    "type": "slide"
  },
  {
    "name": "sf2-preamp-a-steristore-1",
    "url": "https://sf2prassta1.robo.counsyl.com",
    "type": "steristore"
  },
  {
    "name": "sf2-preamp-b-steristore-1",
    "url": "https://sf2prbssta1.robo.counsyl.com",
    "type": "steristore"
  },
  {
    "name": "sf2-preamp-a-t1e",
    "url": "https://preamp-tecan-app-t1e.robo.counsyl.com",
    "type": "t1"
  },
  {
    "name": "sf2-preamp-a-t2e",
    "url": "https://preamp-tecan-app-t2e.robo.counsyl.com",
    "type": "t2"
  },
  {
    "name": "sf2-preamp-a-b1c",
    "url": "https://preamp-b1c-app.robo.counsyl.com",
    "type": "b1"
  },
  {
    "name": "sf2-preamp-a-tubepicker-1",
    "url": "https://sf2pratpka1.robo.counsyl.com",
    "type": "tubepicker"
  },
  {
    "name": "sf2-preamp-a-vspin-1",
    "url": "https://sf2pravspa1.robo.counsyl.com",
    "type": "vspin"
  },
  {
    "name": "sf2-preamp-b-vspin-1",
    "url": "https://sf2prbvspa1.robo.counsyl.com",
    "type": "vspin"
  },
  {
    "name": "sf2-preamp-a-xpeel-1",
    "url": "https://sf2praxpla1.robo.counsyl.com",
    "type": "xpeel"
  },
  {
    "name": "sf2-preamp-b-xpeel-1",
    "url": "https://sf2prbxpla1.robo.counsyl.com",
    "type": "xpeel"
  },
  {
    "name": "sf2-preamp-b-tubepicker-1",
    "url": "https://sf2prbtpka1.robo.counsyl.com",
    "type": "tubepicker"
  }
];

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

export const parse_gos_to_timeline = (content) => {
  const graph = parse_gos_to_graph(content);

  return {
    "device 1": { locks: [[1, 100], [150, 200]], type: 'device' },
    "device 2": { locks: [[1, 50], [150, 250]], type: 'device' },
    "device 3": { locks: [[120, 140], [60, 100]], type: 'device' },
    "location 3": { locks: [[50, 60], [100, 140]], type: 'location' },
  };
}