import React, { useState } from 'react';
import './App.css';
import MograCanvas, { triggerMograBurst } from './components/MograCanvas';
import ConfettiExplosion, { triggerConfetti, playConfettiSound } from './components/ConfettiExplosion';
import EasterEggs from './components/EasterEggs';
import AmbientEffects from './components/AmbientEffects';
import AudioPlayer from './components/AudioPlayer';
import CoconutSVG from './components/CoconutSVG';
import PrescriptionCard from './components/PrescriptionCard';
import {
  AngryHeartSVG,
  ChaiSVG,
  RuledLetterSVG,
  StethoscopeBeatSVG,
  DoctorDreamSVG,
  BlushingStethoscopeSVG
} from './components/VectorArt';

function App() {
  const [screenIndex, setScreenIndex] = useState(0); // 0 (intro), 1-5 (story), 6 (stubborn), 7 (prescription)
  const [runawayOffset, setRunawayOffset] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const [stubbornText, setStubbornText] = useState("Fine, I smiled a little");

  // Web Audio sound effects for slide transitions
  const playTransitionSound = (index) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const frequencies = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
      const freq = frequencies[index % frequencies.length];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.04, now + 0.12);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch (e) {
      console.warn("Audio sound blocked or not supported:", e);
    }
  };

  const playChordSuccessSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const chord = [261.63, 329.63, 392.00, 523.25, 659.25]; // C major arpeggio

      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + (idx * 0.05));

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.1, now + (idx * 0.05) + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.start(now + (idx * 0.05));
        osc.stop(now + 1.3);
      });
    } catch (e) {
      console.warn("Success sound failed:", e);
    }
  };

  const startStory = (e) => {
    playTransitionSound(0);
    setScreenIndex(1);
    
    // Spawn falling flowers burst from the clicked location
    triggerMograBurst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2);
  };

  const nextStory = (e) => {
    // Sparkle burst where button is clicked
    triggerMograBurst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2);

    if (screenIndex < 5) {
      playTransitionSound(screenIndex);
      setScreenIndex(screenIndex + 1);
    } else {
      playTransitionSound(5);
      setScreenIndex(6); // Stubborn card screen
    }
  };

  const handleStubbornHover = (e) => {
    if (attempts < 2) {
      const nextAttempt = attempts + 1;
      setAttempts(nextAttempt);
      
      // Play a playful tiny alarm pluck
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        osc.connect(ctx.destination);
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } catch (err) {}

      // Playful shift coordinates
      const maxDistance = 65;
      const randX = (Math.random() * maxDistance * 2) - maxDistance;
      const randY = (Math.random() * maxDistance * 2) - maxDistance;
      setRunawayOffset({ x: randX, y: randY });

      const funnyPhrases = [
        "Wait, you sure you smiled? 🤔",
        "Are you really not angry? 😤",
        "Fine, I smiled a little"
      ];
      setStubbornText(funnyPhrases[nextAttempt - 1]);

      if (e.type === 'touchstart') {
        e.preventDefault();
      }
    } else {
      // Third time: let them click normally!
      setRunawayOffset({ x: 0, y: 0 });
      setStubbornText("Fine, I smiled a little");
    }
  };

  const completeFlow = (e) => {
    playChordSuccessSound();
    triggerMograBurst(window.innerWidth / 2, window.innerHeight / 3, 30);
    setScreenIndex(7); // Show Rx card
  };

  const restartAll = () => {
    setScreenIndex(0);
    setAttempts(0);
    setRunawayOffset({ x: 0, y: 0 });
    setStubbornText("Fine, I smiled a little");
    playTransitionSound(0);
  };

  return (
    <div className="app-wrapper">
      {/* Ambient background effects */}
      <AmbientEffects />
      
      {/* Easter egg interactions */}
      <EasterEggs />
      
      {/* Falling jasmine petals and hearts canvas */}
      <MograCanvas />
      
      {/* Confetti explosion effect */}
      <ConfettiExplosion />

      {/* Main card box */}
      <div className="card-container">
        {/* Mandalas decoration */}
        <svg className="mandala-corner top-left" viewBox="0 0 100 100">
          <path fill="currentColor" d="M0,0 C30,0 50,20 50,50 C20,50 0,30 0,0 Z" />
          <circle cx="25" cy="25" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M0,50 Q25,25 50,0" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <svg className="mandala-corner top-right" viewBox="0 0 100 100">
          <path fill="currentColor" d="M0,0 C30,0 50,20 50,50 C20,50 0,30 0,0 Z" />
          <circle cx="25" cy="25" r="5" fill="none" stroke="currentColor" stroke-width="2" />
          <path d="M0,50 Q25,25 50,0" fill="none" stroke="currentColor" stroke-width="1.5" />
        </svg>
        <svg className="mandala-corner bottom-left" viewBox="0 0 100 100">
          <path fill="currentColor" d="M0,0 C30,0 50,20 50,50 C20,50 0,30 0,0 Z" />
          <circle cx="25" cy="25" r="5" fill="none" stroke="currentColor" stroke-width="2" />
          <path d="M0,50 Q25,25 50,0" fill="none" stroke="currentColor" stroke-width="1.5" />
        </svg>
        <svg className="mandala-corner bottom-right" viewBox="0 0 100 100">
          <path fill="currentColor" d="M0,0 C30,0 50,20 50,50 C20,50 0,30 0,0 Z" />
          <circle cx="25" cy="25" r="5" fill="none" stroke="currentColor" stroke-width="2" />
          <path d="M0,50 Q25,25 50,0" fill="none" stroke="currentColor" stroke-width="1.5" />
        </svg>

        <div className="card">
          {/* Instagram highlight stories tracking bar */}
          <div className={`story-indicators ${screenIndex >= 1 && screenIndex <= 5 ? 'visible' : ''}`}>
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="indicator">
                <div
                  className="indicator-fill"
                  style={{
                    width: screenIndex > num ? '100%' : screenIndex === num ? '100%' : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* ==================================================
               SCREEN 0: INTRO
               ================================================== */}
          <div className={`screen ${screenIndex === 0 ? 'active' : ''}`}>
            <div className="svg-wrapper">
              <AngryHeartSVG />
            </div>
            <h1>For the future doctor who is always angry for no reason 😤</h1>
            <div className="btn-wrapper">
              <button className="btn" id="btn-start" onClick={startStory}>
                Click if you’re not angry
              </button>
            </div>
          </div>

          {/* ==================================================
               SCREENS 1-5: REVEAL STORIES
               ================================================== */}
          
          {/* SLIDE 1 */}
          <div className={`screen ${screenIndex === 1 ? 'active' : ''}`}>
            <div className="svg-wrapper">
              <ChaiSVG />
            </div>
            <div className="cute-handwritten">“Don’t worry, this is not a proposal.”</div>
            <div className="sub-message">No grand statements here. Just something soft to read.</div>
            <div className="btn-wrapper">
              <button className="btn btn-next" onClick={nextStory}>Next ➔</button>
            </div>
          </div>

          {/* SLIDE 2: INTERACTIVE COCONUT */}
          <div className={`screen ${screenIndex === 2 ? 'active' : ''}`}>
            <CoconutSVG />
            <div className="cute-handwritten" style={{ marginTop: '5px' }}>
              “This is just a small page for someone who acts tough but secretly has a soft heart.”
            </div>
            <div className="sub-message">
              Just like a fresh coconut (Nariyal) 🥥—strong outside, sweetest inside.
            </div>
            <div className="btn-wrapper">
              <button className="btn btn-next" onClick={nextStory}>Next ➔</button>
            </div>
          </div>

          {/* SLIDE 3 */}
          <div className={`screen ${screenIndex === 3 ? 'active' : ''}`}>
            <div className="svg-wrapper">
              <RuledLetterSVG />
            </div>
            <div className="cute-handwritten">
              “My normal lines don’t work on you, so I made a website instead.”
            </div>
            <div className="sub-message">
              Because standard romantic lines are far too boring for you anyway.
            </div>
            <div className="btn-wrapper">
              <button className="btn btn-next" onClick={nextStory}>Next ➔</button>
            </div>
          </div>

          {/* SLIDE 4 */}
          <div className={`screen ${screenIndex === 4 ? 'active' : ''}`}>
            <div className="svg-wrapper">
              <StethoscopeBeatSVG />
            </div>
            <div className="cute-handwritten">
              “You don’t have to reply. Just smile once, that’s enough.”
            </div>
            <div className="sub-message">
              A tiny curve on your lips is a better reward than a thousand words.
            </div>
            <div className="btn-wrapper">
              <button className="btn btn-next" onClick={nextStory}>Next ➔</button>
            </div>
          </div>

          {/* SLIDE 5 */}
          <div className={`screen ${screenIndex === 5 ? 'active' : ''}`}>
            <div className="svg-wrapper">
              <DoctorDreamSVG />
            </div>
            <div className="cute-handwritten">
              “May your doctor dream come true… and may your anger reduce by 1% someday.”
            </div>
            <div className="sub-message">
              We all know you'll be a brilliant, highly successful (and extremely fierce) doctor. 🩺
            </div>
            <div className="btn-wrapper">
              <button className="btn btn-next" onClick={nextStory}>Next ➔</button>
            </div>
          </div>

          {/* ==================================================
               SCREEN 6: STUBBORN PROMPT SCREEN
               ================================================== */}
          <div className={`screen ${screenIndex === 6 ? 'active' : ''}`}>
            <div className="svg-wrapper">
              <BlushingStethoscopeSVG />
            </div>
            <div className="cute-handwritten">“Okay, now you can go back to being stubborn.”</div>
            <div className="btn-wrapper">
              <button
                className="btn runaway-btn"
                onClick={completeFlow}
                onMouseEnter={handleStubbornHover}
                onTouchStart={handleStubbornHover}
                style={{
                  transform: `translate(${runawayOffset.x}px, ${runawayOffset.y}px)`
                }}
              >
                {stubbornText}
              </button>
            </div>
          </div>

          {/* ==================================================
               SCREEN 7: SUCCESS PRESCRIPTION REVEAL
               ================================================== */}
          <div className={`screen ${screenIndex === 7 ? 'active' : ''}`}>
            <PrescriptionCard />
            <div className="btn-wrapper" style={{ marginTop: '15px' }}>
              <button className="btn btn-next" onClick={restartAll}>Read Again ➔</button>
            </div>
          </div>

          {/* Retro Vinyl Record Player playing Elvis Presley (Instrumental) */}
          <AudioPlayer />
        </div>
      </div>
    </div>
  );
}

export default App;
