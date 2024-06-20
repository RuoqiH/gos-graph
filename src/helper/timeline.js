export class TimelineContainer {
  constructor() {
    this.timeline = [];
  }

  add_interval(name, start, end, data) {
    this.timeline.push([start, end, name, data]);
    this.timeline.sort((a, b) => a[1] - b[1]);
  }

  find_time_from(start, duration, name) {
    let s = start;
    if (duration === null) {
      // if no duration is found, put it at the end of any conflict to avoid collision
      this.timeline.filter((e => e[2] === name)).forEach(e => { s = Math.max(e[1], s) })
      return s;
    }
    for (let i = 0; i < this.timeline.length; i++) {
      const [t_start, t_end, t_name, t_data] = this.timeline[i];
      if (t_name === name) {
        if (Math.max(t_start, s) < Math.min(t_end, s + duration)) {
          s = t_end;
        }
      }
    }
    return s;
  }

  get_intervals() {
    return this.timeline.map(v => ({ start: v[0], end: v[1], name: v[2], data: v[3] }));
  }

  validate() {
    for (let i = 0; i < this.timeline.length - 1; i++) {
      const [start_i, end_i, name_i] = this.timeline[i];
      for (let j = i + 1; j < this.timeline.length; j++) {
        const [start_j, end_j, name_j] = this.timeline[j];
        if (name_i === name_j && Math.max(start_i, start_j) < Math.min(end_i, end_j)) {
          alert("Collision, check console!!!")
          console.error(this.get_intervals());
        }
      }
    }
  }
}