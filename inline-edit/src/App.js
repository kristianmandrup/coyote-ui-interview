import React from 'react';
import logo from './logo.svg';
import './App.css';
import { InlineEdit } from './InlineEdit/Component';

function App() {
  return (
    <div className="App">
      <InlineEdit text="Hello" />
    </div>
  );
}

export default App;
