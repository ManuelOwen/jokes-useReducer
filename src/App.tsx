import React from 'react';
import './App.scss';
import JokeReducer from './reducers/jokereducer';

function App() {
  return (
    <div className='app'>
      <JokeReducer />
    </div>
  );
}

export default App;
