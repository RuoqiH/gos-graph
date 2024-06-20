class Node {
  constructor(v) {
    this.value = v;
    this.prev = [];
    this.next = [];
    this.in_count = 0;
    this.out_count = 0;
  }
}

export class Graph {
  constructor({ nodes, edges }) {
    this.nodes = new Map(nodes.map(v=>[v.name, new Node(v)]))
    for (let i = 0; i < edges.length; i++) {
      const start = this.nodes.get(edges[i][0]);
      const end = this.nodes.get(edges[i][1]);
      start.next.push(end);
      start.out_count++;
      end.prev.push(start);
      end.in_count++;
    }
  }

  get_prereq_count() {
    return new Map(this.nodes.keys().map(e=>[e, this.nodes.get(e).in_count]));
  }

  get_node_map() {
    return new Map(this.nodes.keys().map(e=>[e, null]));
  }

  get_node(node_name) {
    return this.nodes.get(node_name);
  }

  get_total() {
    return this.nodes.size;
  }
}
