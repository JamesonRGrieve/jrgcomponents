import React, { useState, useEffect } from 'react';
import { Button, Box, Slider, Typography } from '@mui/material';
import { PlayArrow, Pause, Stop } from '@mui/icons-material';

export type AudioPlayerProps = {
  base64audio: string;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ base64audio }) => {
  const [audio, setAudio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showTimeRemaining, setShowTimeRemaining] = useState(false);

  useEffect(() => {
    setAudio(new Audio(base64audio.startsWith('data:audio') ? base64audio : `data:audio/wav;base64,${base64audio}`));
  }, [base64audio]);

  useEffect(() => {
    audio.addEventListener('ended', () => {
      // console.log('Clip ended!');
      setIsPlaying(false);
      setCurrentTime(0);
    });
    audio.addEventListener('loadedmetadata', () => {
      // console.log('Metadata loaded!');
      setDuration(audio.duration);
    });
    audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime));

    return () => {
      audio.removeEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
      audio.removeEventListener('loadedmetadata', () => setDuration(audio.duration));
      audio.removeEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
    };
  }, [audio]);

  const playAudio = () => {
    setIsPlaying(true);
    audio.play();
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    audio.pause();
  };

  const stopAudio = () => {
    setIsPlaying(false);
    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    const newCurrentTime = Array.isArray(newValue) ? newValue[0] : newValue;
    audio.currentTime = newCurrentTime;
    setCurrentTime(newCurrentTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center' gap='1rem'>
      <Typography onClick={() => setShowTimeRemaining(!showTimeRemaining)} sx={{ cursor: 'pointer' }}>
        {showTimeRemaining ? `-${formatTime(duration - currentTime)}` : formatTime(currentTime)}
      </Typography>
      <Slider value={currentTime} max={duration} onChange={handleSliderChange} />
      <Typography>{formatTime(duration)}</Typography>
      <Button onClick={playAudio} disabled={isPlaying}>
        <PlayArrow />
      </Button>
      <Button onClick={pauseAudio} disabled={!isPlaying}>
        <Pause />
      </Button>
      <Button onClick={stopAudio} disabled={currentTime === 0}>
        <Stop />
      </Button>
    </Box>
  );
};

export default AudioPlayer;
