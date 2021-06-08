import React, { useEffect, useContext, useReducer, useCallback } from "react";
import CallObjectContext from "../../CallObjectContext";

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
      //event && logDailyEent(event);
      dispatch({
        type: PARTICIPANTS_CHANGE,
        participants: callOBject.participants(),
      });
    }
  });
}
