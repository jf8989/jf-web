// src/components/AudioPlayer.tsx
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

// SVG Icons (remain the same)
const SpeakerLoudIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
    />
  </svg>
);
const SpeakerMutedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l-2.25 2.25M19.5 12l2.25-2.25M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
    />
  </svg>
);
const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z"
    />
  </svg>
);
const PauseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 5.25v13.5m-7.5-13.5v13.5"
    />
  </svg>
);

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // --- New useEffect to attempt autoplay on mount ---
  useEffect(() => {
    if (audioRef.current) {
      // Attempt to play and silently catch any errors (like autoplay policy blocks)
      audioRef.current.play().catch((error) => {
        // Log for debugging, but don't show user or break anything
        console.debug(
          "Initial autoplay attempt failed silently:",
          error.message
        );
      });
      // We DO NOT set isPlaying to true here, as play() might have been blocked.
      // Actual playback state should be determined by events if needed later,
      // or when the user manually plays.
    }
  }, []); // Empty dependency array means this runs only once on mount

  // Sync React state with audio element properties
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Handler to toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false); // Update state on pause
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true); // Update state only on successful play
        })
        .catch((error) => {
          console.error("Audio play failed on user interaction:", error);
          setIsPlaying(false); // Ensure state reflects failure
        });
    }
    // setIsPlaying(!isPlaying); // Moved state update into promise/direct call
  }, [isPlaying]);

  // Handler for volume change
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  };

  // Handler to toggle mute state
  const toggleMute = useCallback(() => {
    const currentlyMuted = !isMuted;
    setIsMuted(currentlyMuted);
    if (audioRef.current) {
      audioRef.current.muted = currentlyMuted; // Also directly set muted prop on element
    }
  }, [isMuted]);

  // Handler to toggle controls visibility
  const toggleControls = () => {
    setShowControls(!showControls);
  };

  // Effect to update isPlaying state based on actual audio events (optional but robust)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    // const handleVolumeChange = () => { // Can also sync volume/mute state FROM element TO react state if needed
    //     setVolume(audio.volume);
    //     setIsMuted(audio.muted);
    // };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    // audio.addEventListener('volumechange', handleVolumeChange);

    // Cleanup listeners
    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      // audio.removeEventListener('volumechange', handleVolumeChange);
    };
  }, []); // Run once on mount to add listeners

  return (
    <>
      {/* Audio Element - IMPORTANT: Update src */}
      <audio
        ref={audioRef}
        src="/audio/background-track.mp3"
        loop
        preload="auto"
      />

      {/* Fixed Speaker Button */}
      <button
        onClick={toggleControls}
        className="fixed bottom-5 right-5 z-50 p-2 bg-gray-800/70 dark:bg-black/70 backdrop-blur-sm rounded-full text-white hover:bg-gray-700 dark:hover:bg-gray-900 transition-colors shadow-lg"
        aria-label={
          showControls ? "Hide audio controls" : "Show audio controls"
        }
      >
        {isMuted ? <SpeakerMutedIcon /> : <SpeakerLoudIcon />}
      </button>

      {/* Floating Control Panel */}
      <div
        className={`fixed bottom-20 right-5 z-40 bg-gray-800/80 dark:bg-black/80 backdrop-blur-md p-4 rounded-lg shadow-xl text-white transition-all duration-300 ease-in-out ${
          showControls
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center space-x-3">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="p-1 hover:bg-gray-700 rounded-full"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="p-1 hover:bg-gray-700 rounded-full"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <SpeakerMutedIcon /> : <SpeakerLoudIcon />}
          </button>

          {/* Volume Slider */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24 h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm accent-sky-500"
            aria-label="Volume control"
          />
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
