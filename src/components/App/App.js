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
  const [appState, setAppState] = useState(STATE_IDLE);
  const [roomUrl, setRoomUrl] = useState(null)
  const [callObject, setCallObject] = useState(null)

  // Meeting State represents where the user is in the lifecycle of their participation in a call.
  // This useEffect function updates the meeting state:

  useEffect(() => {
    if (!callObject) return;

    const events = ['joined-meeting', 'left-meeting', 'error'];

    // In the demo he puts a parameter called event in this function, but it seems like
    // he's only using to console.log something so I didn't put it.
    // If everything's broken put it back in.
    function handleNewMeetingState() {
      switch (callObject.meetingState()) {
        case 'joined-meeting':
          setAppState(STATE_JOINED);
         break;
        case 'left-meeting':
          callObject.destroy().then(() => {
            setRoomUrl(null);
            setCallObject(null);
            setAppState(STATE_IDLE)
          })
          break;
        case 'error':
          setAppState(STATE_ERROR);
          break;
        default:
         break;
      }
    }

    
  })

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
