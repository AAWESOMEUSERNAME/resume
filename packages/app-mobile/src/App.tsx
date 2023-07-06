import {} from 'react-dom';
import React from 'react';
import { ProgressiveText } from '@resume/common-components'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ProgressiveText trail={[]}>test</ProgressiveText>
        </a>
      </header>
    </div>
  );
}

export default App;
