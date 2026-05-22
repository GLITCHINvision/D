import React, { useState, useEffect, useRef } from 'react';
import { triggerMograBurst } from './MograCanvas';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const sequencerTimeoutRef = useRef(null);
  const isPlayingRef = useRef(false);
  
  // Track scheduler state
  const nextNoteTimeRef = useRef(0.0);
  const beatIndexRef = useRef(0);
  
  const tempo = 65; // BPM
  const secondsPerBeat = 60 / (tempo * 2); // 1 eighth note in 6/8 time (~0.46s)

  // Frequencies mapping
  const notes = {
    // Octave 2
    E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, B2: 123.47,
    // Octave 3
    C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, Gs3: 207.65, A3: 220.00, Bb3: 233.08, B3: 246.94, Cb3: 246.94, Cs3: 138.59, Ds3: 155.56, Fs3: 185.00,
    // Octave 4
    C4: 261.63, Cs4: 277.18, D4: 293.66, Ds4: 311.13, E4: 329.63, F4: 349.23, Fs4: 369.99, G4: 392.00, Gs4: 415.30, A4: 440.00, As4: 466.16, B4: 493.88,
    // Octave 5
    C5: 523.25, Cs5: 554.37, D5: 587.33, Ds5: 622.25, E5: 659.25, F5: 698.46, Fs5: 739.99, G5: 783.99, A5: 880.00
  };

  // Define Chords arpeggio arps (6 eighth notes per chord)
  const chords = [
    // Verse 1
    ['C3', 'G3', 'C4', 'E4', 'G4', 'E4'], // C
    ['E2', 'B2', 'E3', 'G3', 'B3', 'G3'], // Em
    ['A2', 'E3', 'A3', 'C4', 'E4', 'C4'], // Am
    ['F2', 'C3', 'F3', 'A3', 'C4', 'A3'], // F
    ['C3', 'G3', 'C4', 'E4', 'G4', 'E4'], // C
    ['G2', 'D3', 'G3', 'B3', 'D4', 'B3'], // G
    ['F2', 'C3', 'F3', 'A3', 'C4', 'A3'], // F (half)
    ['G2', 'D3', 'G3', 'B3', 'D4', 'B3'], // G (half)
    ['C3', 'G3', 'C4', 'E4', 'G4', 'E4'], // C

    // Verse 2
    ['C3', 'G3', 'C4', 'E4', 'G4', 'E4'], // C
    ['E2', 'B2', 'E3', 'G3', 'B3', 'G3'], // Em
    ['A2', 'E3', 'A3', 'C4', 'E4', 'C4'], // Am
    ['F2', 'C3', 'F3', 'A3', 'C4', 'A3'], // F
    ['C3', 'G3', 'C4', 'E4', 'G4', 'E4'], // C
    ['G2', 'D3', 'G3', 'B3', 'D4', 'B3'], // G
    ['F2', 'C3', 'F3', 'A3', 'C4', 'A3'], // F (half)
    ['G2', 'D3', 'G3', 'B3', 'D4', 'B3'], // G (half)
    ['C3', 'G3', 'C4', 'E4', 'G4', 'E4'], // C

    // Chorus / Bridge ("Like a river flows...")
    ['E2', 'B2', 'E3', 'G3', 'B3', 'G3'], // Em
    ['B2', 'Fs3', 'B3', 'Ds4', 'Fs4', 'Ds4'], // B7
    ['E2', 'B2', 'E3', 'G3', 'B3', 'G3'], // Em
    ['B2', 'Fs3', 'B3', 'Ds4', 'Fs4', 'Ds4'], // B7
    ['E2', 'B2', 'E3', 'G3', 'B3', 'G3'], // Em
    ['A2', 'E3', 'A3', 'Cs4', 'G4', 'Cs4'], // A7
    ['D3', 'A3', 'D4', 'F4', 'A4', 'F4'], // Dm
    ['G2', 'D3', 'F3', 'G3', 'B3', 'G3'], // G7

    // Verse 3 (Back to main theme)
    ['C3', 'G3', 'C4', 'E4', 'G4', 'E4'], // C
    ['E2', 'B2', 'E3', 'G3', 'B3', 'G3'], // Em
    ['A2', 'E3', 'A3', 'C4', 'E4', 'C4'], // Am
    ['F2', 'C3', 'F3', 'A3', 'C4', 'A3'], // F
    ['C3', 'G3', 'C4', 'E4', 'G4', 'E4'], // C
    ['G2', 'D3', 'G3', 'B3', 'D4', 'B3'], // G
    ['F2', 'C3', 'F3', 'A3', 'C4', 'A3'], // F (half)
    ['G2', 'D3', 'G3', 'B3', 'D4', 'B3'], // G (half)
    ['C3', 'G3', 'C4', 'E4', 'G4', 'E4'], // C
    ['C3', 'G3', 'C4', 'E4', 'G4', 'E4']  // C (ending ring)
  ];

  // Melody arrangement for soft love theme
  // Scheduled beat indicates eighth-note ticks. Each eighth note is a pulse.
  // 6 pulses = 1 measure.
  const melody = [
    // Soft original love theme (simplified)
    { beat: 0, note: 'C4', dur: 3 },   // gentle start
    { beat: 3, note: 'E4', dur: 3 },   // warm rise
    { beat: 6, note: 'G4', dur: 3 },   // bright peak
    { beat: 9, note: 'C5', dur: 6 },   // sweet hold
    { beat: 15, note: 'B4', dur: 3 },  // tender fall
    { beat: 18, note: 'A4', dur: 3 },  // soft descent
    { beat: 21, note: 'G4', dur: 6 },  // lingering
    { beat: 27, note: 'F4', dur: 3 },  // warm return
    { beat: 30, note: 'E4', dur: 3 },  // gentle
    { beat: 33, note: 'D4', dur: 3 },  // low
    { beat: 36, note: 'C4', dur: 6 }   // resolve
  ];

  const totalBeats = chords.length * 6; // 38 chords * 6 beats = 228 (we extend arps to cover 276+)

  // Synthesize a classic fingerstyle acoustic guitar tone for the chords
  const playGuitarString = (freq, time, volumeMultiplier = 1) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(gainNodeRef.current);

    // Warm triangle-wave guitar pluck
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    // Pluck envelope
    const dur = 1.6;
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(0.08 * volumeMultiplier, time + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + dur);

    // Low-pass filter to sound warm and mellow (removes digital harshness)
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, time);
    filter.frequency.exponentialRampToValueAtTime(300, time + dur);

    osc.start(time);
    osc.stop(time + dur);
  };

  // Synthesize a dreamy, romantic whistling voice / flute tone for Elvis's vocal melody
  const playVocalMelody = (freq, time, durSeconds) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    const osc = ctx.createOscillator();
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);
    
    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(gainNodeRef.current);

    // Soft flute sine-wave
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Dynamic vibrato (Elvis's iconic romantic vocal shake)
    vibrato.frequency.value = 5.2; // Hz
    vibratoGain.gain.setValueAtTime(0, time);
    vibratoGain.gain.linearRampToValueAtTime(freq * 0.01, time + 0.2); // Start vibrato slightly late

    // Volume Envelope
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(0.14, time + 0.1);
    gainNode.gain.setValueAtTime(0.14, time + durSeconds - 0.12);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + durSeconds);

    // Mellow filter for a vintage vocal warmth
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, time);

    vibrato.start(time);
    osc.start(time);
    
    vibrato.stop(time + durSeconds);
    osc.stop(time + durSeconds);
  };

  // The Scheduler Loop
  const scheduler = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    // While there are notes to play before the lookahead window
    while (nextNoteTimeRef.current < ctx.currentTime + 0.3) {
      scheduleNote(beatIndexRef.current, nextNoteTimeRef.current);
      
      // Advance to next beat tick
      nextNoteTimeRef.current += secondsPerBeat;
      beatIndexRef.current = (beatIndexRef.current + 1) % (46 * 6); // Loop back when song completes (outro beat)
    }

    // Schedule next polling callback
    sequencerTimeoutRef.current = setTimeout(scheduler, 50);
  };

  // Schedule chords and vocal melody at specific ticks
  const scheduleNote = (beat, time) => {
    // 1. Play Chord accompaniment (Arpeggio)
    // There are 6 beats per measure.
    const chordIndex = Math.floor(beat / 6) % chords.length;
    const arpStep = beat % 6;
    const currentChord = chords[chordIndex];

    if (currentChord && currentChord[arpStep]) {
      const freq = notes[currentChord[arpStep]];
      if (freq) {
        // First note of measure (downbeat bass) is slightly louder
        const volumeMul = arpStep === 0 ? 1.3 : 0.95;
        playGuitarString(freq, time, volumeMul);
      }
    }

    // 2. Play Vocal Melody
    const melodyNote = melody.find(m => m.beat === beat);
    if (melodyNote) {
      const freq = notes[melodyNote.note];
      if (freq) {
        const durationSec = melodyNote.dur * secondsPerBeat;
        playVocalMelody(freq, time, durationSec);
      }
    }
  };

  // Handle Play/Pause
  const togglePlay = () => {
    if (!audioCtxRef.current) {
      // Lazy initialize audio context
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const mainGain = ctx.createGain();
      mainGain.connect(ctx.destination);
      
      audioCtxRef.current = ctx;
      gainNodeRef.current = mainGain;
    }

    // Update volume setting
    gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);

    if (isPlaying) {
      // Pause
      clearTimeout(sequencerTimeoutRef.current);
      setIsPlaying(false);
      isPlayingRef.current = false;
      if (audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
    } else {
      // Play
      setIsPlaying(true);
      isPlayingRef.current = true;
      
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      
      // Sync clock and play first beat immediately
      nextNoteTimeRef.current = audioCtxRef.current.currentTime + 0.05;
      scheduler();
      
      // Spawn beautiful Mogra burst at the record player location
      triggerMograBurst(window.innerWidth / 2, window.innerHeight - 80);
    }
  };

  // Handle volume changes
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Autoplay on component mount
  useEffect(() => {
    // Small delay to satisfy browser autoplay policy (requires user interaction first click)
    const timer = setTimeout(() => {
      togglePlay();
    }, 800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeout(sequencerTimeoutRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="retro-player">
      <div className="vinyl-container" onClick={togglePlay}>
        {/* Record Arm */}
        <div className={`record-arm ${isPlaying ? 'playing' : ''}`}></div>
        
        {/* Spinning Vinyl Record Disc */}
        <div className={`vinyl-disc ${isPlaying ? 'spinning' : ''}`}>
          <div className="vinyl-label">
            <div className="vinyl-label-heart">🩺</div>
          </div>
        </div>
      </div>

      <div className="player-details">
        
        <div className="player-controls">
          <button className="play-toggle-btn" onClick={togglePlay}>
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>
          
          <div className="volume-slider-container">
            <span style={{ fontSize: '0.85rem' }}>🔈</span>
            <input
              type="range"
              min="0"
              max="0.8"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="volume-slider"
            />
            <span style={{ fontSize: '0.85rem' }}>🔊</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
