import React, {useEffect, useMemo, useRef } from 'react';





/**
 * Props
 * - videoTrackState: DailyTrackState?
 * - audioTrackState: DailyTrackState?
 * - isLocalPerson: boolean
 * - isLarge: boolean
 * - disableCornerMessage: boolean
 * - onClick: Function
 */

export default function Tile(props) {
  const videoEl = useRef(null);
  const audioEl = useRef(null);

  const videoTrack = useMemo(() => {
    return props.videoTrackState && props.videoTrackState.state === 'playable' ? props.videoTrackState.track
    : null;
  }, [props.videoTrackState])
  
  const audioTrack = useMemo(() => {
    return props.audioTrackState && props.audioTrackState.state === 'playable' ? props.audioTrackState.track
    : null;
  }, [props.audioTrackState])

  const videoUnavailableMessage = useMemo(() => {
    return getTrackUnavailableMessage('video', props.videoTrackState)
  }, [props.videoTrackState])
  
  const audioUnavailableMessage = useMemo(() => {
    return getTrackUnavailableMessage('audio', props.audioTrackState)
  }, [props.audioTrackState])

  // THERE'S SOME USEEFFECT SHIT THAT GOES HERE (about line 65 in source code)

  function getVideoComponent() {
    return videoTrack && <video autoPlay muted playsInline ref={videoEl} />
  }

  function getAudioComponent() {
    return (
      !props.isLocalPerson && audioTrack && <audio autoPlay playsInline ref={audioEl} />
    )
  }

  function getClassNames() {
    let classNames = 'tile';
    classNames += props.isLarge ? ' large' : ' small';
    props.isLocalPerson && (classNames += ' local');
    return classNames;
  }

  return (
    <div className={getClassNames()} onClick={props.onClick}>
      <div className="background" />
      {getVideoComponent()}
      {getAudioComponent()}
    </div>
  );
}