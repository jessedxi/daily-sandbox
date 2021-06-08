import React, { useEffect, useState, useCallback } from "react";
import logo from "../../Ghulam.png";
import "./App.css";
import DailyIframe from "@daily-co/daily-js";
import api from "../../api";

const STATE_IDLE = "STATE_IDLE";
const STATE_CREATING = "STATE_CREATING";
const STATE_JOINING = "STATE_JOINING";
const STATE_JOINED = "STATE_JOINED";
const STATE_LEAVING = "STATE_LEAVING";
const STATE_ERROR = "STATE_ERROR";

function App() {
  const [appState, setAppState] = useState(STATE_IDLE);
  const [roomUrl, setRoomUrl] = useState(null);
  const [callObject, setCallObject] = useState(null);

  const createCall = useCallback(() => {
    setAppState(STATE_CREATING);
    return api
      .createRoom()
      .then((room) => room.url)
      .catch((error) => {
        console.log("Error creating room", error);
        setRoomUrl(null);
        setAppState(STATE_IDLE);
      });
  }, []);
  // Meeting State represents where the user is in the lifecycle of their participation in a call.
  // This useEffect function updates the meeting state:

  useEffect(() => {
    if (!callObject) return;

    const events = ["joined-meeting", "left-meeting", "error"];

    // In the demo he puts a parameter called event in this function, but it seems like
    // he's only using to console.log something so I didn't put it.
    // If everything's broken put it back in.
    function handleNewMeetingState() {
      switch (callObject.meetingState()) {
        case "joined-meeting":
          setAppState(STATE_JOINED);
          break;
        case "left-meeting":
          callObject.destroy().then(() => {
            setRoomUrl(null);
            setCallObject(null);
            setAppState(STATE_IDLE);
          });
          break;
        case "error":
          setAppState(STATE_ERROR);
          break;
        default:
          break;
      }
    }

    // use initial state
    handleNewMeetingState();

    // Listen for changes in state
    for (const event of events) {
      callObject.on(event, handleNewMeetingState);
    }

    // Stop listening for changes in state
    return function cleanup() {
      for (const event of events) {
        callObject.off(event, handleNewMeetingState);
      }
    };
  }, [callObject]);

  const lottaFlips = () => {
    let i = 0;
    let output = "";
    while (i < 500) {
      output += "Flip flip Flip ";
      i++;
    }
    return output;
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>GHULAM SPIN</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>GHULAM SPIN</h1>
        <span style={{ margin: "0 500px 0 500px", color: getRandomColor() }}>
          {lottaFlips()}
        </span>
      </header>
    </div>
  );
}

export default App;
