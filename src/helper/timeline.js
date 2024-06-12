export class TimelineContainer {
  constructor() {
    this.timeline = [];
  }

  add_interval(name, start, end) {
    this.timeline.push([start, end, name]);
    this.timeline.sort((a, b) => a[1] - b[1]);
  }

  find_time_from(start, duration, name) {
    let s = start;
    for (let i = 0; i < this.timeline.length; i++) {
      const [t_start, t_end, t_name] = this.timeline[i];
      if (t_name === name) {
        if (Math.max(t_start, s) < Math.min(t_end, s + duration)) {
          s = t_end;
        }
      }
    }
    return s;
  }

  get_intervals() {
    return this.timeline.map(v => ({ start: v[0], end: v[1], name: v[2] }));
  }

  validate() {
    for (let i = 0; i < this.timeline.length - 1; i++) {
      const [start_i, end_i, name_i] = this.timeline[i];
      for (let j = i + 1; j < this.timeline.length; j++) {
        const [start_j, end_j, name_j] = this.timeline[j];
        if (name_i === name_j && Math.max(start_i, start_j) < Math.min(end_i, end_j)) {
          throw Error("Validation Error: " + String(this.get_intervals()));
        }
      }
    }
  }
}