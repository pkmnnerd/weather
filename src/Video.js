import React, { useEffect, useState, useRef } from 'react'
import ReactPlayer from 'react-player'


import TIMES from './times';

const URLS = {
  cityfolk: 'https://www.youtube.com/watch?v=ZQZ6sKfFgPM',
  newleaf: 'https://www.youtube.com/watch?v=7FSPHi4mYWg',
}

export default function Video(props) {
  const { hour, weather, game } = props;
  const player = useRef(null);
  const {
    loopAfter, duration, clearStart, rainStart, snowStart
  } = TIMES[game][hour]
  let startSec = clearStart;
  if (weather === 'rain') {
    startSec = rainStart;
  } else if (weather === 'snow') {
    startSec = snowStart;
  }
  const loopSec = startSec + loopAfter;
  const [lastHour, setLastHour] = useState(null);

  const onStart = () => {
    if (player && player.current) {
      player.current.getInternalPlayer().seekTo(startSec, 'seconds')
    }
  }

  useEffect(() => {
    if (lastHour === null) {
      setLastHour(hour);
    }
    if (lastHour !== hour) {
      if (player && player.current && lastHour) {
        player.current.getInternalPlayer().seekTo(startSec, 'seconds');
      }
      setLastHour(hour);
    }
  }, [startSec, player, hour, lastHour])

  const onProgress = (progress) => {
    if (progress.playedSeconds > loopSec) {
      player.current.getInternalPlayer().seekTo(progress.playedSeconds - duration, 'seconds')
    }
  }

  return (
    <div>
      <div style={{display: 'inline-block', aspectRatio: '1.77', width: '20vw'}}>
        <ReactPlayer
          ref={player}
          url={URLS[game]}
          width="100%"
          height="100%"
          controls
          loop
          onStart={onStart}
          onProgress={onProgress}
        />
      </div>
    </div>
  )
}