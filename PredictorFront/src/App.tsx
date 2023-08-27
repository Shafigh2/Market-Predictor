import React from 'react';
import './App.css';
import SimpleComponent from './components/MainComponent/SimpleComponent';
import PredictorComponent from './components/PredictorComponent/PredictorComponent';

function App() {
    return (
        <div className="App">
            <SimpleComponent />
            <PredictorComponent />
        </div>
    );
}

export default App;
