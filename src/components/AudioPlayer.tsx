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
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
    />{" "}
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
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l-2.25 2.25M19.5 12l2.25-2.25M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
    />{" "}
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
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z"
    />{" "}
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
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 5.25v13.5m-7.5-13.5v13.5"
    />{" "}
  </svg>
);

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  // --- NEW: Refs for click outside detection ---
  const controlsPanelRef = useRef<HTMLDivElement>(null); // Ref for the control panel div
  const toggleButtonRef = useRef<HTMLButtonElement>(null); // Ref for the speaker toggle button
  // --- END NEW ---

  // Attempt autoplay on mount (no changes needed here)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.debug(
          "Initial autoplay attempt failed silently:",
          error.message
        );
      });
    }
  }, []);

  // Sync React state with audio element properties (no changes needed here)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // --- NEW: Effect for handling clicks outside the controls panel ---
  useEffect(() => {
    // Only add listener if controls are shown
    if (!showControls) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!event.target) return;

      // Check if click is outside the controls panel AND outside the toggle button
      if (
        controlsPanelRef.current &&
        !controlsPanelRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        // If click is outside both, hide the controls
        setShowControls(false);
      }
    };

    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    // Cleanup function to remove listeners
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showControls]); // Re-run this effect only when showControls changes
  // --- END NEW ---

  // Handler to toggle play/pause (no changes needed here)
  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error("Audio play failed on user interaction:", error);
        setIsPlaying(false); // Ensure state reflects failure if play fails
      });
    }
    // State is updated via event listeners now
  }, [isPlaying]);

  // Handler for volume change (no changes needed here)
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  };

  // Handler to toggle mute state (no changes needed here)
  const toggleMute = useCallback(() => {
    const currentlyMuted = !isMuted;
    setIsMuted(currentlyMuted);
    if (audioRef.current) {
      audioRef.current.muted = currentlyMuted;
    }
  }, [isMuted]);

  // Handler to toggle controls visibility (no changes needed here)
  const toggleControls = () => {
    setShowControls(!showControls);
  };

  // Effect to update isPlaying state based on actual audio events (no changes needed here)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  return (
    <>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/background-track.mp3"
        loop
        preload="auto"
      />

      {/* Fixed Speaker Button */}
      {/* --- NEW: Assign ref to the button --- */}
      <button
        ref={toggleButtonRef} // Assign ref here
        onClick={toggleControls}
        className="fixed bottom-5 right-5 z-50 p-2 bg-gray-800/70 dark:bg-black/70 backdrop-blur-sm rounded-full text-white hover:bg-gray-700 dark:hover:bg-gray-900 transition-colors shadow-lg"
        aria-label={
          showControls ? "Hide audio controls" : "Show audio controls"
        }
      >
        {isMuted ? <SpeakerMutedIcon /> : <SpeakerLoudIcon />}
      </button>
      {/* --- END NEW --- */}

      {/* Floating Control Panel */}
      {/* --- NEW: Assign ref to the panel div --- */}
      <div
        ref={controlsPanelRef} // Assign ref here
        className={`fixed bottom-20 right-5 z-40 bg-gray-800/80 dark:bg-black/80 backdrop-blur-md p-4 rounded-lg shadow-xl text-white transition-all duration-300 ease-in-out ${
          showControls
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* --- END NEW --- */}
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
