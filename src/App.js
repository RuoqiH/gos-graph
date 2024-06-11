import React, { useState } from 'react';
import './App.css';
import { DisplayGraph } from './components/Graph';
import { Timeline } from './components/Timeline';
import { FileInputComponent } from './components/FileInput';


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
            <DisplayGraph content={data} />
            : tab === 'timeline' ?
              <Timeline content={data} />
              : null
        }
      </header>
    </div>
  );
}

export default App;
