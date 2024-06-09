import React, { useState } from 'react';
import './App.css';
import { DisplayGraph } from './components/Graph';
import { Timeline } from './components/Timeline';
import { FileInputComponent } from './components/FileInput';


const timeline = {
  "device 1": { locks: [[1, 100], [150, 200]], type: 'device' },
  "device 2": { locks: [[1, 50], [150, 250]], type: 'device' },
  "device 3": { locks: [[120, 140], [60, 100]], type: 'device' },
  "location 3": { locks: [[50, 60], [100, 140]], type: 'location' },
}

function App() {
  const [tab, setTab] = useState('graph');
  const [data, setData] = useState(null);
  console.log(tab);
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <FileInputComponent onFileInput={(data) => setData(data)} />
          <select id="choices" onChange={(e) => setTab(e.target.value)}>
            <option value="graph">Graph</option>
            <option value="timeline">Timeline</option>
          </select>
        </div>
        {
          tab === 'graph' ?
            <DisplayGraph data={data} />
            : tab === 'timeline' ?
              <Timeline timeline={timeline} />
              : null
        }
      </header>
    </div>
  );
}

export default App;
