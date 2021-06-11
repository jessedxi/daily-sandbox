import React, { useEffect, useContext, useReducer, useCallback } from "react";
import CallObjectContext from "../../CallObjectContext";
import {
  initialCallState,
  CLICK_ALLOW_TIMEOUT,
  PARTICIPANTS_CHANGE,
  CAM_OR_MIC_ERROR,
  FATAL_ERROR,
  callReducer,
  isLocal,
  isScreenShare,
  containsScreenShare,
  getMessage,
} from './callState';

export default function Call() {
  const callObject = useContext(CallObjectContext);
  const [callState, dispatch] = useReducer(callReducer, initialCallState);

  useEffect(() => {
    if (!callObject) return;

    const events = [
      "participant-joined",
      "participant-updated",
      "participant-left",
    ];

    function handleNewParticipantsState(event) {
      //event && logDailyEvent(event);
      dispatch({
        type: PARTICIPANTS_CHANGE,
        participants: callObject.participants(),
      });
    }

    //Use initial state
    handleNewParticipantsState();

    //Listen for changes in state
    for (const event of events) {
      callObject.on(event, handleNewParticipantsState);
    }

    //Stop Listening for changes in state
    return function cleanup() {
      for (const event of events) {
        callObject && callObject.off(event, handleNewParticipantsState);
      }
    };
  }, [callObject]);
  
  // SEND an app message to the remote participant whose tile was clicked on
  const sendHello = useCallback(
    (participantId) => {
      callObject && callObject.sendAppMessage({hello: 'world'}, participantId)
    }
  )


  function getTiles() {
    let largeTiles = [];
    let smallTiles = [];
    Object.entries(callState.callItems).forEach(([id, callItem]) => {
      const isLarge =
      isScreenShare(id) ||
      (!isLocal(id) && !containsScreenShare(callState.callItems));
      const title = (
        <Tile
          key={id}
          videoTrackState={callItem.videoTrackState}
          audioTrackState={callItem.audioTrackState}
          isLocalPerson={isLocal(id)}
          isLarge={isLarge}
          disableCornerMessage={isScreenShare(id)}
          onClick={
            isLocal(id)
            ? null 
            : () => {
              sendHello(id)
            }
          }
        ></Tile>
      )
    })
  }
}
