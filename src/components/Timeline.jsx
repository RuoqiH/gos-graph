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

export const Timeline = ({ locks }) => {
  const lock_names = Object.keys(locks);
  const datasets = [];
  for (let i = 0; i < lock_names.length; i++) {
    const data = []
    for (let j = 0; j < locks[lock_names[i]].length; j++) {
      data.push({ x: locks[lock_names[i]][j], y: lock_names[i] })
    }
    datasets.push({
      label: lock_names[i],
      data: data,
      backgroundColor: fill_colors,
      borderColor: border_colors,
      borderWidth: 1
    })
  }
  return (
    <div style={{ width: '1000px', height: '600px' }}>
      <Bar
        options={options}
        data={{ datasets: datasets }}
      />
    </div>
  )
}
