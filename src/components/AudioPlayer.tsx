// src/components/AudioPlayer.tsx
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced SVG Icons
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

const SkipBackIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
    />
  </svg>
);

const SkipForwardIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
    />
  </svg>
);

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const trackList = React.useMemo(
    () => [
      "/audio/Master-A.mp3",
      "/audio/BBC4-Instrumental-JF-Master.mp3",
      "/audio/Destino-Francu-JFMaster2025.mp3",
      "/audio/Osmosis-Francu-JFMaster2025.mp3",
      "/audio/UwunuInstrumental-JF-Master.mp3",
      "/audio/Oddyssey-JF-Master.mp3",
      "/audio/FaceTheNight-Mazure-JF-Master.mp3",
      "/audio/SonarContigo-Mazure-JF-Master-2025.mp3",
    ],
    []
  );

  const trackNames = React.useMemo(
    () => [
      "Callar - Susy Joy",
      "BBC4 - Francu [Instrumental]",
      "Destino - Francu",
      "Osmosis - Francu",
      "Uwunu - Shani [Instrumental]",
      "Odyssey",
      "Face The Night - Mazure",
      "Soñar Contigo - Mazure",
    ],
    []
  );

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const controlsPanelRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const autoPlayNextRef = useRef(false);

  useEffect(() => {
    if (!showHint) return;
    const t = setTimeout(() => setShowHint(false), 20000);
    return () => clearTimeout(t);
  }, [showHint]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onLoaded = () => setDuration(audio.duration);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  useEffect(() => {
    if (!showControls) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        controlsPanelRef.current &&
        !controlsPanelRef.current.contains(e.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target as Node)
      ) {
        setShowControls(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showControls]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = trackList[currentTrackIndex];
    setCurrentTime(0);
    setDuration(0);

    if (isPlaying || autoPlayNextRef.current) {
      audio.play().catch(() => setIsPlaying(false));
    }
    autoPlayNextRef.current = false;
  }, [currentTrackIndex, trackList]);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error("Play failed:", error);
        setIsPlaying(false);
      });
    }
  }, [isPlaying]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (isMuted && val > 0) setIsMuted(false);
  };

  const toggleMute = useCallback(() => {
    setIsMuted((m) => !m);
    if (audioRef.current) audioRef.current.muted = !isMuted;
  }, [isMuted]);

  const toggleControls = () => {
    setShowControls((s) => !s);
    setShowHint(false);
  };

  const prevTrack = () =>
    setCurrentTrackIndex((i) => (i - 1 + trackList.length) % trackList.length);
  const nextTrack = () =>
    setCurrentTrackIndex((i) => (i + 1) % trackList.length);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = t;
    setCurrentTime(t);
  };

  const handleEnded = () => {
    autoPlayNextRef.current = true;
    setTimeout(nextTrack, 1000);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <audio
        ref={audioRef}
        src={trackList[currentTrackIndex]}
        onEnded={handleEnded}
        preload="auto"
      />

      {/* Toggle Button Container */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute -top-14 right-0 z-20 flex flex-col items-end pointer-events-none"
            >
              <motion.button
                type="button"
                onClick={() => {
                  setShowControls(true);
                  setShowHint(false);
                }}
                whileHover={{ scale: 1.05 }}
                className="pointer-events-auto mb-2 px-3 py-1.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-semibold rounded-lg shadow-lg animate-pulse cursor-pointer"
              >
                🎵 Click to listen
              </motion.button>
              <div className="w-2 h-2 mr-5 bg-sky-500 rotate-45 transform" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          ref={toggleButtonRef}
          onClick={toggleControls}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-3.5 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-black dark:to-gray-900 backdrop-blur-xl rounded-full text-white shadow-2xl border border-gray-700/50 hover:border-sky-500/50 transition-all duration-300"
          aria-label={
            showControls ? "Hide audio controls" : "Show audio controls"
          }
        >
          {/* Glow effect */}
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full bg-sky-500/20"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}

          <div className="relative z-10">
            {isMuted ? <SpeakerMutedIcon /> : <SpeakerLoudIcon />}
          </div>
        </motion.button>
      </div>

      {/* Control Panel */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            ref={controlsPanelRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-40 w-80 bg-gradient-to-br from-gray-900/95 to-black/95 dark:from-black/95 dark:to-gray-950/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden"
          >
            {/* Header with gradient */}
            <div className="relative px-5 pt-4 pb-3 bg-gradient-to-r from-sky-500/10 to-blue-500/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isPlaying ? "bg-green-500 animate-pulse" : "bg-gray-500"
                    }`}
                  />
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Now Playing
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {currentTrackIndex + 1} / {trackList.length}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white truncate">
                {trackNames[currentTrackIndex]}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">JF Mix | Master</p>
            </div>

            {/* Progress Section */}
            <div className="px-5 pt-4 pb-3 relative">
              {/* Custom styled progress bar */}
              <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full"
                  style={{ width: `${progress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
                {/* Glow effect on progress */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-sky-400/50 blur-sm"
                  style={{ width: `${progress}%` }}
                />
                {/* Seek input overlay - directly on top of progress bar */}
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  aria-label="Seek control"
                />
              </div>

              {/* Time display */}
              <div className="flex justify-between text-xs text-gray-400 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="px-5 pb-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <motion.button
                  onClick={prevTrack}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-300 hover:text-white"
                  aria-label="Previous track"
                >
                  <SkipBackIcon />
                </motion.button>

                <motion.button
                  onClick={togglePlayPause}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 rounded-full transition-all shadow-lg shadow-sky-500/30"
                  aria-label={isPlaying ? "Pause audio" : "Play audio"}
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </motion.button>

                <motion.button
                  onClick={nextTrack}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-300 hover:text-white"
                  aria-label="Next track"
                >
                  <SkipForwardIcon />
                </motion.button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3 px-2">
                <motion.button
                  onClick={toggleMute}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0 text-gray-300 hover:text-white"
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  <div className="w-5 h-5">
                    {isMuted ? <SpeakerMutedIcon /> : <SpeakerLoudIcon />}
                  </div>
                </motion.button>

                <div className="flex-1 relative">
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-sky-500 to-blue-600"
                      style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Volume control"
                  />
                </div>

                <span className="text-xs text-gray-500 font-mono w-8 text-right">
                  {Math.round((isMuted ? 0 : volume) * 100)}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AudioPlayer;
