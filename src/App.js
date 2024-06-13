import React, { useState } from 'react';
import './App.css';
import { FileInputComponent } from './components/FileInput';
import { DisplaySimpleGraph } from './components/SimpleGraph';
import { DisplayFullGraph } from './components/FullGraph';
import { Timeline } from './components/Timeline';

const DIMENSION = [1400, 800]

function App() {
  const [tab, setTab] = useState('timeline');
  const [data, setData] = useState(null);
  const [isToggled, setIsToggled] = React.useState(false);
  return (
    <div className='App'>
      <header className='App-header'>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <FileInputComponent onFileInput={(data) => setData(data)} />
          <select id='choices' onChange={(e) => setTab(e.target.value)}>
            <option value='timeline'>Timeline</option>
            <option value='simple graph'>Simple Graph</option>
            <option value='full graph'>Full Graph</option>
          </select>
          {
            tab === 'timeline' &&
            <button onClick={() => setIsToggled(t => !t)}>
              {isToggled ? 'By Process' : 'Stacked'}
            </button>
          }
        </div>
        {
          tab === 'simple graph' ?
            <DisplaySimpleGraph content={data} dimension={DIMENSION} />
            : tab === 'full graph' ?
              <DisplayFullGraph content={data} dimension={DIMENSION} />
              : tab === 'timeline' ?
                <Timeline content={data} by_process={isToggled} dimension={DIMENSION} />
                : null
        }
      </header>
    </div>
  );
}

export default App;
