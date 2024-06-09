import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  // Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  // Legend
);

const fill_colors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 205, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(201, 203, 207, 0.2)',
  'rgba(136, 185, 37, 0.2)',
  'rgba(80, 180, 90, 0.2)',
]

const border_colors = [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(201, 203, 207)',
  'rgb(136, 185, 37)',
  'rgb(80, 180, 90)',
]

const options = {
  indexAxis: 'y',
  borderSkipped: false,
  scales: {
    x: {
      min: 0,
      max: 300,
    }
  },
}



/*
provide {
  [lock name]: [[start: int, end: int], ...]
}
*/
// {
//   label: '',
//   data: [{x:[20, 65], y: "device 1"}],
//   backgroundColor: fill_colors,
//   borderColor: border_colors,
//   borderWidth: 1
// }

function overlap(a1, a2, b1, b2) {
  return Math.max(a1, b1) < Math.min(a2, b2);
}
function get_track_number(track, start, end) {
  for (let i = 0; i < track.length; i++) {
    let collide = false;
    for (let j = 0; j < track[i].length; j++) {
      const interval = track[i][j].interval;
      if (overlap(start, end, interval[0], interval[1])) {
        collide = true;
        break;
      }
    }
    if (!collide) {
      track[i].push({ interval: [start, end] });
      return i;
    }
  }
  track.push([{ interval: [start, end] }])
  return track.length - 1;
}

function construct_data(timeline) {
  const lock_names = Object.keys(timeline);
  const tracks = { device: [], location: [] }
  const lock_to_track_number = {};
  for (let i = 0; i < lock_names.length; i++) {
    const intervals = timeline[lock_names[i]];
    const track = tracks[intervals.type];
    lock_to_track_number[lock_names[i]] = [];
    if (!track) throw Error("???");
    for (let j = 0; j < intervals.locks.length; j++) {
      const track_number = get_track_number(
        track,
        intervals.locks[j][0],
        intervals.locks[j][1],
      )
      lock_to_track_number[lock_names[i]].push(track_number);
    }
  }
  const datasets = [];
  for (let i = 0; i < lock_names.length; i++) {
    const intervals = timeline[lock_names[i]];
    const data = []
    for (let j = 0; j < intervals.locks.length; j++) {
      const track_number = lock_to_track_number[lock_names[i]][j];
      data.push({
        x: intervals.locks[j],
        y: `${intervals.type}_${track_number}`,
      })
    }
    datasets.push({
      label: lock_names[i],
      data: data,
      backgroundColor: fill_colors[i],
      borderColor: border_colors[i],
      borderWidth: 1,
    })
  }
  return datasets;
}


export const Timeline = ({ timeline }) => {
  return (
    <div style={{ width: '1000px', height: '600px' }}>
      <Bar
        options={options}
        data={{ datasets: construct_data(timeline) }}
      />
    </div>
  )
}
