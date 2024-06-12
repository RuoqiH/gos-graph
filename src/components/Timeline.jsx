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
import { parse_gos_to_timeline } from '../helper/utils';

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
  'rgba(249, 43, 88, 0.2)',
  'rgba(166, 93, 21, 0.2)',
  'rgba(180, 137, 38, 0.2)',
  'rgba(37, 193, 193, 0.2)',
  'rgba(29, 152, 234, 0.2)',
  'rgba(113, 46, 247, 0.2)',
  'rgba(96, 97, 100, 0.2)',
  'rgba(89, 128, 11, 0.2)',
  'rgba(30, 173, 44, 0.2)',
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
  'rgb(249, 43, 88)',
  'rgb(166, 93, 21)',
  'rgb(180, 137, 38)',
  'rgb(37, 193, 193)',
  'rgb(29, 152, 234)',
  'rgb(113, 46, 247)',
  'rgb(96, 97, 100)',
  'rgb(89, 128, 11)',
  'rgb(30, 173, 44)',
]




/*
provide {
  [lock name]: [[start: int, end: int], ...]
}
*/
// {
//   label: '',
//   data: [{x:[20, 65], y: 'device 1'}],
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

function construct_data(content) {
  const timeline = parse_gos_to_timeline(content);
  const lock_names = Object.keys(timeline);
  const tracks = { device: [], location: [] }
  const lock_to_track_number = {};
  let max = 0;
  for (let i = 0; i < lock_names.length; i++) {
    const intervals = timeline[lock_names[i]];
    const track = tracks[intervals.type];
    lock_to_track_number[lock_names[i]] = [];
    if (!track) throw Error('???');
    for (let j = 0; j < intervals.locks.length; j++) {
      const track_number = get_track_number(
        track,
        intervals.locks[j][0],
        intervals.locks[j][1],
      )
      max = Math.max(intervals.locks[j][1], max);
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
        y: `${intervals.type}_track_${track_number}`,
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
  const labels = [];
  const track_names = Object.keys(tracks);
  for (let i = 0; i < track_names.length; i++) {
    for (let j = 0; j < tracks[track_names[i]].length; j++) {
      labels.push(`${track_names[i]}_track_${j}`);
    }
  }
  return { max, labels, datasets };
}

export const Timeline = ({ content }) => {
  const { max, labels, datasets } = construct_data(content);
  const options = {
    indexAxis: 'y',
    borderSkipped: false,
    scales: {
      x: {
        min: 0,
        max: max,
      },
      y: {
        stacked: true,
      }
    },
  }
  return (
    <div style={{ width: '1000px', height: '600px' }}>
      <Bar
        options={options}
        data={{ labels: labels, datasets: datasets }}
      />
    </div>
  )
}
