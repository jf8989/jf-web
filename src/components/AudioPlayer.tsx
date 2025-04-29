/* eslint-disable react-hooks/exhaustive-deps */
// src/components/AudioPlayer.tsx
"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  DependencyList,
} from "react";

// SVG Icons (unchanged)
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
      d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l-2.25 2.25M19.5 12l2.25-2.25M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4-72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
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
  const [volume, setVolume] = useState(0.45);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [showHint, setShowHint] = useState(true); // NEW: onboarding hint

  // Playlist
  const trackList = useMemo(
    () => [
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
  const trackNames = useMemo(
    () => [
      "BBC4 - Francu [Instrumental] (JF Mix|Master)",
      "Destino - Francu (JF Mix|Master)",
      "Osmosis - Francu (JF Mix|Master)",
      "Uwunu - Shani [Instrumental] (JF Mix|Master)",
      "Odyssey (JF Master)",
      "Face The Night - Mazure (JF Mix|Master)",
      "Soñar Contigo - Mazure (JF Mix|Master)",
    ],
    []
  );
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Playhead
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const controlsPanelRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // NEW: flag to force autoplay of next track
  const autoPlayNextRef = useRef(false);

  // === Hint auto-dismiss after 20 s ===
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

  // Update source on track change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = trackList[currentTrackIndex];
    setCurrentTime(0);
    setDuration(0);

    // Autoplay if user was playing or if flag set by handleEnded
    if (isPlaying || autoPlayNextRef.current) {
      audio.play().catch(() => setIsPlaying(false));
    }
    autoPlayNextRef.current = false;
  }, [currentTrackIndex, trackList]); // intentionally exclude isPlaying to respect pause state

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
    setShowHint(false); // dismiss hint on first interaction
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

  // Advance after 1-second delay
  const handleEnded = () => {
    autoPlayNextRef.current = true;
    setTimeout(nextTrack, 1000);
  };

  return (
    <>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={trackList[currentTrackIndex]}
        onEnded={handleEnded}
        preload="auto"
      />

      {/* Toggle button + hint wrapper */}
      <div className="fixed bottom-5 right-5 z-50">
        {/* Onboarding hint */}
        {showHint && (
          <div className="absolute -top-12 right-0 flex flex-col items-end select-none">
            <span className="mb-1 text-xs bg-sky-600 text-white px-2 py-0 rounded-lg shadow-md animate-pulse">
              Click to listen
            </span>
            {/* Simple arrow down */}
            <div className="w-2 h-2 mr-4 bg-sky-600 rotate-45 transform"></div>
            {/* pulse ring (simplified) */}
            <span className="absolute inset-0 rounded-full bg-sky-400/40 animate-ping pointer-events-none"></span>
          </div>
        )}

        {/* Speaker Toggle Button */}
        <button
          ref={toggleButtonRef}
          onClick={toggleControls}
          className="relative p-2 bg-gray-800/70 dark:bg-black/70 backdrop-blur-sm rounded-full text-white hover:bg-gray-700 dark:hover:bg-gray-900 transition-colors shadow-lg"
          aria-label={
            showControls ? "Hide audio controls" : "Show audio controls"
          }
        >
          {isMuted ? <SpeakerMutedIcon /> : <SpeakerLoudIcon />}
        </button>
      </div>

      {/* Control Panel */}
      <div
        ref={controlsPanelRef}
        className={`fixed bottom-20 right-5 z-40 bg-gray-800/80 dark:bg-black/80 backdrop-blur-md p-4 rounded-lg shadow-xl text-white transition-all duration-300 ease-in-out ${
          showControls
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="mb-2 text-sm text-center font-semibold">
          {trackNames[currentTrackIndex]}
        </div>

        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-gray-600 rounded-lg cursor-pointer mb-1"
          aria-label="Seek control"
        />
        <div className="flex justify-between text-xs mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={prevTrack}
            className="p-1 hover:bg-gray-700 rounded-full"
            aria-label="Previous track"
          >
            ◀︎
          </button>

          <button
            onClick={togglePlayPause}
            className="p-1 hover:bg-gray-700 rounded-full"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <button
            onClick={nextTrack}
            className="p-1 hover:bg-gray-700 rounded-full"
            aria-label="Next track"
          >
            ▶︎
          </button>

          <button
            onClick={toggleMute}
            className="p-1 hover:bg-gray-700 rounded-full"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <SpeakerMutedIcon /> : <SpeakerLoudIcon />}
          </button>

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

// Custom useMemo implementation
function useMemo<T>(factory: () => T, deps: DependencyList): T {
  const [state, setState] = React.useState(factory);
  React.useEffect(() => setState(factory()), deps);
  return state;
}
