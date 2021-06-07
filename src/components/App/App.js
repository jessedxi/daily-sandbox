import React, { useEffect, useState, useCallback } from 'react';
import logo from '../../Ghulam.png';
import './App.css';
import DailyIframe from '@daily-co/daily-js';

const STATE_IDLE = 'STATE_IDLE';
const STATE_CREATING = 'STATE_CREATING';
const STATE_JOINING = 'STATE_JOINING';
const STATE_JOINED = 'STATE_JOINED';
const STATE_LEAVING = 'STATE_LEAVING';
const STATE_ERROR = 'STATE_ERROR';


function App() {

  // Meeting State represents where the user is in the lifecycle of their participation in a call.
  // This bit of code updates the meeting state 

  return (
    <div className="App">
      <header className="App-header">
       <h1>GHULAM SPIN</h1>
        <img src={logo} className="App-logo" alt="logo" />
       <h1>GHULAM SPIN</h1>
      </header>
    </div>
  );
}

export default App;
