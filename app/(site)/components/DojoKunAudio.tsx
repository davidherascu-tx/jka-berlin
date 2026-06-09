'use client';

import { useState, useRef } from 'react';

function IconPlay() {
  return (
    <svg className="h-4 w-4 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function formatTime(s: number): string {
  if (!isFinite(s) || s < 0) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
}

type Variant = 'dark' | 'light';

export default function DojoKunAudio({ variant = 'dark' }: { variant?: Variant }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setCurrentTime(audio.currentTime);
    setProgress(audio.currentTime / audio.duration);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) setDuration(audio.duration);
  };

  const handleEnded = () => {
    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const bar = barRef.current;
    if (!audio || !bar) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
  };

  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
      isDark
        ? 'bg-white/5 border border-white/10'
        : 'bg-zinc-50 border border-zinc-200'
    }`}>
      <audio
        ref={audioRef}
        src="/dojokun.wav"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Play / Pause */}
      <button
        onClick={toggle}
        aria-label={playing ? 'Pause' : 'Abspielen'}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
      >
        {playing ? <IconPause /> : <IconPlay />}
      </button>

      {/* Label + progress bar */}
      <div className="flex-1 min-w-0">
        <p className={`text-[10px] font-bold tracking-[0.18em] uppercase mb-1.5 ${
          isDark ? 'text-zinc-500' : 'text-zinc-900'
        }`}>
          Dōjō Kun · Audio
        </p>
        <div
          ref={barRef}
          onClick={handleSeek}
          className={`h-1.5 rounded-full cursor-pointer ${
            isDark ? 'bg-white/10' : 'bg-zinc-200'
          }`}
        >
          <div
            className="h-full bg-red-600 rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Time */}
      <span className={`text-[11px] shrink-0 tabular-nums ${
        isDark ? 'text-zinc-500' : 'text-zinc-400'
      }`}>
        {formatTime(currentTime)}&thinsp;/&thinsp;{formatTime(duration)}
      </span>
    </div>
  );
}
