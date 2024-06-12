export class TimelineContainer {
  constructor() {
    this.timeline = [];
  }

  add_interval(name, start, end) {
    this.timeline.push([start, end, name]);
    this.timeline.sort((a, b) => b.start - a.start);
  }

  find_time_from(start, name) {
    let s = start;
    for (let i = 0; i < this.timeline.length; i++) {
      const [t_start, t_end, t_name] = this.timeline[i];
      if (t_name === name) {
        console.log(t_start, s, t_end);
      }
      if (s <= t_end && s >= t_start && t_name === name) {
        s = t_end;
      }
    }
    return s;
  }

  get_intervals() {
    return this.timeline.map(v => ({ start: v[0], end: v[1], name: v[2] }));
  }
}