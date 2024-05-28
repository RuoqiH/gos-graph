import './App.css';
import { DisplayGraph } from './g';
import { Timeline } from './b';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Timeline />
        <DisplayGraph />
      </header>
    </div>
  );
}

export default App;
