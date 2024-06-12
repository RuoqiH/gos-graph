import React, { useState } from 'react';
import './App.css';
import { FileInputComponent } from './components/FileInput';
import { DisplaySimpleGraph } from './components/SimpleGraph';
import { DisplayFullGraph } from './components/FullGraph';
import { Timeline } from './components/Timeline';


function App() {
  const [tab, setTab] = useState('simple graph');
  const [data, setData] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <FileInputComponent onFileInput={(data) => setData(data)} />
          <select id="choices" onChange={(e) => setTab(e.target.value)}>
            <option value="simple graph">Simple Graph</option>
            <option value="full graph">Full Graph</option>
            <option value="timeline">Timeline</option>
          </select>
        </div>
        {
          tab === 'simple graph' ?
            <DisplaySimpleGraph content={data} />
            : tab === 'full graph' ?
              <DisplayFullGraph content={data} />
              : tab === 'timeline' ?
                <Timeline content={data} />
                : null
        }
      </header>
    </div>
  );
}

export default App;
