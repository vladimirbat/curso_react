import React from 'react';
import './App.css';
import {ComponenteConBorde} from './hoc/ComponenteConBorde';

function App() {
  return (
    <div className="App">
      <ComponenteConBorde innerHeight={200} innerWidth={400}/>
    </div>
  );
}

export default App;
