'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { FiPlay, FiPause, FiSquare } from 'react-icons/fi';

type Status = 'idle' | 'playing' | 'paused';

type Props = {
  text: string;
};

const subscribe = () => () => {};
const getSupported = () => 'speechSynthesis' in window;
const getServerSupported = () => false;

export default function DictationButton({ text }: Props) {
  const supported = useSyncExternalStore(
    subscribe,
    getSupported,
    getServerSupported,
  );
  const [status, setStatus] = useState<Status>('idle');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!supported) {
    return null;
  }

  function play() {
    const synth = window.speechSynthesis;

    if (status === 'paused') {
      synth.resume();
      setStatus('playing');
      return;
    }

    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => setStatus('idle');
    utterance.onerror = () => setStatus('idle');
    utteranceRef.current = utterance;
    synth.speak(utterance);
    setStatus('playing');
  }

  function pause() {
    window.speechSynthesis.pause();
    setStatus('paused');
  }

  function stop() {
    window.speechSynthesis.cancel();
    setStatus('idle');
  }

  const isPlaying = status === 'playing';

  return (
    <div className="flex items-center gap-1 print:hidden" role="group" aria-label="Listen to this post">
      <button
        type="button"
        onClick={isPlaying ? pause : play}
        className="btn btn-xs btn-ghost"
        aria-label={isPlaying ? 'Pause dictation' : 'Play dictation'}
      >
        {isPlaying ? <FiPause /> : <FiPlay />}
        <span>{isPlaying ? 'Pause' : status === 'paused' ? 'Resume' : 'Listen'}</span>
      </button>
      {status !== 'idle' && (
        <button
          type="button"
          onClick={stop}
          className="btn btn-xs btn-ghost"
          aria-label="Stop dictation"
        >
          <FiSquare />
        </button>
      )}
    </div>
  );
}
