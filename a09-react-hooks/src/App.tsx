import React from 'react';
import './App.css';
import { ComponenteConUseEfect } from './components/ComponenteConUseEffect';
import { ComponenteConUsePersonalizado } from './components/ComponenteConUsePersonalizado';
import { ComponenteConUseState } from './components/ComponenteConUseState';

function App() {
  return (
    <div className="light">
      <div className="container">
        <div className="effect-example">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <h2>useState</h2>
              <ComponenteConUseState />
            </div>
          </div>
        </div>
        <div className="effect-example">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <h2>useEffect</h2>
              <ComponenteConUseEfect />
            </div>
          </div>
        </div>
        <div className="effect-example">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <h2>Custom Hook</h2>
              <ComponenteConUsePersonalizado />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
