/* ============================================================================
   PERFUMERÍA DE NAVIDAD
   Minijuego de compras de cosmética · Canvas 2D · JavaScript ES6+
   Sin dependencias externas. Todo el arte es vectorial y se dibuja en canvas.
   ========================================================================== */

(() => {
  'use strict';

  /* ==========================================================================
     1 · PERSONAL
     Cambia aquí el nombre y el mensaje final. También los textos de la portada.
     ========================================================================== */

  const PERSONAL = {
    startText:
      'La lista de la compra de Laura.\n' +
      'Entra en la perfumería, encuentra cada producto y llévatelo a casa. ' +
      'Solo lo que esté en la lista.',
    victoryTitle: '¡Feliz Navidad,\nLaura!',
    victoryMessage:
      'Has llenado la cesta de la perfumería, pero lo que de verdad brilla ' +
      'estas fiestas eres tú.\n\n' +
      'Gracias por tu risa, tu paciencia y tu cariño.\n' +
      'Que tengas una Navidad tan bonita como tú.',
    signature: 'Con muchísimo cariño.',
  };

  /* ==========================================================================
     2 · PRODUCTS_CATALOG
     Cada producto define su nombre, su silueta y sus colores.
     `shape` debe existir en el objeto SHAPES (más abajo).
     `aspect` es ancho / alto: regula lo estilizado que se dibuja el frasco.
     ========================================================================== */

  const PRODUCTS_CATALOG = [
    {
      id: 'pintalabios',
      name: 'Pintalabios Fenty',
      short: 'Pintalabios',
      shape: 'lipstick',
      aspect: 0.42,
      colors: { body: '#e13a62', accent: '#f5ca7c', dark: '#241722', glass: '#f7b9cb' },
    },
    {
      id: 'bruma',
      name: 'Bruma Sol de Janeiro',
      short: 'Bruma',
      shape: 'mist',
      aspect: 0.49,
      colors: { body: '#d8f1ec', accent: '#2f9e99', dark: '#1c5d59', glass: '#f8efe4', liquid: '#b9e7df' },
    },
    {
      id: 'elixir',
      name: 'Elixir Lancôme',
      short: 'Elixir',
      shape: 'dropper',
      aspect: 0.51,
      colors: { body: '#d79a4f', accent: '#f1c97c', dark: '#6b3d1f', glass: '#f4d6a6', liquid: '#c9823c' },
    },
    {
      id: 'eyeliner',
      name: 'Eyeliner waterproof',
      short: 'Eyeliner',
      shape: 'eyeliner',
      aspect: 0.28,
      colors: { body: '#251c2b', accent: '#e9b6c4', dark: '#151019' },
    },
    {
      id: 'colorete',
      name: 'Colorete Nars',
      short: 'Colorete',
      shape: 'compact',
      aspect: 1.02,
      colors: { body: '#ee8598', accent: '#eec37a', dark: '#b8566b' },
    },
    {
      id: 'mascara',
      name: 'Máscara de pestañas',
      short: 'Máscara',
      shape: 'mascara',
      aspect: 0.40,
      colors: { body: '#e15078', accent: '#f0c67c', dark: '#1f1623' },
    },
    {
      id: 'serum',
      name: 'Sérum vitamina C',
      short: 'Sérum',
      shape: 'pump',
      aspect: 0.51,
      colors: { body: '#d9f0e6', accent: '#efc57c', dark: '#4b8b77', glass: '#edfaf5', liquid: '#a9ddcc' },
    },
    {
      id: 'gloss',
      name: 'Gloss Fenty',
      short: 'Gloss',
      shape: 'gloss',
      aspect: 0.31,
      colors: { body: '#ff9cba', accent: '#f2c67a', dark: '#b64d6d', glass: '#ffd9e6' },
    },
    {
      id: 'perfume',
      name: 'Perfume Chanel Nº5',
      short: 'Perfume',
      shape: 'flacon',
      aspect: 0.76,
      colors: { body: '#f2aac8', accent: '#f0c87e', dark: '#9c4d6f', glass: '#fbe1ec', liquid: '#e786ac' },
    },
    {
      id: 'esmalte',
      name: 'Esmalte rojo',
      short: 'Esmalte',
      shape: 'polish',
      aspect: 0.60,
      colors: { body: '#d92e4c', accent: '#f0c77c', dark: '#241722', glass: '#f6a9b8' },
    },
    {
      id: 'crema',
      name: 'Crema de manos',
      short: 'Crema',
      shape: 'jar',
      aspect: 1.04,
      colors: { body: '#f7e9d5', accent: '#d9ae68', dark: '#8f6a3b' },
    },
    {
      id: 'paleta',
      name: 'Paleta de sombras',
      short: 'Paleta',
      shape: 'palette',
      aspect: 1.52,
      colors: {
        body: '#5a203b',
        accent: '#edc67c',
        dark: '#391225',
        pans: ['#e07a88', '#c79a5e', '#8e5a78', '#efc2a8'],
      },
    },
    {
      id: 'iluminador',
      name: 'Iluminador',
      short: 'Iluminador',
      shape: 'highlighter',
      aspect: 0.46,
      colors: { body: '#f3d9b8', accent: '#d89a68', dark: '#9a5f3b', glass: '#fff4e2' },
    },
    {
      id: 'brocha',
      name: 'Brocha de maquillaje',
      short: 'Brocha',
      shape: 'brush',
      aspect: 0.35,
      colors: { body: '#241a29', accent: '#e7bb74', dark: '#7a4a2e', bristle: '#f0aab8' },
    },
  ];

  /* ==========================================================================
     3 · LEVELS_CONFIG
     items         · número de productos de la lista
     distractors   · productos equivocados que se colocan en las estanterías
     seconds       · tiempo límite del nivel
     hideListAfter · segundos antes de ocultar la lista (null = siempre visible)
     ========================================================================== */

  const LEVELS_CONFIG = [
    {
      id: 'escaparate',
      label: 'El escaparate',
      items: 3,
      distractors: 4,
      seconds: 60,
      hideListAfter: null,
      clearTip: 'La cesta empieza a ponerse interesante.',
    },
    {
      id: 'perfumes',
      label: 'Pasillo de perfumes',
      items: 4,
      distractors: 6,
      seconds: 65,
      hideListAfter: null,
      clearTip: 'Nada como un buen perfume para entrar en Navidad.',
    },
    {
      id: 'maquillaje',
      label: 'Rincón de maquillaje',
      items: 5,
      distractors: 8,
      seconds: 70,
      hideListAfter: null,
      clearTip: 'El rincón de maquillaje ha quedado patas arriba. Con cariño.',
    },
    {
      id: 'trastienda',
      label: 'La trastienda',
      items: 5,
      distractors: 10,
      seconds: 70,
      hideListAfter: 7,
      clearTip: 'En la trastienda siempre hay algún tesoro escondido.',
    },
    {
      id: 'nochebuena',
      label: 'Nochebuena',
      items: 6,
      distractors: 12,
      seconds: 75,
      hideListAfter: 6,
      clearTip: 'La tienda ya huele a Navidad. Y la cesta, también.',
    },
  ];

  /* ==========================================================================
     4 · REGLAS Y PALETA
     ========================================================================== */

  const GAME_RULES = {
    doubleTapMs: 480,
    pendingHintMs: 1150,
    invulnerableMs: 1300,
    peekSeconds: 3.6,
    footerHeight: 64,
    maxDpr: 3,
    columns: 4,
    sceneHeight: 214,
    minWorldHeight: 320,
    shuffleMinSeconds: 10, // cada cuánto se recolocan, mínimo
    shuffleMaxSeconds: 20, // y máximo
    shuffleDuration: 0.7, // duración de la animación de cambio
  };

  const AUDIO_CONFIG = {
    storageKey: 'perfumeria-navidad:muted',
    masterGain: 0.5,
    compressor: {
      threshold: -20,
      knee: 24,
      ratio: 4,
      attack: 0.004,
      release: 0.3,
    },
  };

  const C = {
    cream: '#fcf2e5',
    creamDeep: '#f5e4d0',
    ink: '#482133',
    inkSoft: '#745064',
    wine: '#7c1f3e',
    wineDeep: '#57142c',
    berry: '#bc3d61',
    gold: '#efc57c',
    goldDeep: '#c08f4c',
    goldInk: '#9a6d2d',
    pine: '#2f7058',
    red: '#e04b63',
    mint: '#3a8066',
    wall0: '#321329',
    wall1: '#241020',
    wall2: '#160a14',
    panelDark: '#210c1d',
  };

  const FONT_UI = '"Trebuchet MS", "Segoe UI", system-ui, -apple-system, sans-serif';
  const FONT_DISPLAY = '"Palatino Linotype", "Book Antiqua", Georgia, serif';

  const STATES = Object.freeze({
    START: 'START',
    PLAYING: 'PLAYING',
    LEVEL_CLEAR: 'LEVEL_CLEAR',
    GAME_OVER: 'GAME_OVER',
    VICTORY: 'VICTORY',
  });

  const TAU = Math.PI * 2;
  const isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  const rotateBlocked = window.matchMedia
    ? window.matchMedia('(pointer: coarse) and (orientation: landscape) and (max-height: 560px)')
    : { matches: false };
  const DOUBLE_LABEL = isCoarse ? 'DOBLE TOQUE' : 'DOBLE CLIC';
  const SHOWCASE_IDS = [
    'perfume',
    'pintalabios',
    'bruma',
    'paleta',
    'mascara',
    'crema',
    'gloss',
    'elixir',
  ];

  /* ==========================================================================
     5 · DOM
     ========================================================================== */

  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d', { alpha: false });

  const ui = {
    overlay: document.getElementById('overlay'),
    panel: document.getElementById('panel'),
    art: document.getElementById('ov-art'),
    eyebrow: document.getElementById('ov-eyebrow'),
    title: document.getElementById('ov-title'),
    text: document.getElementById('ov-text'),
    stars: document.getElementById('ov-stars'),
    stats: document.getElementById('ov-stats'),
    tip: document.getElementById('ov-tip'),
    primary: document.getElementById('ov-primary'),
    secondary: document.getElementById('ov-secondary'),
    mute: document.getElementById('mute-btn'),
    live: document.getElementById('live'),
  };

  /* ==========================================================================
     6 · UTILIDADES
     ========================================================================== */

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const lerp = (a, b, t) => a + (b - a) * t;
  const rand = (min, max) => min + Math.random() * (max - min);
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  function shuffle(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function formatTime(seconds) {
    const safe = Math.max(0, Math.ceil(seconds));
    const minutes = Math.floor(safe / 60);
    const rest = safe % 60;
    return `${minutes}:${String(rest).padStart(2, '0')}`;
  }

  function plural(count, singular, pluralForm) {
    return count === 1 ? singular : pluralForm;
  }

  function readSafeInsets() {
    const styles = getComputedStyle(document.documentElement);
    const px = (name) => {
      const value = parseFloat(styles.getPropertyValue(name));
      return Number.isFinite(value) ? value : 0;
    };
    return {
      top: px('--safe-top'),
      right: px('--safe-right'),
      bottom: px('--safe-bottom'),
      left: px('--safe-left'),
    };
  }

  function vibrate(pattern) {
    if (!navigator.vibrate) return;
    try {
      navigator.vibrate(pattern);
    } catch (error) {
      /* El háptico es opcional. */
    }
  }

  let announceTimer = 0;
  function announce(message) {
    window.clearTimeout(announceTimer);
    ui.live.textContent = '';
    announceTimer = window.setTimeout(() => {
      ui.live.textContent = message;
    }, 40);
  }

  /* ==========================================================================
     7 · ESTADO
     ========================================================================== */

  const metrics = {
    dpr: 1,
    screenW: 0,
    screenH: 0,
    stageX: 0,
    stageY: 0,
    stageW: 0,
    stageH: 0,
    radius: 0,
    framed: false,
    safe: { top: 0, right: 0, bottom: 0, left: 0 },
  };

  const game = {
    state: STATES.START,
    levelIndex: 0,
    list: [],
    placements: [],
    collected: [],
    secondsLeft: 0,
    levelSeconds: 0,
    lastResult: null,
    time: 0,
    scroll: 0,
    scrollVel: 0,
    worldH: 0,
    maxScroll: 0,
    hudH: 0,
    hudSnap: true,
    listHidden: false,
    listReveal: 0,
    listPeek: 0,
    listHideTotal: 0,
    pendingClear: 0,
    cooldown: 0,
    nextShuffleIn: 0,
    shuffleLock: 0,
    lastTap: null,
    pendingShow: null,
    toast: null,
    hintTime: 0,
    flash: 0,
    shake: 0,
    basketShake: 0,
    basketPop: 0,
    pressAction: null,
    snow: [],
    bokeh: [],
    particles: [],
    rings: [],
    floats: [],
    flyers: [],
    confetti: [],
    slotW: 0,
    rowH: 0,
    worldInfo: null,
  };

  let pointer = null;
  let canvasButtons = [];
  let resizeQueued = false;

  /* ==========================================================================
     7b · AUDIO Y CONTROL DE SONIDO
     Audio sintetizado con Web Audio API. Sin archivos externos.
     Todo pasa por una ganancia moderada y un compresor suave.
     ========================================================================== */

  const audio = {
    ctx: null,
    master: null,
    compressor: null,
    muted: readMutedPreference(),
    melody: [],
    plays: 0,
    lastPlayed: null,
  };

  function readMutedPreference() {
    try {
      return localStorage.getItem(AUDIO_CONFIG.storageKey) === '1';
    } catch (error) {
      return false;
    }
  }

  function saveMutedPreference() {
    try {
      localStorage.setItem(
        AUDIO_CONFIG.storageKey,
        audio.muted ? '1' : '0'
      );
    } catch (error) {
      /* Sin localStorage, el botón funciona igual durante la sesión. */
    }
  }

  function ensureAudio() {
    if (audio.ctx) {
      if (
        audio.ctx.state === 'suspended' ||
        audio.ctx.state === 'interrupted'
      ) {
        audio.ctx.resume().catch(() => {});
      }
      return audio.ctx;
    }

    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;

    try {
      const audioContext = new AudioContextClass();
      const master = audioContext.createGain();
      master.gain.value = audio.muted ? 0 : AUDIO_CONFIG.masterGain;

      const compressor = audioContext.createDynamicsCompressor();
      compressor.threshold.value = AUDIO_CONFIG.compressor.threshold;
      compressor.knee.value = AUDIO_CONFIG.compressor.knee;
      compressor.ratio.value = AUDIO_CONFIG.compressor.ratio;
      compressor.attack.value = AUDIO_CONFIG.compressor.attack;
      compressor.release.value = AUDIO_CONFIG.compressor.release;

      master.connect(compressor);
      compressor.connect(audioContext.destination);

      audio.ctx = audioContext;
      audio.master = master;
      audio.compressor = compressor;

      if (
        audioContext.state === 'suspended' ||
        audioContext.state === 'interrupted'
      ) {
        audioContext.resume().catch(() => {});
      }
      return audioContext;
    } catch (error) {
      return null;
    }
  }

  function unlockAudio() {
    const audioContext = ensureAudio();
    if (
      audioContext &&
      (audioContext.state === 'suspended' ||
        audioContext.state === 'interrupted')
    ) {
      audioContext.resume().catch(() => {});
    }
  }

  function audioTone(options = {}) {
    if (audio.muted) return null;
    const audioContext = ensureAudio();
    if (!audioContext || !audio.master) return null;

    const {
      freq = 440,
      endFreq = 0,
      type = 'sine',
      gain = 0.1,
      attack = 0.012,
      duration = 0.3,
      filter = 0,
      delay = 0,
      track = false,
    } = options;

    const start = audioContext.currentTime + 0.012 + delay;
    const oscillator = audioContext.createOscillator();
    const envelope = audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(Math.max(20, freq), start);
    if (endFreq > 0) {
      oscillator.frequency.exponentialRampToValueAtTime(
        Math.max(20, endFreq),
        start + Math.max(0.03, duration * 0.8)
      );
    }

    envelope.gain.setValueAtTime(0.0001, start);
    envelope.gain.exponentialRampToValueAtTime(
      Math.max(0.0002, gain),
      start + Math.max(0.005, attack)
    );
    envelope.gain.exponentialRampToValueAtTime(
      0.0001,
      start + Math.max(0.06, duration)
    );

    let tail = oscillator;
    if (filter > 0) {
      const lowpass = audioContext.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(filter, start);
      lowpass.Q.value = 0.2;
      tail.connect(lowpass);
      tail = lowpass;
    }

    tail.connect(envelope);
    envelope.connect(audio.master);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.06);

    if (track) {
      const voice = { osc: oscillator, env: envelope };
      audio.melody.push(voice);
      oscillator.addEventListener('ended', () => {
        audio.melody = audio.melody.filter((item) => item !== voice);
      });
    }

    return { osc: oscillator, env: envelope };
  }

  function audioBell(freq, delay, gain, duration, track = false) {
    audioTone({
      freq,
      delay,
      gain,
      duration,
      attack: 0.01,
      filter: 4600,
      track,
    });
    audioTone({
      freq: freq * 2.01,
      delay: delay + 0.004,
      gain: gain * 0.22,
      duration: duration * 0.62,
      attack: 0.008,
      filter: 5600,
      track,
    });
    audioTone({
      freq: freq * 2.99,
      delay: delay + 0.008,
      gain: gain * 0.055,
      duration: duration * 0.42,
      attack: 0.006,
      filter: 6400,
      track,
    });
  }

  function audioPad(freq, delay, gain, duration, track = false) {
    audioTone({
      freq,
      delay,
      gain,
      duration,
      attack: 0.4,
      filter: 1150,
      track,
    });
    audioTone({
      freq: freq * 1.5,
      delay: delay + 0.03,
      gain: gain * 0.55,
      duration: duration * 0.95,
      attack: 0.45,
      filter: 1350,
      track,
    });
  }

  function stopMelody() {
    if (!audio.melody.length) return;
    const audioContext = audio.ctx;
    const now = audioContext ? audioContext.currentTime : 0;
    for (const voice of audio.melody) {
      try {
        voice.env.gain.cancelScheduledValues(now);
        voice.env.gain.setTargetAtTime(0.0001, now, 0.025);
      } catch (error) {
        /* La voz ya había terminado. */
      }
      try {
        voice.osc.stop(now + 0.12);
      } catch (error) {
        /* La voz ya estaba parada. */
      }
    }
    audio.melody = [];
  }

  function updateMuteButton() {
    if (!ui.mute) return;
    const soundOn = !audio.muted;
    ui.mute.dataset.muted = String(audio.muted);
    ui.mute.setAttribute('aria-checked', String(soundOn));
    ui.mute.title = soundOn ? 'Silenciar sonido (M)' : 'Activar sonido (M)';
  }

  function setMuted(muted, options = {}) {
    const {
      persist = true,
      notify = true,
      feedback = true,
    } = options;
    const nextMuted = Boolean(muted);
    if (audio.muted === nextMuted && !options.force) {
      updateMuteButton();
      return;
    }

    audio.muted = nextMuted;
    if (audio.muted) stopMelody();

    if (audio.ctx && audio.master) {
      const now = audio.ctx.currentTime;
      audio.master.gain.cancelScheduledValues(now);
      audio.master.gain.setTargetAtTime(
        audio.muted ? 0 : AUDIO_CONFIG.masterGain,
        now,
        0.018
      );
    }

    if (persist) saveMutedPreference();
    updateMuteButton();
    if (notify) {
      announce(audio.muted ? 'Sonido silenciado.' : 'Sonido activado.');
    }
    if (!audio.muted && feedback) playSfx('ui');
  }

  function positionMuteButton() {
    if (!ui.mute) return;
    const size = 30;
    const left =
      metrics.stageX +
      metrics.stageW -
      metrics.safe.right -
      12 -
      size;
    const top = metrics.stageY + metrics.safe.top + 5;
    ui.mute.style.left = `${Math.round(left)}px`;
    ui.mute.style.right = 'auto';
    ui.mute.style.top = `${Math.round(top)}px`;
  }

  function initAudioControls() {
    updateMuteButton();

    if (ui.mute) {
      ui.mute.addEventListener('click', (event) => {
        event.stopPropagation();
        unlockAudio();
        setMuted(!audio.muted);
      });
    }

    const unlock = () => unlockAudio();
    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('touchstart', unlock, { passive: true });
    window.addEventListener('click', unlock);
    window.addEventListener('keydown', unlock);

    window.addEventListener('keydown', (event) => {
      const target = event.target;
      const tagName = target && target.tagName ? target.tagName : '';
      if (
        /^(INPUT|TEXTAREA|SELECT)$/.test(tagName) ||
        (target && target.isContentEditable)
      ) {
        return;
      }
      if ((event.key === 'm' || event.key === 'M') && !event.repeat) {
        event.preventDefault();
        unlockAudio();
        setMuted(!audio.muted);
      }
    });
  }

  function playAudio(name) {
    if (audio.muted) return;
    if (!ensureAudio()) return;

    audio.plays += 1;
    audio.lastPlayed = name;

    switch (name) {
      case 'start': {
        audioBell(523.25, 0, 0.055, 0.7);
        audioBell(783.99, 0.11, 0.045, 0.9);
        break;
      }
      case 'collect': {
        const scale = [523.25, 587.33, 659.25, 783.99, 880.0, 987.77];
        const position = Math.max(1, game.collected.length);
        const note = scale[(position - 1) % scale.length];
        audioTone({
          freq: note * 0.82,
          endFreq: note * 1.07,
          type: 'sine',
          gain: 0.17,
          attack: 0.008,
          duration: 0.22,
          filter: 2400,
        });
        audioTone({
          freq: note * 2,
          gain: 0.038,
          attack: 0.005,
          duration: 0.14,
          delay: 0.012,
          filter: 5200,
        });
        break;
      }
      case 'tap': {
        audioTone({
          freq: 760,
          endFreq: 820,
          gain: 0.026,
          attack: 0.005,
          duration: 0.055,
          filter: 2800,
        });
        break;
      }
      case 'ui': {
        audioTone({
          freq: 620,
          endFreq: 700,
          gain: 0.034,
          attack: 0.006,
          duration: 0.09,
          filter: 2400,
        });
        break;
      }
      case 'wrong': {
        audioTone({
          freq: 235,
          endFreq: 168,
          type: 'triangle',
          gain: 0.12,
          attack: 0.02,
          duration: 0.32,
          filter: 720,
        });
        audioTone({
          freq: 117.5,
          endFreq: 92,
          type: 'sine',
          gain: 0.06,
          attack: 0.018,
          duration: 0.34,
          filter: 420,
        });
        break;
      }
      case 'complete': {
        audioBell(1046.5, 0, 0.05, 0.65);
        audioBell(1318.51, 0.075, 0.042, 0.8);
        break;
      }
      case 'level-clear': {
        stopMelody();
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, index) => {
          audioBell(freq, index * 0.11, 0.075, 1.15, true);
        });
        audioPad(261.63, 0.04, 0.022, 1.7, true);
        audioPad(392.0, 0.04, 0.014, 1.7, true);
        break;
      }
      case 'victory': {
        stopMelody();
        const melody = [
          [523.25, 0.0, 0.95],
          [659.25, 0.34, 0.85],
          [783.99, 0.68, 0.9],
          [880.0, 1.02, 0.9],
          [783.99, 1.4, 0.9],
          [659.25, 1.76, 0.95],
          [587.33, 2.14, 1.0],
          [523.25, 2.52, 1.5],
        ];
        melody.forEach(([freq, delay, duration]) => {
          audioBell(freq, delay, 0.072, duration, true);
        });
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, index) => {
          audioBell(freq, 3.2 + index * 0.06, 0.048, 2.1, true);
        });
        audioPad(261.63, 0.1, 0.02, 4.8, true);
        audioPad(392.0, 0.1, 0.014, 4.8, true);
        audioPad(523.25, 2.6, 0.014, 2.6, true);
        break;
      }
      case 'game-over': {
        audioTone({
          freq: 329.63,
          endFreq: 261.63,
          gain: 0.06,
          attack: 0.03,
          duration: 0.95,
          filter: 1000,
        });
        audioTone({
          freq: 164.81,
          endFreq: 130.81,
          gain: 0.038,
          attack: 0.03,
          duration: 1.05,
          filter: 600,
        });
        break;
      }
      default:
        break;
    }
  }

  /* ==========================================================================
     8 · MEDIDAS Y RESIZE
     ========================================================================== */

  function resize() {
    const viewport = window.visualViewport;
    const cssW = Math.max(280, Math.round(viewport ? viewport.width : window.innerWidth));
    const cssH = Math.max(420, Math.round(viewport ? viewport.height : window.innerHeight));
    const dpr = Math.min(window.devicePixelRatio || 1, GAME_RULES.maxDpr);

    metrics.dpr = dpr;
    metrics.screenW = cssW;
    metrics.screenH = cssH;

    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;

    const framed = cssW >= 600 && cssH >= 520;
    metrics.framed = framed;

    if (framed) {
      const stageW = Math.min(cssW - 48, 548);
      const stageH = Math.min(cssH - 34, 940);
      metrics.stageW = stageW;
      metrics.stageH = stageH;
      metrics.stageX = Math.round((cssW - stageW) / 2);
      metrics.stageY = Math.round((cssH - stageH) / 2);
      metrics.radius = 26;
      metrics.safe = { top: 0, right: 0, bottom: 0, left: 0 };
    } else {
      metrics.stageW = cssW;
      metrics.stageH = cssH;
      metrics.stageX = 0;
      metrics.stageY = 0;
      metrics.radius = 0;
      metrics.safe = readSafeInsets();
    }

    const oldMax = Math.max(1, game.maxScroll);
    const ratio = game.scroll / oldMax;

    buildSnow();
    buildBokeh();

    if (game.placements.length) {
      layoutWorld();
      game.hudH = hudTargetH();
      const viewportH = Math.max(1, footerTop() - game.hudH);
      game.maxScroll = Math.max(0, game.worldH - viewportH);
      game.scroll = clamp(ratio * game.maxScroll, 0, game.maxScroll);
    } else {
      game.maxScroll = 0;
      game.scroll = 0;
    }

    game.hudSnap = true;
    game.scrollVel = 0;
    positionMuteButton();
    render();
  }

  function scheduleResize() {
    if (resizeQueued) return;
    resizeQueued = true;
    requestAnimationFrame(() => {
      resizeQueued = false;
      resize();
    });
  }

  function footerTop() {
    return metrics.stageH - metrics.safe.bottom - GAME_RULES.footerHeight;
  }

  function levelConfig() {
    return LEVELS_CONFIG[clamp(game.levelIndex, 0, LEVELS_CONFIG.length - 1)];
  }

  function listCardHeight() {
    const rows = Math.ceil(game.list.length / 3);
    if (!rows) return 0;
    return 27 + rows * 28 + (game.listHidden ? 14 : 0);
  }

  function availableWorldHeight() {
    const stageAvailable =
      metrics.stageH - metrics.safe.top - metrics.safe.bottom;
    if (game.state === STATES.START || !game.list.length) {
      return Math.max(GAME_RULES.minWorldHeight, stageAvailable - 24);
    }
    const hudHeight = game.listHidden
      ? metrics.safe.top + 50
      : hudTargetH();
    return Math.max(
      GAME_RULES.minWorldHeight,
      footerTop() - hudHeight
    );
  }

  function isListVisible() {
    if (!game.list.length) return false;
    if (!game.listHidden) return true;
    return game.listReveal > 0 || game.listPeek > 0;
  }

  function hudTargetH() {
    if (game.state === STATES.START || !game.list.length) return 0;
    const cardVisible = isListVisible();
    if (!cardVisible) return metrics.safe.top + 50;
    return metrics.safe.top + 44 + listCardHeight() + 8;
  }

  function buildSnow() {
    const count = clamp(Math.round(metrics.stageW / 15), 16, 42);
    game.snow = Array.from({ length: count }, () => ({
      x: rand(0, metrics.stageW),
      y: rand(0, metrics.stageH),
      r: rand(0.7, 2.1),
      speed: rand(6, 22),
      drift: rand(-7, 7),
      phase: rand(0, TAU),
      alpha: rand(0.14, 0.44),
    }));
  }

  function buildBokeh() {
    const palette = ['255, 205, 140', '255, 156, 186', '178, 231, 207'];
    const count = clamp(Math.round(metrics.stageW / 34), 8, 18);
    game.bokeh = Array.from({ length: count }, () => ({
      x: rand(0, metrics.stageW),
      y: rand(0, metrics.stageH),
      r: rand(10, 46),
      a: rand(0.022, 0.065),
      color: palette[Math.floor(rand(0, palette.length))],
    }));
  }

  /* ==========================================================================
     9 · FLUJO DEL JUEGO
     ========================================================================== */

  function setupShowcase() {
    stopMelody();
    const placements = SHOWCASE_IDS.map((id, index) => {
      const product = PRODUCTS_CATALOG.find((item) => item.id === id) || PRODUCTS_CATALOG[0];
      return {
        uid: `showcase-${index}`,
        product,
        needed: false,
        collected: false,
        spawn: 0,
        x: 0,
        baseY: 0,
        maxW: 0,
        maxH: 0,
        slotW: 0,
        seed: Math.random(),
        moveT: 0,
        moveDur: 0,
        fromX: 0,
        fromY: 0,
      };
    });

    game.state = STATES.START;
    game.list = [];
    game.placements = placements;
    game.collected = [];
    game.secondsLeft = 0;
    game.levelSeconds = 0;
    game.listHidden = false;
    game.listReveal = 0;
    game.listPeek = 0;
    game.listHideTotal = 0;
    game.pendingClear = 0;
    game.cooldown = 0;
    game.nextShuffleIn = 0;
    game.shuffleLock = 0;
    game.lastTap = null;
    game.pendingShow = null;
    game.toast = null;
    game.hintTime = 0;
    game.flash = 0;
    game.shake = 0;
    game.basketShake = 0;
    game.basketPop = 0;
    game.scroll = 0;
    game.scrollVel = 0;
    game.particles.length = 0;
    game.rings.length = 0;
    game.floats.length = 0;
    game.flyers.length = 0;
    game.confetti.length = 0;
    game.hudSnap = true;
    layoutWorld();
    game.maxScroll = 0;
  }

  function startLevel(index) {
    const level = clamp(index, 0, LEVELS_CONFIG.length - 1);
    const config = LEVELS_CONFIG[level];

    stopMelody();
    game.levelIndex = level;
    game.state = STATES.PLAYING;
    game.secondsLeft = config.seconds;
    game.levelSeconds = config.seconds;
    game.listHidden = config.hideListAfter != null;
    game.listReveal = config.hideListAfter || 0;
    game.listHideTotal = config.hideListAfter || 0;
    game.listPeek = 0;
    game.collected = [];
    game.pendingClear = 0;
    game.cooldown = 0;
    game.nextShuffleIn = rand(
      GAME_RULES.shuffleMinSeconds,
      GAME_RULES.shuffleMaxSeconds
    );
    game.shuffleLock = 0;
    game.lastTap = null;
    game.pendingShow = null;
    game.toast = null;
    game.flash = 0;
    game.shake = 0;
    game.basketShake = 0;
    game.basketPop = 0;
    game.scroll = 0;
    game.scrollVel = 0;
    game.particles.length = 0;
    game.rings.length = 0;
    game.floats.length = 0;
    game.flyers.length = 0;
    game.confetti.length = 0;
    game.pressAction = null;
    game.lastResult = null;
    game.hintTime = 7;

    buildLevel(config);
    layoutWorld();
    game.hudH = hudTargetH();
    game.hudSnap = true;
    refreshScrollBounds();

    closeOverlay();
    playSfx('start');

    announce(
      `Nivel ${level + 1} de ${LEVELS_CONFIG.length}, ${config.label}. ` +
      `Lista: ${game.list.map((product) => product.name).join(', ')}.`
    );
  }

  function buildLevel(config) {
    const list = shuffle(PRODUCTS_CATALOG).slice(0, config.items);
    const rest = shuffle(PRODUCTS_CATALOG.filter((product) => !list.includes(product)));
    const raw = [
      ...list.map((product) => ({ product, needed: true })),
      ...Array.from({ length: config.distractors }, (_, index) => ({
        product: rest[index % rest.length],
        needed: false,
      })),
    ];

    game.list = list;
    game.placements = shuffle(raw).map((entry, index) => ({
      uid: `p-${index}`,
      product: entry.product,
      needed: entry.needed,
      collected: false,
      spawn: 0,
      x: 0,
      baseY: 0,
      maxW: 0,
      maxH: 0,
      slotW: 0,
      seed: Math.random(),
      moveT: 0,
      moveDur: 0,
      fromX: 0,
      fromY: 0,
    }));
  }

  function layoutWorld() {
    const count = game.placements.length;
    if (!count) {
      game.worldH = 0;
      game.worldInfo = null;
      return;
    }

    const safe = metrics.safe;
    const x0 = safe.left + 8;
    const x1 = metrics.stageW - safe.right - 8;
    const slotW = (x1 - x0) / GAME_RULES.columns;
    const baseRowH = clamp(slotW * 1.56, 118, 156);
    const rows = Math.ceil(count / GAME_RULES.columns);
    const worldTop = 22;
    const availableHeight = availableWorldHeight();
    const sceneHeight = GAME_RULES.sceneHeight;
    const naturalHeight =
      worldTop + rows * baseRowH + sceneHeight + 26;
    const spare = Math.max(0, availableHeight - naturalHeight);
    const rowH = baseRowH + Math.min(34, spare / Math.max(1, rows));

    for (let index = 0; index < count; index += 1) {
      const placement = game.placements[index];
      const row = Math.floor(index / GAME_RULES.columns);
      const rowStart = row * GAME_RULES.columns;
      const rowCount = Math.min(GAME_RULES.columns, count - rowStart);
      const column = index - rowStart;
      const offset = (GAME_RULES.columns - rowCount) / 2;
      const shelfY = worldTop + row * rowH + rowH - 26;

      placement.x = x0 + slotW * (offset + column + 0.5);
      placement.baseY = shelfY - 4;
      placement.maxW = slotW - 12;
      placement.maxH = rowH * 0.58;
      placement.slotW = slotW;
      placement.shelfY = shelfY;
      placement.fromX = placement.x;
      placement.fromY = placement.baseY;
      placement.moveT = 0;
      placement.moveDur = 0;
    }

    game.slotW = slotW;
    game.rowH = rowH;
    game.worldH = Math.max(
      availableHeight,
      worldTop + rows * rowH + sceneHeight + 26
    );
    game.sceneTop = game.worldH - sceneHeight;
    game.worldInfo = { x0, x1, rowH, rows, worldTop, slotW };
  }

  function shuffleShelves() {
    if (game.state !== STATES.PLAYING) return;
    if (game.shuffleLock > 0 || game.pendingClear > 0) return;

    const movers = game.placements.filter((placement) => !placement.collected);
    if (movers.length < 2) {
      game.nextShuffleIn = rand(
        GAME_RULES.shuffleMinSeconds,
        GAME_RULES.shuffleMaxSeconds
      );
      return;
    }

    const positions = movers.map((placement) => ({
      x: placement.x,
      baseY: placement.baseY,
    }));
    let targets = shuffle(positions);
    const unchanged = targets.every(
      (target, index) =>
        Math.abs(target.x - positions[index].x) < 0.5 &&
        Math.abs(target.baseY - positions[index].baseY) < 0.5
    );
    if (unchanged) {
      targets = targets.slice(1).concat(targets[0]);
    }

    const duration = GAME_RULES.shuffleDuration;
    movers.forEach((placement, index) => {
      placement.fromX = placement.x;
      placement.fromY = placement.baseY;
      placement.x = targets[index].x;
      placement.baseY = targets[index].baseY;
      placement.moveDur = duration;
      placement.moveT = duration;
      placement.spawn = 0;
    });

    game.lastTap = null;
    game.pendingShow = null;
    game.shuffleLock = duration + 0.18;
    game.nextShuffleIn = rand(
      GAME_RULES.shuffleMinSeconds,
      GAME_RULES.shuffleMaxSeconds
    );

    announce('La tienda se recoloca: los productos cambian de estantería.');
  }

  function refreshScrollBounds() {
    const viewportH = Math.max(1, footerTop() - game.hudH);
    game.maxScroll = Math.max(0, game.worldH - viewportH);
    game.scroll = clamp(game.scroll, 0, game.maxScroll);
  }

  function computeStars() {
    const ratio = game.levelSeconds > 0 ? game.secondsLeft / game.levelSeconds : 0;
    if (ratio >= 0.55) return 3;
    if (ratio >= 0.28) return 2;
    return 1;
  }

  function finishLevel() {
    if (game.state !== STATES.PLAYING) return;

    game.lastTap = null;
    game.pendingShow = null;
    game.scrollVel = 0;

    if (game.levelIndex >= LEVELS_CONFIG.length - 1) {
      game.state = STATES.VICTORY;
      spawnConfetti(88);
      showVictoryOverlay();
      playSfx('victory');
      announce(
        '¡Has completado los cinco niveles! ' +
        'La cesta está llena. Feliz Navidad.'
      );
    } else {
      game.state = STATES.LEVEL_CLEAR;
      game.lastResult = { stars: computeStars(), seconds: Math.ceil(game.secondsLeft) };
      spawnConfetti(52);
      showLevelClearOverlay();
      playSfx('level-clear');
      announce(
        `Nivel ${game.levelIndex + 1} completado. Te quedaban ` +
        `${Math.ceil(game.secondsLeft)} segundos.`
      );
    }
  }

  function triggerGameOver() {
    if (game.state !== STATES.PLAYING) return;

    game.secondsLeft = 0;
    game.state = STATES.GAME_OVER;
    game.lastTap = null;
    game.pendingShow = null;
    game.scrollVel = 0;
    game.toast = null;
    game.pendingClear = 0;
    game.pressAction = null;
    showGameOverOverlay();
    playSfx('game-over');
    announce(
      `Se acabó el tiempo. Te faltaron ` +
      `${game.list.length - game.collected.length} productos.`
    );
  }

  function goToStart() {
    setupShowcase();
    showStartOverlay();
    announce('Perfumería de Navidad. Pulsa Abrir la tienda para empezar.');
    game.hudSnap = true;
  }

  /* ==========================================================================
     10 · OVERLAY (DOM)
     ========================================================================== */

  const ART = {
    start: `
      <svg viewBox="0 0 120 120" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="a-pink" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#ffd7e5"/>
            <stop offset="0.55" stop-color="#f2aac8"/>
            <stop offset="1" stop-color="#df7fa7"/>
          </linearGradient>
          <linearGradient id="a-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#ffe7af"/>
            <stop offset="0.5" stop-color="#efc57c"/>
            <stop offset="1" stop-color="#c18f4e"/>
          </linearGradient>
          <linearGradient id="a-red" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#d95270"/>
            <stop offset="1" stop-color="#8f1f3d"/>
          </linearGradient>
        </defs>
        <ellipse cx="60" cy="108" rx="31" ry="6" fill="#6b2d45" opacity="0.16"/>
        <path d="M42 38C43 23 51 9 68 4c9-3 17 2 16 11-1 8-8 15-17 19-9 4-18 5-25 4Z" fill="url(#a-red)"/>
        <path d="M48 34c2-13 9-22 22-27" fill="none" stroke="#ffd5c2" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
        <circle cx="85" cy="20" r="8" fill="#fff8ee" stroke="#d8b7a0" stroke-width="1.2"/>
        <rect x="36" y="31" width="52" height="12" rx="6" fill="#fff8ee" stroke="#d8b7a0" stroke-width="1.2"/>
        <path d="M39 43h46" stroke="#e8d0bd" stroke-width="1" opacity="0.7"/>
        <rect x="52" y="42" width="16" height="10" rx="2" fill="url(#a-gold)"/>
        <rect x="48" y="50" width="24" height="10" rx="3" fill="url(#a-gold)"/>
        <rect x="36" y="58" width="48" height="48" rx="11" fill="url(#a-pink)" stroke="#b45e81" stroke-width="1.4"/>
        <rect x="36" y="78" width="48" height="28" rx="11" fill="#e786ac" opacity="0.55"/>
        <rect x="45" y="70" width="30" height="20" rx="4" fill="#fff8ee" opacity="0.94"/>
        <path d="M51 77h18M51 82h12" stroke="#b9748d" stroke-width="1.7" stroke-linecap="round"/>
        <path d="M41 63c3-3 5-3 8 0" fill="none" stroke="#fff4ee" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
        <g fill="#efc57c">
          <path d="M27 47l1.8 4.2L33 53l-4.2 1.8L27 59l-1.8-4.2L21 53l4.2-1.8Z"/>
          <path d="M96 57l1.3 3 3 1.3-3 1.3-1.3 3-1.3-3-3-1.3 3-1.3Z" opacity="0.85"/>
          <circle cx="99" cy="78" r="2" opacity="0.6"/>
        </g>
        <g fill="#fff8ee" opacity="0.8">
          <circle cx="29" cy="80" r="1.6"/>
          <circle cx="88" cy="46" r="1.3"/>
          <circle cx="34" cy="27" r="1.2"/>
        </g>
      </svg>`,
    gift: `
      <svg viewBox="0 0 130 120" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="g-box" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#d55474"/>
            <stop offset="1" stop-color="#8d1e3d"/>
          </linearGradient>
          <linearGradient id="g-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#ffe7af"/>
            <stop offset="1" stop-color="#c79552"/>
          </linearGradient>
        </defs>
        <ellipse cx="65" cy="108" rx="42" ry="6" fill="#6b2d45" opacity="0.14"/>
        <rect x="30" y="57" width="70" height="48" rx="7" fill="url(#g-box)"/>
        <rect x="24" y="48" width="82" height="16" rx="6" fill="url(#g-gold)"/>
        <rect x="59" y="48" width="13" height="57" fill="#f6d397"/>
        <rect x="24" y="48" width="82" height="16" rx="6" fill="none" stroke="#b98541" stroke-width="1" opacity="0.5"/>
        <path d="M65 49c-13 0-21-7-19-15 2-8 13-6 17 1 2-9 14-11 17-3 3 7-4 14-15 17Z" fill="#f8dfa5" stroke="#c79552" stroke-width="1.3"/>
        <circle cx="65" cy="48" r="5" fill="#c79552"/>
        <g fill="#efc57c">
          <path d="M24 79l1.8 4L30 85l-4.2 1.8L24 91l-1.8-4.2L18 85l4.2-1.8Z"/>
          <path d="M105 74l1.5 3.4 3.4 1.5-3.4 1.5-1.5 3.4-1.5-3.4-3.4-1.5 3.4-1.5Z"/>
          <circle cx="105" cy="44" r="2" opacity="0.7"/>
        </g>
        <g fill="#fff8ee" opacity="0.75">
          <circle cx="45" cy="36" r="1.5"/>
          <circle cx="92" cy="98" r="1.4"/>
          <circle cx="21" cy="57" r="1.2"/>
        </g>
      </svg>`,
    clock: `
      <svg viewBox="0 0 130 120" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="c-face" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#fffaf1"/>
            <stop offset="1" stop-color="#f2dfc8"/>
          </linearGradient>
          <linearGradient id="c-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#ffe7af"/>
            <stop offset="0.55" stop-color="#efc57c"/>
            <stop offset="1" stop-color="#c79552"/>
          </linearGradient>
        </defs>
        <ellipse cx="65" cy="107" rx="35" ry="5" fill="#6b2d45" opacity="0.14"/>
        <path d="M42 25c-6-8-2-15 5-12M88 25c6-8 2-15-5-12" fill="none" stroke="#c79552" stroke-width="5" stroke-linecap="round"/>
        <circle cx="65" cy="62" r="38" fill="url(#c-face)" stroke="url(#c-gold)" stroke-width="6"/>
        <circle cx="65" cy="62" r="30" fill="none" stroke="#e2c8a8" stroke-width="1.2"/>
        <circle cx="65" cy="62" r="4" fill="#7c1f3e"/>
        <path d="M65 62V41M65 62l14 9" fill="none" stroke="#7c1f3e" stroke-width="4.2" stroke-linecap="round"/>
        <g fill="#b98a4b">
          <circle cx="65" cy="34" r="1.8"/>
          <circle cx="65" cy="90" r="1.8"/>
          <circle cx="37" cy="62" r="1.8"/>
          <circle cx="93" cy="62" r="1.8"/>
        </g>
        <rect x="47" y="98" width="14" height="7" rx="3" fill="#9d6c34" transform="rotate(16 54 101)"/>
        <rect x="69" y="98" width="14" height="7" rx="3" fill="#9d6c34" transform="rotate(-16 76 101)"/>
        <g fill="#efc57c" opacity="0.9">
          <path d="M107 30l1.6 3.5 3.5 1.6-3.5 1.6-1.6 3.5-1.6-3.5-3.5-1.6 3.5-1.6Z"/>
          <circle cx="23" cy="87" r="2"/>
        </g>
      </svg>`,
    tree: `
      <svg viewBox="0 0 150 130" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="t-green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#3f8a6a"/>
            <stop offset="1" stop-color="#1c4a37"/>
          </linearGradient>
          <linearGradient id="t-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#ffe6a8"/>
            <stop offset="1" stop-color="#c79552"/>
          </linearGradient>
        </defs>
        <ellipse cx="75" cy="116" rx="46" ry="6" fill="#6b2d45" opacity="0.14"/>
        <rect x="67" y="95" width="16" height="19" rx="3" fill="#6f4327"/>
        <path d="M75 20 38 72h74Z" fill="url(#t-green)"/>
        <path d="M75 43 29 96h92Z" fill="url(#t-green)"/>
        <path d="M75 65 22 110h106Z" fill="url(#t-green)"/>
        <path d="M75 23 41 70h68Z" fill="none" stroke="#62a986" stroke-width="1.2" opacity="0.55"/>
        <path d="M75 47 32 94h86Z" fill="none" stroke="#62a986" stroke-width="1.2" opacity="0.4"/>
        <path d="M75 8l4.4 9.6L90 20l-8 7.3L84 38l-9-5.3-9 5.3 2-10.7-8-7.3 10.6-2.4Z" fill="url(#t-gold)"/>
        <g>
          <circle cx="57" cy="79" r="4.5" fill="#d94d68"/>
          <circle cx="91" cy="86" r="4" fill="#efc57c"/>
          <circle cx="70" cy="99" r="4.2" fill="#f2aac8"/>
          <circle cx="47" cy="98" r="3.8" fill="#efc57c"/>
          <circle cx="101" cy="101" r="3.4" fill="#d94d68"/>
          <circle cx="79" cy="58" r="3.5" fill="#efc57c"/>
        </g>
        <rect x="35" y="105" width="24" height="14" rx="3" fill="#b73756"/>
        <rect x="45" y="105" width="5" height="14" fill="#f6d397"/>
        <rect x="94" y="103" width="22" height="16" rx="3" fill="#f5e2c4"/>
        <rect x="103" y="103" width="4" height="16" fill="#d9ae68"/>
        <g fill="#fff8ee" opacity="0.8">
          <circle cx="28" cy="36" r="1.6"/>
          <circle cx="120" cy="55" r="1.5"/>
          <circle cx="126" cy="25" r="1.1"/>
        </g>
      </svg>`,
  };

  function setStats(items) {
    ui.stats.replaceChildren();
    items.forEach((item) => {
      const chip = document.createElement('span');
      chip.className = 'stat';
      chip.textContent = item;
      ui.stats.append(chip);
    });
  }

  function setStars(count, visible) {
    ui.stars.hidden = !visible;
    ui.stars.replaceChildren();
    if (!visible) return;
    for (let index = 0; index < 3; index += 1) {
      const star = document.createElement('span');
      star.className = index < count ? 'star on' : 'star';
      star.textContent = '★';
      ui.stars.append(star);
    }
  }

  function openOverlay(tone) {
    ui.panel.dataset.tone = tone;
    ui.overlay.hidden = false;
    canvas.tabIndex = -1;
    if (ui.mute) ui.mute.tabIndex = -1;
    requestAnimationFrame(() => {
      ui.primary.focus({ preventScroll: true });
    });
  }

  function closeOverlay() {
    if (ui.overlay.hidden) return;
    ui.overlay.hidden = true;
    canvas.tabIndex = 0;
    if (ui.mute) ui.mute.tabIndex = 0;
    requestAnimationFrame(() => {
      canvas.focus({ preventScroll: true });
    });
  }

  function showStartOverlay() {
    ui.art.innerHTML = ART.start;
    ui.eyebrow.textContent = 'UN REGALITO DE NAVIDAD';
    ui.title.textContent = 'Perfumería\nde Navidad';
    ui.text.textContent = PERSONAL.startText;
    setStars(0, false);
    setStats(['5 niveles', isCoarse ? 'Doble toque' : 'Doble clic', 'Arrastra para mirar']);
    ui.tip.textContent =
      `${isCoarse ? 'Doble toque' : 'Doble clic'} en el mismo producto para cogerlo. ` +
      'Si coges algo que no está en la lista, devuelves uno de la cesta. El tiempo corre.';
    ui.primary.textContent = 'ABRIR LA TIENDA';
    ui.primary.dataset.action = 'start';
    ui.secondary.hidden = true;
    openOverlay('start');
  }

  function showLevelClearOverlay() {
    const config = levelConfig();
    const stars = computeStars();
    const seconds = Math.max(0, Math.ceil(game.secondsLeft));

    ui.art.innerHTML = ART.gift;
    ui.eyebrow.textContent = `NIVEL ${game.levelIndex + 1} · ${config.label.toUpperCase()}`;
    ui.title.textContent = '¡Cesta lista!';
    ui.text.textContent =
      `Has encontrado ${game.list.length} ${plural(game.list.length, 'producto', 'productos')} ` +
      `de la lista. Te sobraron ${seconds} ${plural(seconds, 'segundo', 'segundos')}.`;
    setStars(stars, true);
    setStats([`Nivel ${game.levelIndex + 1} de ${LEVELS_CONFIG.length}`, `+${seconds} s`]);
    ui.tip.textContent = config.clearTip;
    ui.primary.textContent = 'SIGUIENTE NIVEL';
    ui.primary.dataset.action = 'next';
    ui.secondary.hidden = true;
    openOverlay('clear');
  }

  function showGameOverOverlay() {
    const missing = Math.max(0, game.list.length - game.collected.length);
    const config = levelConfig();

    ui.art.innerHTML = ART.clock;
    ui.eyebrow.textContent = 'TIEMPO AGOTADO';
    ui.title.textContent = '¡Se acabó el tiempo!';
    ui.text.textContent =
      `Te ${missing === 1 ? 'faltó' : 'faltaron'} ${missing} ` +
      `${plural(missing, 'producto', 'productos')} para completar la lista. ` +
      'La tienda cierra, pero puedes volver a intentarlo.';
    setStars(0, false);
    setStats([
      `Nivel ${game.levelIndex + 1} de ${LEVELS_CONFIG.length}`,
      `Cesta ${game.collected.length}/${game.list.length}`,
      config.label,
    ]);
    ui.tip.textContent = game.listHidden
      ? 'Pista: con «VER LISTA» puedes consultar la lista durante unos segundos.'
      : `Pista: hace falta ${isCoarse ? 'doble toque' : 'doble clic'}. Un solo toque solo muestra el nombre.`;
    ui.primary.textContent = 'REINTENTAR NIVEL';
    ui.primary.dataset.action = 'retry';
    ui.secondary.hidden = false;
    ui.secondary.textContent = 'VOLVER AL INICIO';
    ui.secondary.dataset.action = 'menu';
    openOverlay('over');
  }

  function showVictoryOverlay() {
    const totalProducts = LEVELS_CONFIG.reduce((sum, level) => sum + level.items, 0);

    ui.art.innerHTML = ART.tree;
    ui.eyebrow.textContent = '5 NIVELES · CESTA COMPLETA';
    ui.title.textContent = PERSONAL.victoryTitle;
    ui.text.textContent = PERSONAL.victoryMessage;
    setStars(0, false);
    setStats([
      `${totalProducts} productos`,
      `${LEVELS_CONFIG.length} niveles`,
      '1 Navidad',
    ]);
    ui.tip.textContent = PERSONAL.signature;
    ui.primary.textContent = 'JUGAR OTRA VEZ';
    ui.primary.dataset.action = 'replay';
    ui.secondary.hidden = true;
    openOverlay('victory');
  }

  function handleOverlayAction(action) {
    switch (action) {
      case 'start':
      case 'replay':
        startLevel(0);
        break;
      case 'next':
        startLevel(game.levelIndex + 1);
        break;
      case 'retry':
        startLevel(game.levelIndex);
        break;
      case 'menu':
        goToStart();
        break;
      default:
        break;
    }
  }

  ui.primary.addEventListener('click', () => handleOverlayAction(ui.primary.dataset.action));
  ui.secondary.addEventListener('click', () => handleOverlayAction(ui.secondary.dataset.action));

  /* ==========================================================================
     11 · TOASTS, PARTÍCULAS Y EFECTOS
     ========================================================================== */

  function showToast(title, sub, tone = 'warn', duration = 2.3) {
    game.toast = {
      title,
      sub,
      tone,
      t: 0,
      dur: duration,
    };
  }

  function spawnBurst(x, y, color, count = 12, extraGold = false) {
    for (let index = 0; index < count; index += 1) {
      const angle = rand(0, TAU);
      const speed = rand(40, 170);
      game.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - rand(20, 80),
        gravity: rand(160, 300),
        size: rand(2, 5.2),
        life: rand(0.45, 0.95),
        maxLife: 0.95,
        color: extraGold && index % 2 === 0 ? C.gold : color,
        rot: rand(0, TAU),
        vr: rand(-6, 6),
      });
    }
  }

  function spawnRing(x, y, color = C.gold) {
    game.rings.push({
      x,
      y,
      r: 8,
      maxR: 38,
      life: 0.5,
      maxLife: 0.5,
      color,
    });
  }

  function spawnFloat(x, y, text, color = C.gold, size = 14) {
    game.floats.push({
      x,
      y,
      text,
      color,
      size,
      life: 0.9,
      maxLife: 0.9,
      vy: -34,
    });
  }

  function spawnConfetti(count) {
    const colors = [C.gold, C.berry, '#8fd6b6', '#f2aac8', C.cream];
    for (let index = 0; index < count; index += 1) {
      game.confetti.push({
        x: rand(0, metrics.stageW),
        y: rand(-metrics.stageH * 0.25, -10),
        vx: rand(-24, 24),
        vy: rand(45, 125),
        size: rand(3, 7),
        color: colors[Math.floor(rand(0, colors.length))],
        rot: rand(0, TAU),
        vr: rand(-6, 6),
        sway: rand(0, TAU),
        life: rand(3.8, 6.2),
        maxLife: 6.2,
        star: Math.random() < 0.24,
      });
    }
  }

  function playSfx(name) {
    playAudio(name);
  }

  /* ==========================================================================
     12 · ENTRADA (POINTER / WHEEL / TECLADO)
     ========================================================================== */

  function localPoint(event) {
    return {
      x: event.clientX - metrics.stageX,
      y: event.clientY - metrics.stageY,
    };
  }

  function insideStage(point) {
    return (
      point.x >= 0 &&
      point.x <= metrics.stageW &&
      point.y >= 0 &&
      point.y <= metrics.stageH
    );
  }

  function buttonAt(x, y) {
    for (let index = canvasButtons.length - 1; index >= 0; index -= 1) {
      const button = canvasButtons[index];
      if (
        x >= button.x &&
        x <= button.x + button.w &&
        y >= button.y &&
        y <= button.y + button.h
      ) {
        return button;
      }
    }
    return null;
  }

  function scrollBy(delta) {
    if (game.state !== STATES.PLAYING) return;
    const next = game.scroll + delta;
    game.scroll = clamp(next, -26, game.maxScroll + 26);
  }

  function toggleList() {
    if (game.state !== STATES.PLAYING || !game.listHidden) return;

    if (isListVisible()) {
      game.listReveal = 0;
      game.listPeek = 0;
    } else {
      game.listPeek = GAME_RULES.peekSeconds;
    }
    playSfx('ui');
  }

  function handleCanvasButton(action) {
    if (action === 'list') toggleList();
  }

  function worldPoint(x, y) {
    const showcaseOffset =
      game.state === STATES.START
        ? Math.max(0, (footerTop() - metrics.safe.top - game.worldH) / 2)
        : 0;
    return {
      x,
      y: y - game.hudH - showcaseOffset + game.scroll,
    };
  }

  function placementAt(x, y) {
    const point = worldPoint(x, y);
    for (let index = game.placements.length - 1; index >= 0; index -= 1) {
      const placement = game.placements[index];
      if (placement.collected) continue;
      const half = placement.slotW / 2 - 1;
      const top = placement.baseY - placement.maxH - 16;
      if (
        point.x >= placement.x - half &&
        point.x <= placement.x + half &&
        point.y >= top &&
        point.y <= placement.baseY + 9
      ) {
        return placement;
      }
    }
    return null;
  }

  function handleWorldTap(x, y) {
    if (game.state !== STATES.PLAYING) return;
    if (game.pendingClear > 0) return;
    if (game.shuffleLock > 0) return;
    if (y < game.hudH || y > footerTop()) return;

    const placement = placementAt(x, y);
    if (!placement) {
      game.lastTap = null;
      game.pendingShow = null;
      return;
    }

    const now = game.time;
    if (
      game.lastTap &&
      game.lastTap.uid === placement.uid &&
      now - game.lastTap.t <= GAME_RULES.doubleTapMs / 1000
    ) {
      resolvePlacement(placement);
      return;
    }

    game.lastTap = { uid: placement.uid, t: now };
    game.pendingShow = { uid: placement.uid, until: now + GAME_RULES.pendingHintMs / 1000 };
    playSfx('tap');
  }

  function resolvePlacement(placement) {
    game.lastTap = null;
    game.pendingShow = null;

    if (placement.needed) {
      collectPlacement(placement);
    } else {
      wrongPlacement(placement);
    }
  }

  function collectPlacement(placement) {
    if (placement.collected) return;

    placement.collected = true;
    game.collected.push(placement.uid);
    game.hintTime = 0;

    const startX = placement.x;
    const startY = clamp(
      game.hudH + placement.baseY - placement.maxH * 0.55 - game.scroll,
      game.hudH + 12,
      footerTop() - 20
    );
    const basket = basketPillRect();
    game.flyers.push({
      product: placement.product,
      x0: startX,
      y0: startY,
      x1: basket.x + 34,
      y1: basket.y + basket.h / 2,
      t: 0,
      dur: 0.46,
    });

    spawnBurst(
      placement.x,
      placement.baseY - placement.maxH * 0.5,
      placement.product.colors.body || C.gold,
      14
    );
    spawnRing(placement.x, placement.baseY - placement.maxH * 0.3, C.gold);
    spawnFloat(
      placement.x,
      placement.baseY - placement.maxH - 4,
      '+1',
      C.gold,
      15
    );

    playSfx('collect');
    vibrate(12);

    const done = game.collected.length;
    announce(
      `${placement.product.name} en la cesta. ${done} de ${game.list.length}.`
    );

    if (done === game.list.length) {
      game.pendingClear = 0.85;
      spawnBurst(
        placement.x,
        placement.baseY - placement.maxH * 0.5,
        C.gold,
        26,
        true
      );
      playSfx('complete');
    }
  }

  function wrongPlacement(placement) {
    if (game.cooldown > 0) return;

    let lost = null;
    const lostUid = game.collected.pop();
    if (lostUid) {
      lost = game.placements.find((item) => item.uid === lostUid) || null;
      if (lost) {
        lost.collected = false;
        lost.spawn = 0.45;
      }
    }

    game.cooldown = GAME_RULES.invulnerableMs / 1000;
    game.flash = 1;
    game.shake = 0.4;
    game.basketShake = 0.5;
    game.lastTap = null;
    game.pendingShow = null;

    showToast(
      '¡Eso no estaba en la lista!',
      lost
        ? `Devuelves ${lost.product.short.toLowerCase()} a la estantería.`
        : 'La cesta estaba vacía: esta vez no pierdes nada.',
      'warn',
      2.4
    );

    spawnFloat(
      placement.x,
      placement.baseY - placement.maxH - 4,
      '✕',
      C.red,
      18
    );
    spawnBurst(
      placement.x,
      placement.baseY - placement.maxH * 0.5,
      '#ff8aa0',
      8
    );

    playSfx('wrong');
    vibrate([40, 50, 40]);

    announce(
      `Ese producto no estaba en la lista. ` +
      (lost
        ? `Devuelves ${lost.product.name}. Cesta ${game.collected.length} de ${game.list.length}.`
        : 'La cesta estaba vacía. No pierdes ningún producto.')
    );
  }

  canvas.addEventListener('pointerdown', (event) => {
    if (game.state !== STATES.PLAYING) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (pointer) return;

    const point = localPoint(event);
    if (!insideStage(point)) return;

    const button = buttonAt(point.x, point.y);
    const inWorld =
      !button &&
      point.y >= game.hudH &&
      point.y <= footerTop() - 1;

    pointer = {
      id: event.pointerId,
      startX: point.x,
      startY: point.y,
      lastX: point.x,
      lastY: point.y,
      startT: performance.now(),
      lastT: performance.now(),
      moved: false,
      startedInWorld: inWorld,
      pressAction: button ? button.action : null,
    };

    game.pressAction = pointer.pressAction;
    game.scrollVel = 0;

    try {
      canvas.setPointerCapture(event.pointerId);
    } catch (error) {
      /* Algunos navegadores no permiten capturar el puntero. */
    }

    event.preventDefault();
  });

  canvas.addEventListener('pointermove', (event) => {
    if (!pointer || event.pointerId !== pointer.id) return;

    const point = localPoint(event);
    const dx = point.x - pointer.startX;
    const dy = point.y - pointer.startY;
    if (!pointer.moved && Math.hypot(dx, dy) > 10) {
      pointer.moved = true;
      if (pointer.pressAction) {
        pointer.pressAction = null;
        game.pressAction = null;
      }
    }

    if (pointer.moved && pointer.startedInWorld) {
      const deltaY = point.y - pointer.lastY;
      if (deltaY !== 0) {
        scrollBy(-deltaY);
        const elapsed = Math.max(0.012, (performance.now() - pointer.lastT) / 1000);
        game.scrollVel = clamp(-deltaY / elapsed, -1500, 1500);
      }
    }

    pointer.lastX = point.x;
    pointer.lastY = point.y;
    pointer.lastT = performance.now();
    event.preventDefault();
  });

  function releasePointer(event) {
    if (!pointer || event.pointerId !== pointer.id) return;

    const point = localPoint(event);
    const elapsed = performance.now() - pointer.lastT;
    const holdMs = performance.now() - pointer.startT;
    const wasPress = pointer.pressAction;

    if (!pointer.moved && wasPress) {
      const button = buttonAt(point.x, point.y);
      if (button && button.action === wasPress) {
        handleCanvasButton(wasPress);
      }
      game.pressAction = null;
    } else if (!pointer.moved && pointer.startedInWorld && holdMs < 650) {
      handleWorldTap(point.x, point.y);
      game.scrollVel = 0;
    }

    if (pointer.moved && elapsed > 80) {
      game.scrollVel *= 0.75;
    }

    pointer = null;
    game.pressAction = null;
    event.preventDefault();
  }

  canvas.addEventListener('pointerup', releasePointer);
  canvas.addEventListener('pointercancel', (event) => {
    if (!pointer || event.pointerId !== pointer.id) return;
    pointer = null;
    game.pressAction = null;
  });

  canvas.addEventListener(
    'wheel',
    (event) => {
      if (game.state !== STATES.PLAYING) return;
      event.preventDefault();
      scrollBy(clamp(event.deltaY, -90, 90));
      game.scrollVel = 0;
    },
    { passive: false }
  );

  canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });

  canvas.addEventListener('keydown', (event) => {
    if (game.state !== STATES.PLAYING) return;
    if (event.key === 'l' || event.key === 'L') {
      toggleList();
      event.preventDefault();
    } else if (event.key === 'ArrowDown') {
      scrollBy(72);
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      scrollBy(-72);
      event.preventDefault();
    }
  });

  /* ==========================================================================
     13 · UPDATE
     ========================================================================== */

  function update(dt) {
    game.time += dt;

    // Nieve y HUD siempre se animan.
    if (game.snow.length) {
      for (const flake of game.snow) {
        flake.y += flake.speed * dt;
        flake.x += Math.sin(game.time * 0.7 + flake.phase) * flake.drift * dt;
        if (flake.y > metrics.stageH + 4) {
          flake.y = -4;
          flake.x = rand(0, metrics.stageW);
        }
        if (flake.x < -4) flake.x = metrics.stageW + 4;
        if (flake.x > metrics.stageW + 4) flake.x = -4;
      }
    }

    if (game.state === STATES.PLAYING && !rotateBlocked.matches) {
      if (game.listHidden) {
        if (game.listReveal > 0) {
          game.listReveal = Math.max(0, game.listReveal - dt);
        } else if (game.listPeek > 0) {
          game.listPeek = Math.max(0, game.listPeek - dt);
        }
      }

      if (game.cooldown > 0) {
        game.cooldown = Math.max(0, game.cooldown - dt);
      }
      if (game.hintTime > 0) {
        game.hintTime = Math.max(0, game.hintTime - dt);
      }

      if (game.pendingClear > 0) {
        game.pendingClear -= dt;
        if (game.pendingClear <= 0 && game.state === STATES.PLAYING) {
          game.pendingClear = 0;
          finishLevel();
        }
      } else if (game.state === STATES.PLAYING) {
        game.secondsLeft = Math.max(0, game.secondsLeft - dt);
        if (game.secondsLeft <= 0) {
          triggerGameOver();
        }
      }

      if (
        game.state === STATES.PLAYING &&
        game.secondsLeft > 0 &&
        game.pendingClear <= 0 &&
        game.cooldown <= 0 &&
        game.shuffleLock <= 0
      ) {
        game.nextShuffleIn -= dt;
        if (game.nextShuffleIn <= 0) {
          shuffleShelves();
        }
      }
    }

    if (game.shuffleLock > 0) {
      game.shuffleLock = Math.max(0, game.shuffleLock - dt);
    }

    // HUD animado.
    const targetHud = hudTargetH();
    if (game.hudSnap) {
      game.hudH = targetHud;
      game.hudSnap = false;
    } else {
      const k = 1 - Math.exp(-14 * dt);
      game.hudH += (targetHud - game.hudH) * k;
      if (Math.abs(targetHud - game.hudH) < 0.15) game.hudH = targetHud;
    }

    const viewportH = Math.max(1, footerTop() - game.hudH);
    game.maxScroll = Math.max(0, game.worldH - viewportH);

    // Inercia y rebote del scroll.
    if (game.state === STATES.PLAYING && (!pointer || !pointer.moved)) {
      game.scroll += game.scrollVel * dt;
      game.scrollVel *= Math.exp(-5.5 * dt);
      if (Math.abs(game.scrollVel) < 2.5) game.scrollVel = 0;

      if (game.scroll < 0) {
        game.scroll += (0 - game.scroll) * Math.min(1, dt * 16);
        if (game.scroll > -0.4) game.scroll = 0;
      } else if (game.scroll > game.maxScroll) {
        game.scroll += (game.maxScroll - game.scroll) * Math.min(1, dt * 16);
        if (game.scroll < game.maxScroll + 0.4) game.scroll = game.maxScroll;
      }
    } else {
      game.scroll = clamp(game.scroll, -26, game.maxScroll + 26);
    }

    // Efectos.
    game.flash = Math.max(0, game.flash - dt * 2.8);
    game.shake = Math.max(0, game.shake - dt * 2.6);
    game.basketShake = Math.max(0, game.basketShake - dt * 2.4);
    game.basketPop = Math.max(0, game.basketPop - dt * 4.2);

    if (game.toast) {
      game.toast.t += dt;
      if (game.toast.t > game.toast.dur) game.toast = null;
    }

    if (game.pendingShow && game.pendingShow.until < game.time) {
      game.pendingShow = null;
    }

    for (const placement of game.placements) {
      if (placement.spawn > 0) {
        placement.spawn = Math.max(0, placement.spawn - dt);
      }
      if (placement.moveT > 0) {
        placement.moveT = Math.max(0, placement.moveT - dt);
      }
    }

    updateEffects(dt);
  }

  function updateEffects(dt) {
    // Partículas del mundo.
    for (const particle of game.particles) {
      particle.life -= dt;
      particle.vy += particle.gravity * dt;
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vx *= Math.exp(-1.4 * dt);
      particle.rot += particle.vr * dt;
    }
    game.particles = game.particles.filter((particle) => particle.life > 0);

    for (const ring of game.rings) {
      ring.life -= dt;
      const progress = 1 - ring.life / ring.maxLife;
      ring.r = lerp(8, ring.maxR, easeOutCubic(progress));
    }
    game.rings = game.rings.filter((ring) => ring.life > 0);

    for (const float of game.floats) {
      float.life -= dt;
      float.y += float.vy * dt;
      float.vy *= Math.exp(-2 * dt);
    }
    game.floats = game.floats.filter((float) => float.life > 0);

    for (const flyer of game.flyers) {
      flyer.t += dt / flyer.dur;
      if (flyer.t >= 1) {
        game.basketPop = 1;
      }
    }
    game.flyers = game.flyers.filter((flyer) => flyer.t < 1);

    for (const confetti of game.confetti) {
      confetti.life -= dt;
      confetti.vy += 20 * dt;
      confetti.y += confetti.vy * dt;
      confetti.x +=
        Math.sin(game.time * 2 + confetti.sway) * 20 * dt + confetti.vx * dt;
      confetti.rot += confetti.vr * dt;
    }
    game.confetti = game.confetti.filter(
      (confetti) => confetti.life > 0 && confetti.y < metrics.stageH + 30
    );
  }

  /* ==========================================================================
     14 · AYUDAS DE DIBUJO
     ========================================================================== */

  function rr(x, y, width, height, radius) {
    const w = Math.max(0.01, width);
    const h = Math.max(0.01, height);
    const r = Math.max(0, Math.min(radius, w / 2, h / 2));
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function gradient(x0, y0, x1, y1, stops) {
    const grad = ctx.createLinearGradient(x0, y0, x1, y1);
    stops.forEach(([offset, color]) => grad.addColorStop(offset, color));
    return grad;
  }

  function shade(hex, amount) {
    const value = parseInt(hex.replace('#', ''), 16);
    let r = (value >> 16) & 255;
    let g = (value >> 8) & 255;
    let b = value & 255;
    r = clamp(Math.round(r + (255 * amount) / 100), 0, 255);
    g = clamp(Math.round(g + (255 * amount) / 100), 0, 255);
    b = clamp(Math.round(b + (255 * amount) / 100), 0, 255);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function setFont(size, weight = 400, family = FONT_UI) {
    ctx.font = `${weight} ${size}px ${family}`;
  }

  function measureText(text, size, weight = 400, family = FONT_UI, spacing = 0) {
    ctx.save();
    setFont(size, weight, family);
    if (spacing && 'letterSpacing' in ctx) ctx.letterSpacing = `${spacing}px`;
    const width = ctx.measureText(text).width;
    ctx.restore();
    return width;
  }

  function text(str, x, y, size, options = {}) {
    const {
      weight = 400,
      family = FONT_UI,
      color = C.cream,
      align = 'left',
      baseline = 'middle',
      alpha = 1,
      maxWidth = 0,
      spacing = 0,
    } = options;

    ctx.save();
    ctx.globalAlpha *= clamp(alpha, 0, 1);
    setFont(size, weight, family);
    if (spacing && 'letterSpacing' in ctx) ctx.letterSpacing = `${spacing}px`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;

    let value = String(str);
    if (maxWidth > 0 && ctx.measureText(value).width > maxWidth) {
      while (value.length > 1 && ctx.measureText(`${value}…`).width > maxWidth) {
        value = value.slice(0, -1);
      }
      value += '…';
    }
    ctx.fillText(value, x, y);
    ctx.restore();
  }

  function starPath(cx, cy, outer, inner, points = 4, rotation = -Math.PI / 2) {
    ctx.beginPath();
    for (let index = 0; index < points * 2; index += 1) {
      const radius = index % 2 === 0 ? outer : inner;
      const angle = rotation + (index * Math.PI) / points;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  function checkMark(cx, cy, size, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(1.2, size * 0.24);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - size * 0.34, cy);
    ctx.lineTo(cx - size * 0.06, cy + size * 0.28);
    ctx.lineTo(cx + size * 0.36, cy - size * 0.28);
    ctx.stroke();
    ctx.restore();
  }

  /* ==========================================================================
     15 · ARTE DE LOS PRODUCTOS
     Todo se dibuja dentro de una caja normalizada:
       x de -0.5 a 0.5 · y de -1 (arriba) a 0 (base)
     ========================================================================== */

  const SHAPES = {
    lipstick(product) {
      const { body, accent } = product.colors;

      ctx.fillStyle = gradient(-0.5, 0, 0.5, 0, [
        [0, '#140d16'],
        [0.35, '#3b2a3c'],
        [0.68, '#281d2a'],
        [1, '#0f0a11'],
      ]);
      rr(-0.45, -0.5, 0.9, 0.5, 0.05);
      ctx.fill();

      ctx.fillStyle = accent;
      rr(-0.46, -0.06, 0.92, 0.06, 0.02);
      ctx.fill();

      ctx.fillStyle = gradient(0, -0.66, 0, -0.5, [
        [0, '#ffe3a3'],
        [0.5, accent],
        [1, shade(accent, -25)],
      ]);
      rr(-0.48, -0.63, 0.96, 0.13, 0.03);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-0.32, -0.62);
      ctx.lineTo(-0.32, -0.84);
      ctx.quadraticCurveTo(-0.04, -0.9, 0.31, -0.995);
      ctx.lineTo(0.31, -0.62);
      ctx.closePath();
      ctx.fillStyle = gradient(-0.4, -1, 0.4, -0.5, [
        [0, shade(body, 25)],
        [0.5, body],
        [1, shade(body, -20)],
      ]);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-0.24, -0.68);
      ctx.quadraticCurveTo(-0.18, -0.82, 0.06, -0.9);
      ctx.strokeStyle = 'rgba(255,255,255,0.34)';
      ctx.lineWidth = 0.028;
      ctx.stroke();

      ctx.fillStyle = 'rgba(255,255,255,0.65)';
      ctx.beginPath();
      ctx.arc(0, -0.3, 0.035, 0, TAU);
      ctx.fill();
    },

    mist(product) {
      const { accent, glass } = product.colors;

      ctx.fillStyle = accent;
      rr(-0.28, -1, 0.56, 0.1, 0.03);
      ctx.fill();
      ctx.fillStyle = shade(accent, -16);
      rr(-0.12, -0.92, 0.24, 0.08, 0.02);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.52)';
      rr(-0.16, -0.85, 0.32, 0.09, 0.03);
      ctx.fill();

      ctx.fillStyle = gradient(-0.5, 0, 0.5, 0, [
        [0, shade(glass, -12)],
        [0.28, glass],
        [0.52, '#ffffff'],
        [1, shade(glass, -16)],
      ]);
      rr(-0.46, -0.78, 0.92, 0.78, 0.14);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,252,246,0.86)';
      rr(-0.37, -0.55, 0.74, 0.28, 0.05);
      ctx.fill();
      ctx.fillStyle = accent;
      rr(-0.37, -0.4, 0.74, 0.035, 0.02);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255,255,255,0.6)';
      ctx.lineWidth = 0.025;
      ctx.beginPath();
      ctx.moveTo(-0.34, -0.62);
      ctx.lineTo(-0.34, -0.18);
      ctx.stroke();

      ctx.fillStyle = shade(glass, -20);
      ctx.beginPath();
      ctx.arc(0, -0.69, 0.025, 0, TAU);
      ctx.fill();

      ctx.fillStyle = 'rgba(180,240,235,0.55)';
      [-0.58, -0.45, -0.3].forEach((offset, index) => {
        ctx.beginPath();
        ctx.arc(0.36 + index * 0.06, -0.82 - index * 0.06, 0.022, 0, TAU);
        ctx.fill();
      });
    },

    dropper(product) {
      const { body, accent, glass, liquid } = product.colors;

      ctx.fillStyle = shade(body, -32);
      rr(-0.18, -1, 0.36, 0.12, 0.05);
      ctx.fill();

      ctx.fillStyle = gradient(0, -0.9, 0, -0.76, [
        [0, '#ffe7af'],
        [0.5, accent],
        [1, shade(accent, -20)],
      ]);
      rr(-0.29, -0.9, 0.58, 0.14, 0.03);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      rr(-0.22, -0.79, 0.44, 0.12, 0.02);
      ctx.fill();

      ctx.fillStyle = gradient(-0.5, 0, 0.5, 0, [
        [0, shade(glass, -8)],
        [0.32, glass],
        [0.58, '#fffaf0'],
        [1, shade(glass, -16)],
      ]);
      rr(-0.48, -0.68, 0.96, 0.68, 0.1);
      ctx.fill();

      ctx.save();
      rr(-0.44, -0.5, 0.88, 0.46, 0.08);
      ctx.clip();
      ctx.fillStyle = liquid;
      ctx.fillRect(-0.5, -0.47, 1, 0.5);
      ctx.fillStyle = 'rgba(255,255,255,0.22)';
      ctx.beginPath();
      ctx.ellipse(0, -0.47, 0.42, 0.045, 0, 0, TAU);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = 'rgba(255,251,243,0.92)';
      rr(-0.32, -0.56, 0.64, 0.22, 0.03);
      ctx.fill();
      ctx.strokeStyle = 'rgba(120,70,30,0.35)';
      ctx.lineWidth = 0.015;
      ctx.beginPath();
      ctx.moveTo(-0.22, -0.47);
      ctx.lineTo(0.2, -0.47);
      ctx.moveTo(-0.22, -0.42);
      ctx.lineTo(0.08, -0.42);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255,255,255,0.58)';
      ctx.lineWidth = 0.025;
      ctx.beginPath();
      ctx.moveTo(-0.39, -0.6);
      ctx.lineTo(-0.39, -0.12);
      ctx.stroke();
    },

    eyeliner(product) {
      const { body, accent } = product.colors;

      ctx.fillStyle = gradient(-0.5, 0, 0.5, 0, [
        [0, '#0f0a12'],
        [0.42, shade(body, 18)],
        [1, '#0d0910'],
      ]);
      rr(-0.38, -0.79, 0.76, 0.79, 0.07);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-0.26, -0.79);
      ctx.lineTo(0, -1);
      ctx.lineTo(0.26, -0.79);
      ctx.closePath();
      ctx.fillStyle = shade(body, 8);
      ctx.fill();

      ctx.fillStyle = accent;
      rr(-0.42, -0.4, 0.84, 0.07, 0.02);
      ctx.fill();

      ctx.fillStyle = accent;
      rr(-0.4, -0.09, 0.8, 0.08, 0.02);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255,255,255,0.22)';
      ctx.lineWidth = 0.024;
      ctx.beginPath();
      ctx.moveTo(-0.29, -0.7);
      ctx.lineTo(-0.29, -0.14);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.beginPath();
      ctx.arc(0, -0.94, 0.014, 0, TAU);
      ctx.fill();
    },

    compact(product) {
      const { body, accent } = product.colors;

      ctx.fillStyle = shade(body, -28);
      ctx.beginPath();
      ctx.ellipse(0, -0.12, 0.5, 0.12, 0, 0, TAU);
      ctx.fill();
      ctx.fillStyle = shade(body, -10);
      ctx.fillRect(-0.5, -0.45, 1, 0.33);

      ctx.fillStyle = shade(body, 8);
      ctx.beginPath();
      ctx.ellipse(0, -0.45, 0.5, 0.13, 0, 0, TAU);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-0.5, -0.45);
      ctx.bezierCurveTo(-0.5, -0.78, -0.28, -1, 0, -1);
      ctx.bezierCurveTo(0.28, -1, 0.5, -0.78, 0.5, -0.45);
      ctx.closePath();
      ctx.fillStyle = gradient(-0.5, -1, 0.5, -0.4, [
        [0, shade(body, 25)],
        [0.5, body],
        [1, shade(body, -25)],
      ]);
      ctx.fill();

      ctx.strokeStyle = accent;
      ctx.lineWidth = 0.035;
      ctx.beginPath();
      ctx.moveTo(-0.47, -0.46);
      ctx.bezierCurveTo(-0.47, -0.76, -0.27, -0.96, 0, -0.96);
      ctx.bezierCurveTo(0.27, -0.96, 0.47, -0.76, 0.47, -0.46);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      rr(-0.18, -0.74, 0.36, 0.12, 0.04);
      ctx.fill();

      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.ellipse(-0.08, -0.945, 0.06, 0.035, -0.5, 0, TAU);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0.08, -0.945, 0.06, 0.035, 0.5, 0, TAU);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, -0.94, 0.028, 0, TAU);
      ctx.fill();

      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(0, -0.22, 0.045, 0, TAU);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.beginPath();
      ctx.arc(-0.3, -0.76, 0.035, 0, TAU);
      ctx.fill();
    },

    mascara(product) {
      const { body, accent, dark } = product.colors;

      ctx.fillStyle = gradient(-0.5, 0, 0.5, 0, [
        [0, '#0d0810'],
        [0.35, shade(dark, 18)],
        [1, '#090609'],
      ]);
      rr(-0.44, -0.62, 0.88, 0.62, 0.12);
      ctx.fill();

      ctx.fillStyle = body;
      rr(-0.44, -0.49, 0.88, 0.16, 0.03);
      ctx.fill();

      ctx.fillStyle = accent;
      rr(-0.47, -0.66, 0.94, 0.07, 0.02);
      ctx.fill();

      ctx.fillStyle = gradient(-0.5, -1, 0.5, -0.62, [
        [0, '#241726'],
        [0.45, shade(dark, 22)],
        [1, '#0b070c'],
      ]);
      rr(-0.5, -1, 1, 0.36, 0.12);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 0.018;
      for (let index = 0; index < 4; index += 1) {
        const x = -0.32 + index * 0.21;
        ctx.beginPath();
        ctx.moveTo(x, -0.94);
        ctx.lineTo(x, -0.7);
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(255,255,255,0.22)';
      ctx.lineWidth = 0.024;
      ctx.beginPath();
      ctx.moveTo(-0.31, -0.57);
      ctx.lineTo(-0.31, -0.12);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.beginPath();
      ctx.arc(0, -0.72, 0.03, 0, TAU);
      ctx.fill();
    },

    pump(product) {
      const { accent, glass, liquid } = product.colors;

      ctx.fillStyle = accent;
      rr(-0.06, -1, 0.4, 0.12, 0.04);
      ctx.fill();
      ctx.fillStyle = shade(accent, -18);
      rr(0.27, -0.975, 0.11, 0.06, 0.02);
      ctx.fill();
      ctx.fillStyle = shade(accent, -25);
      rr(-0.04, -0.9, 0.1, 0.17, 0.02);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      rr(-0.14, -0.79, 0.28, 0.09, 0.02);
      ctx.fill();

      ctx.fillStyle = gradient(-0.5, 0, 0.5, 0, [
        [0, shade(glass, -10)],
        [0.35, glass],
        [0.55, '#ffffff'],
        [1, shade(glass, -14)],
      ]);
      rr(-0.48, -0.72, 0.96, 0.72, 0.14);
      ctx.fill();

      ctx.save();
      rr(-0.42, -0.46, 0.84, 0.4, 0.1);
      ctx.clip();
      ctx.fillStyle = liquid;
      ctx.fillRect(-0.5, -0.45, 1, 0.48);
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.beginPath();
      ctx.ellipse(0, -0.45, 0.4, 0.04, 0, 0, TAU);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = 'rgba(255,252,246,0.9)';
      rr(-0.32, -0.61, 0.64, 0.21, 0.03);
      ctx.fill();
      ctx.strokeStyle = 'rgba(75,110,85,0.35)';
      ctx.lineWidth = 0.014;
      ctx.beginPath();
      ctx.moveTo(-0.22, -0.53);
      ctx.lineTo(0.2, -0.53);
      ctx.moveTo(-0.22, -0.48);
      ctx.lineTo(0.1, -0.48);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255,255,255,0.55)';
      ctx.lineWidth = 0.025;
      ctx.beginPath();
      ctx.moveTo(-0.4, -0.62);
      ctx.lineTo(-0.4, -0.16);
      ctx.stroke();
    },

    gloss(product) {
      const { body, accent, glass } = product.colors;

      ctx.fillStyle = gradient(-0.5, 0, 0.5, 0, [
        [0, shade(glass, -12)],
        [0.35, glass],
        [0.6, '#ffffff'],
        [1, shade(glass, -15)],
      ]);
      rr(-0.4, -0.6, 0.8, 0.6, 0.1);
      ctx.fill();

      ctx.fillStyle = body;
      rr(-0.3, -0.52, 0.6, 0.4, 0.08);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255,255,255,0.6)';
      ctx.lineWidth = 0.028;
      ctx.beginPath();
      ctx.moveTo(-0.24, -0.47);
      ctx.lineTo(-0.24, -0.16);
      ctx.stroke();

      ctx.fillStyle = gradient(0, -1, 0, -0.66, [
        [0, '#ffe7af'],
        [0.5, accent],
        [1, shade(accent, -22)],
      ]);
      rr(-0.47, -1, 0.94, 0.34, 0.06);
      ctx.fill();

      ctx.strokeStyle = 'rgba(110,65,25,0.18)';
      ctx.lineWidth = 0.018;
      for (let index = 0; index < 5; index += 1) {
        const x = -0.32 + index * 0.16;
        ctx.beginPath();
        ctx.moveTo(x, -0.96);
        ctx.lineTo(x, -0.7);
        ctx.stroke();
      }

      ctx.fillStyle = shade(accent, -28);
      rr(-0.44, -0.69, 0.88, 0.055, 0.02);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.beginPath();
      ctx.arc(0, -0.77, 0.03, 0, TAU);
      ctx.fill();
    },

    flacon(product) {
      const { accent, glass, liquid } = product.colors;

      ctx.fillStyle = gradient(0, -1, 0, -0.78, [
        [0, '#ffe7af'],
        [0.5, accent],
        [1, shade(accent, -22)],
      ]);
      rr(-0.26, -1, 0.52, 0.2, 0.04);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.38)';
      rr(-0.22, -0.98, 0.1, 0.16, 0.02);
      ctx.fill();

      ctx.fillStyle = shade(accent, -18);
      rr(-0.17, -0.83, 0.34, 0.08, 0.02);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-0.5, -0.2);
      ctx.lineTo(-0.5, -0.58);
      ctx.quadraticCurveTo(-0.5, -0.7, -0.22, -0.76);
      ctx.lineTo(-0.16, -0.8);
      ctx.lineTo(0.16, -0.8);
      ctx.lineTo(0.22, -0.76);
      ctx.quadraticCurveTo(0.5, -0.7, 0.5, -0.58);
      ctx.lineTo(0.5, -0.2);
      ctx.quadraticCurveTo(0.5, 0, 0.34, 0);
      ctx.lineTo(-0.34, 0);
      ctx.quadraticCurveTo(-0.5, 0, -0.5, -0.2);
      ctx.closePath();
      ctx.fillStyle = gradient(-0.5, 0, 0.5, 0, [
        [0, shade(glass, -12)],
        [0.3, glass],
        [0.58, '#fff6fa'],
        [1, shade(glass, -14)],
      ]);
      ctx.fill();

      ctx.save();
      ctx.clip();
      ctx.fillStyle = liquid;
      ctx.fillRect(-0.5, -0.46, 1, 0.5);
      ctx.fillStyle = 'rgba(255,255,255,0.24)';
      ctx.beginPath();
      ctx.ellipse(0, -0.46, 0.43, 0.04, 0, 0, TAU);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = 'rgba(255,252,247,0.92)';
      rr(-0.3, -0.6, 0.6, 0.28, 0.04);
      ctx.fill();
      ctx.strokeStyle = 'rgba(140,70,90,0.38)';
      ctx.lineWidth = 0.014;
      ctx.beginPath();
      ctx.moveTo(-0.2, -0.52);
      ctx.lineTo(0.18, -0.52);
      ctx.moveTo(-0.2, -0.46);
      ctx.lineTo(0.08, -0.46);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255,255,255,0.55)';
      ctx.lineWidth = 0.026;
      ctx.beginPath();
      ctx.moveTo(-0.42, -0.6);
      ctx.lineTo(-0.42, -0.16);
      ctx.stroke();
    },

    polish(product) {
      const { body, accent, dark } = product.colors;

      ctx.beginPath();
      ctx.moveTo(-0.48, -0.08);
      ctx.lineTo(-0.48, -0.3);
      ctx.quadraticCurveTo(-0.48, -0.4, -0.28, -0.46);
      ctx.lineTo(-0.16, -0.54);
      ctx.lineTo(0.16, -0.54);
      ctx.lineTo(0.28, -0.46);
      ctx.quadraticCurveTo(0.48, -0.4, 0.48, -0.3);
      ctx.lineTo(0.48, -0.08);
      ctx.quadraticCurveTo(0.48, 0, 0.36, 0);
      ctx.lineTo(-0.36, 0);
      ctx.quadraticCurveTo(-0.48, 0, -0.48, -0.08);
      ctx.closePath();
      ctx.fillStyle = gradient(-0.5, 0, 0.5, 0, [
        [0, shade(body, -26)],
        [0.35, body],
        [0.65, shade(body, 20)],
        [1, shade(body, -30)],
      ]);
      ctx.fill();

      ctx.fillStyle = accent;
      rr(-0.2, -0.6, 0.4, 0.08, 0.02);
      ctx.fill();

      ctx.fillStyle = gradient(0, -1, 0, -0.55, [
        [0, '#1a111c'],
        [0.42, shade(dark, 18)],
        [1, '#0d0810'],
      ]);
      rr(-0.34, -1, 0.68, 0.44, 0.06);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 0.026;
      ctx.beginPath();
      ctx.moveTo(-0.24, -0.94);
      ctx.lineTo(-0.24, -0.64);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255,250,245,0.7)';
      rr(-0.26, -0.28, 0.52, 0.12, 0.03);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 0.025;
      ctx.beginPath();
      ctx.moveTo(-0.37, -0.18);
      ctx.lineTo(-0.37, -0.06);
      ctx.stroke();
    },

    jar(product) {
      const { body, accent } = product.colors;

      ctx.fillStyle = gradient(-0.5, 0, 0.5, 0, [
        [0, shade(body, -12)],
        [0.35, body],
        [1, shade(body, -24)],
      ]);
      rr(-0.5, -0.42, 1, 0.42, 0.14);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,252,246,0.88)';
      rr(-0.32, -0.34, 0.64, 0.14, 0.03);
      ctx.fill();
      ctx.strokeStyle = 'rgba(150,110,60,0.3)';
      ctx.lineWidth = 0.014;
      ctx.beginPath();
      ctx.moveTo(-0.22, -0.29);
      ctx.lineTo(0.2, -0.29);
      ctx.moveTo(-0.22, -0.25);
      ctx.lineTo(0.06, -0.25);
      ctx.stroke();

      ctx.fillStyle = gradient(0, -0.9, 0, -0.44, [
        [0, '#ffe8b2'],
        [0.45, accent],
        [1, shade(accent, -26)],
      ]);
      rr(-0.5, -0.88, 1, 0.44, 0.1);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,246,216,0.4)';
      ctx.beginPath();
      ctx.ellipse(0, -0.88, 0.5, 0.085, 0, 0, TAU);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.42)';
      rr(-0.4, -0.8, 0.12, 0.16, 0.03);
      ctx.fill();

      ctx.strokeStyle = shade(accent, -30);
      ctx.lineWidth = 0.02;
      ctx.beginPath();
      ctx.moveTo(-0.5, -0.48);
      ctx.lineTo(0.5, -0.48);
      ctx.stroke();
    },

    palette(product) {
      const { body, accent, pans } = product.colors;

      ctx.fillStyle = gradient(0, -1, 0, 0, [
        [0, shade(body, 16)],
        [0.55, body],
        [1, shade(body, -24)],
      ]);
      rr(-0.5, -1, 1, 0.92, 0.06);
      ctx.fill();

      ctx.fillStyle = gradient(0, -0.94, 0, -0.55, [
        [0, '#dce7ea'],
        [0.45, '#f5fbfc'],
        [1, '#b9c8ce'],
      ]);
      rr(-0.43, -0.94, 0.86, 0.36, 0.03);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255,255,255,0.7)';
      ctx.lineWidth = 0.014;
      ctx.beginPath();
      ctx.moveTo(-0.37, -0.86);
      ctx.lineTo(-0.12, -0.61);
      ctx.moveTo(-0.46, -0.74);
      ctx.lineTo(-0.3, -0.58);
      ctx.stroke();

      ctx.fillStyle = '#f7e8d7';
      rr(-0.45, -0.53, 0.9, 0.35, 0.03);
      ctx.fill();

      pans.forEach((color, index) => {
        ctx.fillStyle = color;
        rr(-0.37 + index * 0.19, -0.47, 0.15, 0.2, 0.03);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.22)';
        rr(-0.35 + index * 0.19, -0.45, 0.11, 0.04, 0.02);
        ctx.fill();
      });

      ctx.fillStyle = accent;
      rr(-0.06, -0.2, 0.12, 0.06, 0.02);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      rr(-0.34, -0.92, 0.12, 0.08, 0.02);
      ctx.fill();
    },

    highlighter(product) {
      const { body, accent, glass } = product.colors;

      ctx.fillStyle = gradient(-0.5, 0, 0.5, 0, [
        [0, shade(body, -18)],
        [0.38, body],
        [1, shade(body, -30)],
      ]);
      rr(-0.42, -0.55, 0.84, 0.55, 0.1);
      ctx.fill();

      ctx.fillStyle = accent;
      rr(-0.45, -0.62, 0.9, 0.1, 0.03);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-0.35, -0.62);
      ctx.lineTo(-0.35, -0.82);
      ctx.quadraticCurveTo(-0.35, -0.95, -0.12, -0.99);
      ctx.lineTo(0.12, -0.99);
      ctx.quadraticCurveTo(0.35, -0.95, 0.35, -0.82);
      ctx.lineTo(0.35, -0.62);
      ctx.closePath();
      ctx.fillStyle = gradient(0, -1, 0, -0.6, [
        [0, '#fff8ec'],
        [0.5, glass],
        [1, shade(glass, -12)],
      ]);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255,255,255,0.7)';
      ctx.lineWidth = 0.022;
      ctx.beginPath();
      ctx.moveTo(-0.22, -0.66);
      ctx.quadraticCurveTo(-0.2, -0.88, 0.04, -0.94);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255,255,255,0.88)';
      starPath(-0.14, -0.82, 0.045, 0.015, 4);
      ctx.fill();
      starPath(0.16, -0.91, 0.032, 0.011, 4);
      ctx.fill();

      ctx.fillStyle = accent;
      rr(-0.12, -0.28, 0.24, 0.06, 0.02);
      ctx.fill();
    },

    brush(product) {
      const { body, accent, bristle } = product.colors;

      ctx.fillStyle = gradient(-0.3, 0, 0.3, 0, [
        [0, '#100b13'],
        [0.45, shade(body, 24)],
        [1, '#0b070d'],
      ]);
      rr(-0.09, -0.5, 0.18, 0.5, 0.06);
      ctx.fill();

      ctx.fillStyle = gradient(0, -0.64, 0, -0.48, [
        [0, '#ffe7af'],
        [0.5, accent],
        [1, shade(accent, -24)],
      ]);
      rr(-0.15, -0.64, 0.3, 0.16, 0.03);
      ctx.fill();

      ctx.fillStyle = 'rgba(120,70,20,0.28)';
      rr(-0.15, -0.6, 0.3, 0.02, 0.01);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-0.24, -0.64);
      ctx.bezierCurveTo(-0.36, -0.82, -0.3, -1, 0, -1);
      ctx.bezierCurveTo(0.3, -1, 0.36, -0.82, 0.24, -0.64);
      ctx.closePath();
      ctx.fillStyle = gradient(0, -1, 0, -0.6, [
        [0, shade(bristle, 18)],
        [0.6, bristle],
        [1, shade(bristle, -18)],
      ]);
      ctx.fill();

      ctx.strokeStyle = 'rgba(120,50,70,0.18)';
      ctx.lineWidth = 0.016;
      for (let index = -2; index <= 2; index += 1) {
        ctx.beginPath();
        ctx.moveTo(index * 0.07, -0.68);
        ctx.lineTo(index * 0.1, -0.94);
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(255,255,255,0.32)';
      ctx.beginPath();
      ctx.ellipse(-0.1, -0.8, 0.06, 0.12, -0.4, 0, TAU);
      ctx.fill();
    },
  };

  function drawProduct(product, cx, baseY, maxW, maxH, options = {}) {
    const shape = SHAPES[product.shape];
    if (!shape) return { w: 0, h: 0 };

    const aspect = product.aspect || 0.6;
    let h = maxH;
    let w = h * aspect;
    if (w > maxW) {
      w = maxW;
      h = w / aspect;
    }

    const scale = options.scale == null ? 1 : options.scale;
    const alpha = options.alpha == null ? 1 : options.alpha;
    const lift = options.lift == null ? 0 : options.lift;
    const showShadow = options.shadow !== false;

    ctx.save();
    ctx.globalAlpha *= clamp(alpha, 0, 1);

    if (showShadow) {
      ctx.fillStyle = 'rgba(8,2,8,0.5)';
      ctx.beginPath();
      ctx.ellipse(
        cx,
        baseY - lift + 2,
        Math.max(4, w * 0.42),
        Math.max(2, w * 0.09),
        0,
        0,
        TAU
      );
      ctx.fill();
    }

    ctx.translate(cx, baseY - lift);
    ctx.scale(w * scale, h * scale);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    shape(product);
    ctx.restore();

    return { w, h };
  }

  /* ==========================================================================
     16 · FONDO, ESCAPARATE Y ESTANTERÍAS
     ========================================================================== */

  function drawOuterBackground() {
    const { screenW, screenH, stageX, stageY, stageW, stageH, radius } = metrics;

    const background = ctx.createLinearGradient(0, 0, 0, screenH);
    background.addColorStop(0, '#1c0b18');
    background.addColorStop(0.55, '#120812');
    background.addColorStop(1, '#090409');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, screenW, screenH);

    const glow = ctx.createRadialGradient(
      screenW * 0.5,
      screenH * 0.22,
      10,
      screenW * 0.5,
      screenH * 0.22,
      screenW * 0.72
    );
    glow.addColorStop(0, 'rgba(120, 47, 83, 0.16)');
    glow.addColorStop(1, 'rgba(120, 47, 83, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, screenW, screenH);

    if (radius > 0) {
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 48;
      ctx.shadowOffsetY = 20;
      rr(stageX, stageY, stageW, stageH, radius);
      ctx.fillStyle = '#1d0c19';
      ctx.fill();
      ctx.restore();
    }
  }

  function drawStageBackdrop() {
    const width = metrics.stageW;
    const height = metrics.stageH;

    const background = ctx.createLinearGradient(0, 0, 0, height);
    background.addColorStop(0, C.wall0);
    background.addColorStop(0.46, C.wall1);
    background.addColorStop(1, C.wall2);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    const glow = ctx.createRadialGradient(
      width * 0.5,
      height * 0.24,
      8,
      width * 0.5,
      height * 0.24,
      width * 1.05
    );
    glow.addColorStop(0, 'rgba(255, 192, 130, 0.15)');
    glow.addColorStop(0.45, 'rgba(255, 148, 172, 0.055)');
    glow.addColorStop(1, 'rgba(255, 148, 172, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255, 232, 224, 0.018)';
    for (let x = 0; x < width; x += 34) {
      ctx.fillRect(x, 0, 15, height);
    }

    for (const bubble of game.bokeh) {
      ctx.fillStyle = `rgba(${bubble.color}, ${bubble.a})`;
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.r, 0, TAU);
      ctx.fill();
    }

    for (const flake of game.snow) {
      ctx.fillStyle = `rgba(255, 248, 238, ${flake.alpha})`;
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.r, 0, TAU);
      ctx.fill();
    }
  }

  function drawGarland(y) {
    const width = metrics.stageW;
    const swag = (x) => y + 8 + Math.sin((x / Math.max(1, width)) * Math.PI) * 10;

    ctx.save();
    ctx.strokeStyle = 'rgba(44, 102, 76, 0.9)';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    for (let x = 0; x <= width; x += 8) {
      const yy = swag(x);
      if (x === 0) ctx.moveTo(x, yy);
      else ctx.lineTo(x, yy);
    }
    ctx.stroke();

    for (let x = 4; x < width; x += 10) {
      const yy = swag(x);
      ctx.strokeStyle = 'rgba(74, 137, 102, 0.58)';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(x, yy);
      ctx.lineTo(x - 4.5, yy + 7);
      ctx.moveTo(x, yy);
      ctx.lineTo(x + 4.5, yy + 7);
      ctx.stroke();
    }

    const bulbColors = [C.gold, C.red, '#9fe3c5', '#ffb1c8'];
    let index = 0;
    for (let x = 20; x < width - 6; x += 52) {
      const yy = swag(x) + 6;
      const twinkle = 0.55 + 0.45 * Math.sin(game.time * 2.5 + index * 1.7);
      const color = bulbColors[index % bulbColors.length];

      ctx.globalAlpha = 0.12 + twinkle * 0.2;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, yy, 8 + twinkle * 2, 0, TAU);
      ctx.fill();

      ctx.globalAlpha = 0.55 + twinkle * 0.45;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, yy, 3.1, 0, TAU);
      ctx.fill();

      ctx.globalAlpha = 0.9;
      ctx.fillStyle = '#2c4b3b';
      ctx.fillRect(x - 2, yy - 5.2, 4, 2);

      ctx.globalAlpha = 1;
      index += 1;
    }
    ctx.restore();
  }

  function drawPineSprig(x, y, direction) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(direction, 1);

    ctx.strokeStyle = '#3f7e61';
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    for (let index = 0; index < 5; index += 1) {
      const angle = -1.15 + index * 0.22;
      const length = index % 2 === 0 ? 15 : 12;
      const ex = Math.cos(angle) * length;
      const ey = Math.sin(angle) * length;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(ex, ey);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(ex * 0.55, ey * 0.55);
      ctx.lineTo(ex * 0.55 + 4, ey * 0.55 + 3);
      ctx.moveTo(ex * 0.55, ey * 0.55);
      ctx.lineTo(ex * 0.55 - 2, ey * 0.55 + 4);
      ctx.stroke();
    }

    ctx.fillStyle = '#d3425b';
    ctx.beginPath();
    ctx.arc(-3, -9, 1.7, 0, TAU);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(7, -6, 1.35, 0, TAU);
    ctx.fill();

    ctx.restore();
  }

  function drawShopTree(cx, baseY, height, t) {
    const width = height * 0.72;

    const halo = ctx.createRadialGradient(
      cx,
      baseY - height * 0.5,
      4,
      cx,
      baseY - height * 0.5,
      height * 0.78
    );
    halo.addColorStop(0, 'rgba(255, 206, 138, 0.13)');
    halo.addColorStop(1, 'rgba(255, 206, 138, 0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, baseY - height * 0.5, height * 0.78, 0, TAU);
    ctx.fill();

    ctx.fillStyle = gradient(0, baseY - height * 0.2, 0, baseY, [
      [0, '#7a4a2d'],
      [0.5, '#5c3522'],
      [1, '#3d2118'],
    ]);
    rr(cx - height * 0.038, baseY - height * 0.18, height * 0.076, height * 0.18, 3);
    ctx.fill();

    const layer = (topY, bottomY, layerWidth, light) => {
      ctx.beginPath();
      ctx.moveTo(cx, topY);
      ctx.quadraticCurveTo(
        cx - layerWidth * 0.2,
        bottomY - height * 0.08,
        cx - layerWidth / 2,
        bottomY
      );
      ctx.quadraticCurveTo(cx, bottomY + height * 0.035, cx + layerWidth / 2, bottomY);
      ctx.quadraticCurveTo(
        cx + layerWidth * 0.2,
        bottomY - height * 0.08,
        cx,
        topY
      );
      ctx.closePath();
      ctx.fillStyle = gradient(0, topY, 0, bottomY, [
        [0, light ? '#4b9a73' : '#3b8161'],
        [0.55, light ? '#2f7058' : '#285e49'],
        [1, '#1b4434'],
      ]);
      ctx.fill();
      ctx.strokeStyle = 'rgba(143, 214, 182, 0.22)';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    layer(baseY - height * 0.62, baseY - height * 0.05, width, false);
    layer(baseY - height * 0.8, baseY - height * 0.3, width * 0.82, true);
    layer(baseY - height * 0.95, baseY - height * 0.52, width * 0.62, true);

    const ornaments = [
      [-0.24, -0.18, '#e04b63'],
      [0.27, -0.25, C.gold],
      [-0.17, -0.38, '#f2aac8'],
      [0.2, -0.5, C.gold],
      [-0.05, -0.65, '#e04b63'],
      [0.31, -0.11, '#9fe3c5'],
      [-0.32, -0.09, C.gold],
    ];
    ornaments.forEach(([px, py, color], index) => {
      const x = cx + px * width;
      const y = baseY + py * height;
      const twinkle = 0.7 + 0.3 * Math.sin(t * 2.2 + index * 1.4);
      ctx.save();
      ctx.globalAlpha = 0.22 * twinkle;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, TAU);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, TAU);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.beginPath();
      ctx.arc(x - 1.2, y - 1.3, 1.1, 0, TAU);
      ctx.fill();
      ctx.restore();
    });

    const topY = baseY - height * 1.02;
    ctx.save();
    ctx.fillStyle = 'rgba(255, 220, 151, 0.18)';
    ctx.beginPath();
    ctx.arc(cx, topY, 16, 0, TAU);
    ctx.fill();
    ctx.fillStyle = gradient(0, topY - 10, 0, topY + 10, [
      [0, '#fff0c4'],
      [0.5, C.gold],
      [1, '#b77f35'],
    ]);
    starPath(cx, topY, 10, 4, 5);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = 'rgba(255, 249, 238, 0.55)';
    [
      [-0.2, -0.33],
      [0.14, -0.42],
      [0.3, -0.2],
      [-0.08, -0.55],
      [-0.3, -0.16],
      [0.17, -0.7],
    ].forEach(([px, py]) => {
      ctx.beginPath();
      ctx.arc(cx + px * width, baseY + py * height, 1.2, 0, TAU);
      ctx.fill();
    });
  }

  function drawGiftBox(x, baseY, width, height, boxColor, ribbonColor) {
    ctx.fillStyle = 'rgba(8, 2, 8, 0.32)';
    ctx.beginPath();
    ctx.ellipse(x, baseY + 2, width * 0.55, 5, 0, 0, TAU);
    ctx.fill();

    ctx.fillStyle = gradient(0, baseY - height, 0, baseY, [
      [0, shade(boxColor, 12)],
      [1, shade(boxColor, -22)],
    ]);
    rr(x - width / 2, baseY - height, width, height, 4);
    ctx.fill();

    ctx.fillStyle = gradient(0, baseY - height - 6, 0, baseY - height + 3, [
      [0, shade(boxColor, 22)],
      [1, shade(boxColor, -8)],
    ]);
    rr(x - width / 2 - 3, baseY - height - 6, width + 6, 9, 3);
    ctx.fill();

    ctx.fillStyle = ribbonColor;
    ctx.fillRect(x - width * 0.07, baseY - height - 6, width * 0.14, height + 6);
    ctx.fillRect(x - width / 2, baseY - height + 4, width, 3.5);

    ctx.save();
    ctx.fillStyle = ribbonColor;
    ctx.beginPath();
    ctx.ellipse(x - width * 0.13, baseY - height - 9, width * 0.14, height * 0.1, -0.5, 0, TAU);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + width * 0.13, baseY - height - 9, width * 0.14, height * 0.1, 0.5, 0, TAU);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, baseY - height - 7, width * 0.06, 0, TAU);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    rr(x - width * 0.36, baseY - height + 2, width * 0.1, height * 0.25, 2);
    ctx.fill();
  }

  function drawShopScene(t) {
    if (!game.worldH) return;
    const width = metrics.stageW;
    const baseY = game.worldH - 30;
    const floorTop = game.worldH - 112;

    const floor = ctx.createLinearGradient(0, floorTop, 0, game.worldH);
    floor.addColorStop(0, 'rgba(78, 37, 51, 0)');
    floor.addColorStop(0.28, 'rgba(86, 42, 54, 0.48)');
    floor.addColorStop(1, 'rgba(43, 18, 30, 0.92)');
    ctx.fillStyle = floor;
    ctx.fillRect(0, floorTop, width, game.worldH - floorTop);

    ctx.fillStyle = 'rgba(239, 197, 124, 0.16)';
    ctx.fillRect(0, floorTop, width, 1);

    const rug = ctx.createRadialGradient(
      width * 0.5,
      baseY + 18,
      4,
      width * 0.5,
      baseY + 18,
      width * 0.42
    );
    rug.addColorStop(0, 'rgba(124, 31, 62, 0.34)');
    rug.addColorStop(0.75, 'rgba(124, 31, 62, 0.2)');
    rug.addColorStop(1, 'rgba(124, 31, 62, 0)');
    ctx.fillStyle = rug;
    ctx.beginPath();
    ctx.ellipse(width * 0.5, baseY + 18, width * 0.4, 22, 0, 0, TAU);
    ctx.fill();

    ctx.strokeStyle = 'rgba(239, 197, 124, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(width * 0.5, baseY + 18, width * 0.33, 15, 0, 0, TAU);
    ctx.stroke();

    drawShopTree(width * 0.27, baseY, 156, t);

    drawGiftBox(width * 0.59, baseY + 4, 28, 24, C.pine, C.gold);
    drawGiftBox(width * 0.7, baseY + 2, 48, 40, '#a72b4e', C.gold);
    drawGiftBox(width * 0.84, baseY + 5, 36, 30, C.creamDeep, C.berry);

    ctx.fillStyle = 'rgba(255, 249, 238, 0.6)';
    ctx.beginPath();
    ctx.arc(width * 0.5, floorTop + 13, 1.5, 0, TAU);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(width * 0.46, floorTop + 25, 1.1, 0, TAU);
    ctx.fill();
  }

  function drawShelf(y) {
    const info = game.worldInfo;
    if (!info) return;
    const { x0, x1 } = info;

    const shadow = ctx.createLinearGradient(0, y + 17, 0, y + 40);
    shadow.addColorStop(0, 'rgba(0,0,0,0.34)');
    shadow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadow;
    ctx.fillRect(x0 - 8, y + 16, x1 - x0 + 16, 25);

    ctx.fillStyle = gradient(0, y, 0, y + 18, [
      [0, '#a7736b'],
      [0.3, '#8d595d'],
      [0.65, '#713f4d'],
      [1, '#4a2736'],
    ]);
    rr(x0 - 4, y, x1 - x0 + 8, 18, 5);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 226, 190, 0.28)';
    ctx.fillRect(x0 + 2, y + 1.2, x1 - x0 - 4, 2);

    ctx.fillStyle = 'rgba(28, 9, 20, 0.23)';
    ctx.fillRect(x0 - 1, y + 14.5, x1 - x0 + 2, 2.2);

    ctx.fillStyle = 'rgba(239, 197, 124, 0.42)';
    ctx.fillRect(x0 + 6, y + 17, x1 - x0 - 12, 1);

    ctx.strokeStyle = 'rgba(239, 197, 124, 0.28)';
    ctx.lineWidth = 1;
    for (const bx of [x0 + 15, x1 - 15]) {
      ctx.beginPath();
      ctx.moveTo(bx - 5, y + 18);
      ctx.lineTo(bx, y + 22);
      ctx.lineTo(bx + 5, y + 18);
      ctx.stroke();
    }

    drawPineSprig(x0 + 18, y + 13, 1);
    drawPineSprig(x1 - 18, y + 13, -1);
  }

  function drawWorld(t, vpTop, vpBottom, showcase) {
    if (!game.placements.length) return;

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, vpTop, metrics.stageW, vpBottom - vpTop);
    ctx.clip();

    const warm = ctx.createRadialGradient(
      metrics.stageW / 2,
      vpTop + 90,
      20,
      metrics.stageW / 2,
      vpTop + 90,
      metrics.stageW * 0.9
    );
    warm.addColorStop(0, 'rgba(255, 199, 140, 0.075)');
    warm.addColorStop(1, 'rgba(255, 199, 140, 0)');
    ctx.fillStyle = warm;
    ctx.fillRect(0, vpTop, metrics.stageW, vpBottom - vpTop);

    drawGarland(vpTop + 1);

    const showcaseOffset = showcase
      ? Math.max(0, (vpBottom - vpTop - game.worldH) / 2)
      : 0;
    const shakeX = Math.sin(game.time * 87) * game.shake * 9;
    const shakeY = Math.cos(game.time * 73) * game.shake * 7;

    ctx.save();
    ctx.translate(shakeX, vpTop + showcaseOffset - game.scroll + shakeY);

    if (game.worldInfo) {
      const { rows, worldTop, rowH } = game.worldInfo;
      for (let row = 0; row < rows; row += 1) {
        drawShelf(worldTop + row * rowH + rowH - 26);
      }
    }

    drawShopScene(t);

    const movingPlacements = [];
    for (const placement of game.placements) {
      if (placement.collected) continue;
      if (placement.moveT > 0) {
        movingPlacements.push(placement);
      } else {
        drawPlacement(placement, t);
      }
    }
    for (const placement of movingPlacements) {
      drawPlacement(placement, t);
    }

    drawWorldEffects();

    ctx.restore();

    drawPendingTag();

    const topShade = ctx.createLinearGradient(0, vpTop, 0, vpTop + 20);
    topShade.addColorStop(0, 'rgba(9, 3, 8, 0.42)');
    topShade.addColorStop(1, 'rgba(9, 3, 8, 0)');
    ctx.fillStyle = topShade;
    ctx.fillRect(0, vpTop, metrics.stageW, 20);

    if (!showcase && game.maxScroll > 0.5) {
      drawScrollbar(vpTop, vpBottom);
    }

    ctx.restore();
  }

  function drawScrollbar(vpTop, vpBottom) {
    const trackHeight = Math.max(20, vpBottom - vpTop - 24);
    const trackX = metrics.stageW - metrics.safe.right - 4;
    const thumbHeight = clamp(
      trackHeight * ((vpBottom - vpTop) / Math.max(game.worldH, 1)),
      24,
      trackHeight
    );
    const ratio =
      game.maxScroll > 0 ? clamp(game.scroll / game.maxScroll, 0, 1) : 0;
    const thumbY = vpTop + 12 + (trackHeight - thumbHeight) * ratio;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.075)';
    rr(trackX - 1.5, vpTop + 12, 3, trackHeight, 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(239, 197, 124, 0.44)';
    rr(trackX - 1.5, thumbY, 3, thumbHeight, 2);
    ctx.fill();
  }

  function drawPlacement(placement, t) {
    if (placement.collected) return;

    const progress =
      placement.spawn > 0 ? 1 - placement.spawn / 0.45 : 1;
    const alpha = placement.spawn > 0 ? 0.2 + 0.8 * progress : 1;
    const scale = placement.spawn > 0 ? 0.72 + 0.28 * easeOutCubic(progress) : 1;

    const moving = placement.moveT > 0;
    const moveProgress = moving
      ? clamp(1 - placement.moveT / Math.max(0.001, placement.moveDur), 0, 1)
      : 1;
    const moveEase = moving ? easeInOutCubic(moveProgress) : 1;
    const drawX = moving
      ? lerp(placement.fromX, placement.x, moveEase)
      : placement.x;
    const drawBaseY = moving
      ? lerp(placement.fromY, placement.baseY, moveEase) -
        Math.sin(Math.PI * moveProgress) * 30
      : placement.baseY;

    const selected =
      game.state === STATES.PLAYING &&
      game.pendingShow &&
      game.pendingShow.uid === placement.uid;
    const armed =
      selected &&
      game.lastTap &&
      game.lastTap.uid === placement.uid &&
      game.time - game.lastTap.t <= GAME_RULES.doubleTapMs / 1000;
    const lift = selected ? 2 + Math.sin(game.time * 8) * 1.2 : 0;

    if (moving) {
      const motionGlow = ctx.createRadialGradient(
        drawX,
        drawBaseY - placement.maxH * 0.5,
        2,
        drawX,
        drawBaseY - placement.maxH * 0.5,
        placement.maxH * 0.8
      );
      motionGlow.addColorStop(0, 'rgba(255, 219, 151, 0.13)');
      motionGlow.addColorStop(1, 'rgba(255, 219, 151, 0)');
      ctx.fillStyle = motionGlow;
      ctx.beginPath();
      ctx.arc(
        drawX,
        drawBaseY - placement.maxH * 0.5,
        placement.maxH * 0.8,
        0,
        TAU
      );
      ctx.fill();
    }

    if (selected) {
      const glow = ctx.createRadialGradient(
        drawX,
        drawBaseY - placement.maxH * 0.5,
        3,
        drawX,
        drawBaseY - placement.maxH * 0.5,
        placement.maxH * 0.85
      );
      glow.addColorStop(0, `rgba(255, 219, 151, ${armed ? 0.25 : 0.13})`);
      glow.addColorStop(1, 'rgba(255, 219, 151, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(
        drawX,
        drawBaseY - placement.maxH * 0.5,
        placement.maxH * 0.85,
        0,
        TAU
      );
      ctx.fill();
    }

    drawProduct(
      placement.product,
      drawX,
      drawBaseY - lift,
      placement.maxW,
      placement.maxH,
      { alpha, scale }
    );

    const twinkle = Math.sin(t * 1.8 + placement.seed * TAU);
    if (!moving && twinkle > 0.82) {
      ctx.save();
      ctx.globalAlpha = (twinkle - 0.82) * 2.2;
      ctx.fillStyle = 'rgba(255, 238, 197, 0.9)';
      starPath(
        drawX + placement.maxW * 0.32,
        drawBaseY - placement.maxH - 3,
        3.6,
        1.3,
        4
      );
      ctx.fill();
      ctx.restore();
    }

    if (selected) {
      const left = drawX - placement.slotW * 0.4;
      const right = drawX + placement.slotW * 0.4;
      const top = drawBaseY - lift - placement.maxH - 7;
      const bottom = drawBaseY - lift + 5;
      const length = 8;
      const pulse = 0.65 + 0.35 * Math.sin(game.time * 9);

      ctx.save();
      ctx.strokeStyle = `rgba(255, 221, 158, ${pulse})`;
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(left, top + length);
      ctx.lineTo(left, top);
      ctx.lineTo(left + length, top);
      ctx.moveTo(right - length, top);
      ctx.lineTo(right, top);
      ctx.lineTo(right, top + length);
      ctx.moveTo(right, bottom - length);
      ctx.lineTo(right, bottom);
      ctx.lineTo(right - length, bottom);
      ctx.moveTo(left + length, bottom);
      ctx.lineTo(left, bottom);
      ctx.lineTo(left, bottom - length);
      ctx.stroke();
      ctx.restore();

      if (armed) {
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 221, 158, 0.36)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(
          drawX,
          drawBaseY + 1,
          placement.slotW * 0.34,
          4,
          0,
          0,
          TAU
        );
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  function drawPendingTag() {
    if (!game.pendingShow || game.state !== STATES.PLAYING) return;

    const placement = game.placements.find(
      (item) => item.uid === game.pendingShow.uid
    );
    if (!placement || placement.collected) return;

    const screenBase =
      game.hudH + placement.baseY - game.scroll;
    if (screenBase < game.hudH - 30 || screenBase > footerTop() + 40) return;

    const label = placement.product.name;
    const fontSize = 10;
    const labelWidth = measureText(label, fontSize, 700);
    const width = Math.min(
      metrics.stageW - metrics.safe.left - metrics.safe.right - 24,
      labelWidth + 46
    );
    const height = 24;
    const left = clamp(
      placement.x - width / 2,
      metrics.safe.left + 10,
      metrics.stageW - metrics.safe.right - 10 - width
    );
    let centerY = screenBase - placement.maxH - 12;
    if (centerY - height / 2 < game.hudH + 6) {
      centerY = screenBase + 20;
    }
    centerY = clamp(centerY, game.hudH + 18, footerTop() - 18);

    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.36)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 3;
    rr(left, centerY - height / 2, width, height, 12);
    ctx.fillStyle = 'rgba(31, 10, 25, 0.95)';
    ctx.fill();
    ctx.restore();

    ctx.strokeStyle = 'rgba(239, 197, 124, 0.7)';
    ctx.lineWidth = 1;
    rr(left + 0.5, centerY - height / 2 + 0.5, width - 1, height - 1, 11.5);
    ctx.stroke();

    text(label, left + 10, centerY, fontSize, {
      weight: 700,
      color: C.cream,
      maxWidth: width - 40,
    });

    const badgeX = left + width - 14;
    ctx.fillStyle = C.gold;
    ctx.beginPath();
    ctx.arc(badgeX, centerY, 8, 0, TAU);
    ctx.fill();
    text('2', badgeX, centerY + 0.5, 9, {
      weight: 800,
      color: C.wine,
      align: 'center',
    });
  }

  function drawWorldEffects() {
    for (const ring of game.rings) {
      const progress = ring.life / ring.maxLife;
      ctx.save();
      ctx.globalAlpha = progress * 0.8;
      ctx.strokeStyle = ring.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.r, 0, TAU);
      ctx.stroke();
      ctx.restore();
    }

    for (const particle of game.particles) {
      const alpha = clamp(particle.life / particle.maxLife, 0, 1);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = particle.color;
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rot);
      if (particle.size > 3.4) {
        starPath(0, 0, particle.size, particle.size * 0.34, 4);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, TAU);
        ctx.fill();
      }
      ctx.restore();
    }

    for (const float of game.floats) {
      const alpha = clamp(float.life / float.maxLife, 0, 1);
      text(float.text, float.x, float.y, float.size, {
        weight: 800,
        color: float.color,
        align: 'center',
        alpha,
      });
    }
  }

  /* ==========================================================================
     17 · HUD, LISTA Y PIE
     ========================================================================== */

  function drawHud() {
    const h = game.hudH;
    if (h <= 0) return;

    const background = ctx.createLinearGradient(0, 0, 0, h + 18);
    background.addColorStop(0, 'rgba(17, 6, 15, 0.98)');
    background.addColorStop(0.8, 'rgba(18, 6, 16, 0.94)');
    background.addColorStop(1, 'rgba(18, 6, 16, 0.86)');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, metrics.stageW, h);

    ctx.fillStyle = 'rgba(239, 197, 124, 0.32)';
    ctx.fillRect(0, h - 1, metrics.stageW, 1);

    const safe = metrics.safe;
    const pillX = safe.left + 12;
    const pillY = safe.top + 8;
    const pillH = 24;
    const levelLabel = `NIVEL ${game.levelIndex + 1}/${LEVELS_CONFIG.length}`;
    const labelWidth = measureText(levelLabel, 9, 700, FONT_UI, 0.8);
    const pillW = labelWidth + 22;

    rr(pillX, pillY, pillW, pillH, 12);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.065)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(239, 197, 124, 0.36)';
    ctx.lineWidth = 1;
    ctx.stroke();
    text(levelLabel, pillX + pillW / 2, pillY + 12.4, 9, {
      weight: 700,
      color: C.gold,
      align: 'center',
      spacing: 0.8,
    });

    const timerLabel = formatTime(game.secondsLeft);
    const timedFont = 12.5;
    const timerWidth = measureText(timerLabel, timedFont, 700);
    const timerRight = metrics.stageW - safe.right - 12 - 38;
    const lowTime = game.secondsLeft <= 10 && game.state === STATES.PLAYING;
    const pulse = lowTime ? 0.72 + 0.28 * Math.sin(game.time * 8) : 1;

    text(timerLabel, timerRight, pillY + 12.5, timedFont, {
      weight: 700,
      color: lowTime ? C.red : C.cream,
      align: 'right',
      alpha: pulse,
    });

    const clockX = timerRight - timerWidth - 10;
    ctx.save();
    ctx.strokeStyle = lowTime ? C.red : 'rgba(239, 197, 124, 0.8)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(clockX, pillY + 12.5, 5.2, 0, TAU);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(clockX, pillY + 12.5);
    ctx.lineTo(clockX, pillY + 9);
    ctx.moveTo(clockX, pillY + 12.5);
    ctx.lineTo(clockX + 2.2, pillY + 13.4);
    ctx.stroke();
    ctx.restore();

    const dotsX = pillX + pillW + 9;
    const dotsWidth = LEVELS_CONFIG.length * 8;
    if (dotsX + dotsWidth < clockX - 32) {
      LEVELS_CONFIG.forEach((level, index) => {
        const cx = dotsX + index * 8 + 3;
        const cy = pillY + 12;
        const active = index === game.levelIndex;
        const done = index < game.levelIndex;
        ctx.fillStyle = active
          ? C.gold
          : done
            ? 'rgba(239, 197, 124, 0.55)'
            : 'rgba(255, 255, 255, 0.17)';
        ctx.beginPath();
        ctx.arc(cx, cy, active ? 3 : 2.1, 0, TAU);
        ctx.fill();
        if (active) {
          ctx.strokeStyle = 'rgba(239, 197, 124, 0.24)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(cx, cy, 5.5, 0, TAU);
          ctx.stroke();
        }
      });
    }

    const barX = safe.left + 12;
    const barY = safe.top + 36;
    const barW = metrics.stageW - safe.left - safe.right - 24;
    const fraction =
      game.levelSeconds > 0
        ? clamp(game.secondsLeft / game.levelSeconds, 0, 1)
        : 0;

    rr(barX, barY, barW, 4, 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.085)';
    ctx.fill();

    if (fraction > 0) {
      const fillW = Math.max(3, barW * fraction);
      const barGradient = ctx.createLinearGradient(barX, 0, barX + barW, 0);
      if (lowTime) {
        barGradient.addColorStop(0, '#ff8ba0');
        barGradient.addColorStop(1, C.red);
      } else {
        barGradient.addColorStop(0, C.gold);
        barGradient.addColorStop(1, '#ffdfaa');
      }
      ctx.save();
      ctx.globalAlpha = lowTime ? pulse : 1;
      rr(barX, barY, fillW, 4, 2);
      ctx.fillStyle = barGradient;
      ctx.fill();
      ctx.restore();
    }

    if (isListVisible()) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, metrics.stageW, h);
      ctx.clip();
      drawListCard(safe.top + 44);
      ctx.restore();
    }
  }

  function drawListCard(y) {
    const safe = metrics.safe;
    const x = safe.left + 12;
    const width = metrics.stageW - safe.left - safe.right - 24;
    const height = listCardHeight();

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.32)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 5;
    rr(x, y, width, height, 14);
    ctx.fillStyle = C.cream;
    ctx.fill();
    ctx.restore();

    rr(x + 0.5, y + 0.5, width - 1, height - 1, 13.5);
    ctx.strokeStyle = 'rgba(124, 31, 62, 0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = C.goldDeep;
    starPath(x + 11, y + 13.5, 3.6, 1.4, 4);
    ctx.fill();

    text('LISTA DE LA COMPRA', x + 19, y + 13.6, 8.7, {
      weight: 700,
      color: C.wine,
      spacing: 0.9,
    });

    text(`${game.collected.length}/${game.list.length}`, x + width - 10, y + 13.6, 9, {
      weight: 700,
      color: C.goldInk,
      align: 'right',
    });

    const columns = 3;
    const pad = 7;
    const gap = 4;
    const chipW = (width - pad * 2 - gap * (columns - 1)) / columns;
    const chipH = 25;
    const chipsTop = y + 23;
    const rows = Math.ceil(game.list.length / columns);
    const chipsBottom = chipsTop + rows * chipH + (rows - 1) * 3;

    game.list.forEach((product, index) => {
      const placement = game.placements.find(
        (item) => item.needed && item.product.id === product.id
      );
      const done = placement ? placement.collected : false;
      const row = Math.floor(index / columns);
      const column = index % columns;
      const rowStart = row * columns;
      const rowCount = Math.min(columns, game.list.length - rowStart);
      const rowOffset = (columns - rowCount) / 2;
      const cx = x + pad + (rowOffset + column) * (chipW + gap);
      const cy = chipsTop + row * (chipH + 3);

      rr(cx, cy, chipW, chipH, 8);
      ctx.fillStyle = done
        ? 'rgba(232, 245, 235, 0.95)'
        : 'rgba(255, 250, 242, 0.96)';
      ctx.fill();
      ctx.strokeStyle = done
        ? 'rgba(58, 128, 102, 0.3)'
        : 'rgba(124, 31, 62, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.save();
      ctx.globalAlpha = done ? 0.6 : 1;
      ctx.fillStyle = hexToRgba(product.colors.body || C.berry, 0.13);
      ctx.beginPath();
      ctx.arc(cx + 14, cy + 12.5, 9.5, 0, TAU);
      ctx.fill();
      drawProduct(product, cx + 14, cy + 21, 17, 16, {
        shadow: false,
        alpha: done ? 0.7 : 1,
      });
      ctx.restore();

      const nameSpace = chipW - 28 - (done ? 15 : 5);
      text(product.short, cx + 25, cy + 12.8, 8.8, {
        weight: 600,
        color: done ? 'rgba(72, 33, 51, 0.58)' : C.ink,
        maxWidth: nameSpace,
      });

      if (done) {
        const checkX = cx + chipW - 9;
        ctx.fillStyle = C.mint;
        ctx.beginPath();
        ctx.arc(checkX, cy + 12.5, 5.6, 0, TAU);
        ctx.fill();
        checkMark(checkX, cy + 12.5, 7, '#f8fffa');
      }
    });

    if (game.listHidden) {
      let progress = 0;
      if (game.listReveal > 0 && game.listHideTotal > 0) {
        progress = clamp(game.listReveal / game.listHideTotal, 0, 1);
      } else if (game.listPeek > 0) {
        progress = clamp(game.listPeek / GAME_RULES.peekSeconds, 0, 1);
      }
      if (progress > 0) {
        const remaining = Math.max(1, Math.ceil(
          game.listReveal > 0 ? game.listReveal : game.listPeek
        ));
        text(
          `La lista se ocultará en ${remaining} s`,
          x + width / 2,
          chipsBottom + 8.5,
          8.1,
          {
            weight: 600,
            color: 'rgba(154, 109, 45, 0.9)',
            align: 'center',
            spacing: 0.15,
          }
        );

        ctx.fillStyle = 'rgba(124, 31, 62, 0.08)';
        ctx.fillRect(x + 10, y + height - 3.5, width - 20, 1.6);
        ctx.fillStyle = 'rgba(192, 143, 76, 0.62)';
        ctx.fillRect(x + 10, y + height - 3.5, (width - 20) * progress, 1.6);
      }
    }
  }

  function basketPillRect() {
    const safe = metrics.safe;
    const collectedCount = `${game.collected.length}/${game.list.length}`;
    const countWidth = measureText(collectedCount, 13, 800);
    const icons = game.collected
      .slice(-2)
      .map((uid) => game.placements.find((item) => item.uid === uid))
      .filter(Boolean);

    let width = 12 + 20 + 6 + countWidth + 12;
    if (icons.length) width += 6 + icons.length * 18;

    return {
      x: safe.left + 12,
      y: footerTop() + 10,
      w: width,
      h: 44,
      count: collectedCount,
      icons,
    };
  }

  function drawBasketIcon(cx, cy, scale = 1, rotation = 0) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);

    ctx.strokeStyle = C.wine;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(0, -3, 8, Math.PI, TAU);
    ctx.stroke();

    ctx.fillStyle = C.wine;
    ctx.beginPath();
    ctx.moveTo(-12, -2);
    ctx.lineTo(12, -2);
    ctx.lineTo(8.5, 10);
    ctx.quadraticCurveTo(8, 12, 6.2, 12);
    ctx.lineTo(-6.2, 12);
    ctx.quadraticCurveTo(-8, 12, -8.5, 10);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(252, 242, 229, 0.42)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-9, 2.5);
    ctx.lineTo(9, 2.5);
    ctx.moveTo(-7.5, 6.5);
    ctx.lineTo(7.5, 6.5);
    ctx.stroke();

    ctx.fillStyle = C.berry;
    ctx.beginPath();
    ctx.ellipse(-4.5, -2.5, 3.2, 2, -0.5, 0, TAU);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(4.5, -2.5, 3.2, 2, 0.5, 0, TAU);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, -2.5, 1.6, 0, TAU);
    ctx.fill();

    ctx.restore();
  }

  function drawFooter() {
    const y = footerTop();
    const safe = metrics.safe;
    const width = metrics.stageW;

    const topFade = ctx.createLinearGradient(0, y - 18, 0, y);
    topFade.addColorStop(0, 'rgba(12, 4, 11, 0)');
    topFade.addColorStop(1, 'rgba(12, 4, 11, 0.72)');
    ctx.fillStyle = topFade;
    ctx.fillRect(0, y - 18, width, 18);

    ctx.fillStyle = 'rgba(16, 5, 14, 0.97)';
    ctx.fillRect(0, y, width, metrics.stageH - y);
    ctx.fillStyle = 'rgba(239, 197, 124, 0.26)';
    ctx.fillRect(0, y, width, 1);

    const basket = basketPillRect();
    const pop = game.basketPop;
    const shakeRotation =
      Math.sin(game.time * 42) * game.basketShake * 0.35;

    ctx.save();
    const centerX = basket.x + basket.w / 2;
    const centerY = basket.y + basket.h / 2;
    ctx.translate(centerX, centerY);
    ctx.scale(1 + pop * 0.045, 1 + pop * 0.045);
    ctx.translate(-centerX, -centerY);

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;
    rr(basket.x, basket.y, basket.w, basket.h, 22);
    ctx.fillStyle = C.cream;
    ctx.fill();
    ctx.restore();

    if (game.cooldown > 0) {
      ctx.strokeStyle = `rgba(224, 75, 99, ${0.25 + (game.cooldown / (GAME_RULES.invulnerableMs / 1000)) * 0.55})`;
      ctx.lineWidth = 2;
      rr(basket.x + 1, basket.y + 1, basket.w - 2, basket.h - 2, 21);
      ctx.stroke();
    }

    drawBasketIcon(basket.x + 24, basket.y + 22, 0.85, shakeRotation);
    text(basket.count, basket.x + 38, basket.y + 22.5, 13, {
      weight: 800,
      color: C.wine,
    });

    const icons = basket.icons;
    if (icons.length) {
      const startX = basket.x + basket.w - 12 - icons.length * 18;
      icons.forEach((placement, index) => {
        drawProduct(
          placement.product,
          startX + index * 18 + 9,
          basket.y + 32,
          16,
          20,
          { shadow: false }
        );
      });
    }

    ctx.restore();

    if (game.listHidden) {
      const buttonW = 104;
      const buttonH = 42;
      const buttonX = width - safe.right - 12 - buttonW;
      const buttonY = y + 11;
      const pressed = game.pressAction === 'list';

      ctx.save();
      if (pressed) {
        ctx.translate(buttonX + buttonW / 2, buttonY + buttonH / 2);
        ctx.scale(0.97, 0.97);
        ctx.translate(-(buttonX + buttonW / 2), -(buttonY + buttonH / 2));
      }
      rr(buttonX, buttonY, buttonW, buttonH, 13);
      ctx.fillStyle = pressed ? 'rgba(90, 26, 58, 1)' : 'rgba(42, 14, 34, 0.98)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(239, 197, 124, 0.52)';
      ctx.lineWidth = 1;
      ctx.stroke();

      const eyeX = buttonX + 16;
      const eyeY = buttonY + buttonH / 2;
      ctx.strokeStyle = C.gold;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.ellipse(eyeX, eyeY, 6.5, 3.8, 0, 0, TAU);
      ctx.stroke();
      ctx.fillStyle = C.gold;
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 2, 0, TAU);
      ctx.fill();

      text(isListVisible() ? 'OCULTAR' : 'VER LISTA', buttonX + 29, eyeY + 0.5, 8.8, {
        weight: 700,
        color: C.cream,
        spacing: 0.55,
      });
      ctx.restore();

      canvasButtons.push({
        x: buttonX,
        y: buttonY,
        w: buttonW,
        h: buttonH,
        action: 'list',
      });
    } else {
      const showScrollHint = game.hintTime > 0 && game.maxScroll > 24;
      const label = showScrollHint
        ? `ARRASTRA · ${DOUBLE_LABEL}`
        : DOUBLE_LABEL;
      const endX = width - safe.right - 12;
      const labelWidth = measureText(label, 8.2, 700, FONT_UI, 0.8);
      const centerY = y + 32;

      text(label, endX, centerY, 8.2, {
        weight: 700,
        color: C.gold,
        align: 'right',
        alpha: showScrollHint ? 0.72 : 0.52,
        spacing: 0.8,
      });

      const iconX = endX - labelWidth - 12;
      ctx.save();
      ctx.strokeStyle = 'rgba(239, 197, 124, 0.42)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(iconX - 2, centerY, 3.2, 0, TAU);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(iconX + 2, centerY, 3.2, 0, TAU);
      ctx.stroke();
      ctx.restore();
    }
  }

  function drawToast() {
    if (!game.toast || game.state !== STATES.PLAYING) return;

    const toast = game.toast;
    const progress = toast.t / toast.dur;
    let alpha = 1;
    if (progress < 0.1) alpha = progress / 0.1;
    else if (progress > 0.84) alpha = (1 - progress) / 0.16;
    alpha = clamp(alpha, 0, 1);

    const safe = metrics.safe;
    const width = Math.min(
      metrics.stageW - safe.left - safe.right - 32,
      356
    );
    const height = toast.sub ? 54 : 42;
    const x = safe.left + (metrics.stageW - safe.left - safe.right - width) / 2;
    const y = game.hudH + 11;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 6;
    rr(x, y, width, height, 15);
    ctx.fillStyle = toast.tone === 'warn'
      ? 'rgba(57, 12, 32, 0.97)'
      : 'rgba(36, 14, 28, 0.97)';
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = toast.tone === 'warn'
      ? 'rgba(255, 132, 154, 0.68)'
      : 'rgba(239, 197, 124, 0.55)';
    ctx.lineWidth = 1;
    rr(x + 0.5, y + 0.5, width - 1, height - 1, 14.5);
    ctx.stroke();

    const iconX = x + 22;
    const iconY = y + height / 2;
    ctx.fillStyle = toast.tone === 'warn' ? C.red : C.gold;
    ctx.beginPath();
    ctx.arc(iconX, iconY, 10, 0, TAU);
    ctx.fill();
    if (toast.tone === 'warn') {
      text('!', iconX, iconY + 0.5, 12, {
        weight: 800,
        color: '#fff6ee',
        align: 'center',
      });
    } else {
      ctx.fillStyle = C.wine;
      starPath(iconX, iconY, 5, 1.8, 4);
      ctx.fill();
    }

    if (toast.sub) {
      text(toast.title, x + 39, y + 18, 10.8, {
        weight: 700,
        color: C.cream,
        maxWidth: width - 50,
      });
      text(toast.sub, x + 39, y + 36, 8.9, {
        weight: 400,
        color: 'rgba(252, 242, 229, 0.74)',
        maxWidth: width - 50,
      });
    } else {
      text(toast.title, x + 39, y + height / 2, 10.8, {
        weight: 700,
        color: C.cream,
        maxWidth: width - 50,
      });
    }
    ctx.restore();
  }

  /* ==========================================================================
     18 · VUELO, FLASH Y CONFETI
     ========================================================================== */

  function drawFlyers() {
    if (!game.flyers.length) return;

    for (const flyer of game.flyers) {
      const eased = easeInOutCubic(clamp(flyer.t, 0, 1));
      const x = lerp(flyer.x0, flyer.x1, eased);
      const y =
        lerp(flyer.y0, flyer.y1, eased) -
        Math.sin(Math.PI * clamp(flyer.t, 0, 1)) * 44;
      const scale = 1 - clamp(flyer.t, 0, 1) * 0.58;
      const alpha = 1 - Math.pow(clamp(flyer.t, 0, 1), 3) * 0.35;

      drawProduct(flyer.product, x, y + 15, 26, 30, {
        shadow: false,
        scale,
        alpha,
      });
    }
  }

  function drawFlash() {
    if (game.flash <= 0) return;
    const gradient = ctx.createRadialGradient(
      metrics.stageW / 2,
      metrics.stageH / 2,
      metrics.stageW * 0.18,
      metrics.stageW / 2,
      metrics.stageH / 2,
      metrics.stageW * 0.78
    );
    gradient.addColorStop(0, 'rgba(224, 75, 99, 0)');
    gradient.addColorStop(1, `rgba(224, 75, 99, ${game.flash * 0.36})`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, metrics.stageW, metrics.stageH);
  }

  function drawConfetti() {
    if (!game.confetti.length) return;

    for (const confetti of game.confetti) {
      const alpha = clamp(confetti.life / 0.8, 0, 1);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(confetti.x, confetti.y);
      ctx.rotate(confetti.rot);
      ctx.fillStyle = confetti.color;
      if (confetti.star) {
        starPath(0, 0, confetti.size, confetti.size * 0.34, 4);
        ctx.fill();
      } else {
        ctx.fillRect(
          -confetti.size / 2,
          -confetti.size / 4,
          confetti.size,
          Math.max(1.5, confetti.size * 0.5)
        );
      }
      ctx.restore();
    }
  }

  /* ==========================================================================
     19 · RENDER PRINCIPAL
     ========================================================================== */

  function render() {
    const dpr = metrics.dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawOuterBackground();

    ctx.save();
    ctx.translate(metrics.stageX, metrics.stageY);
    if (metrics.radius > 0) {
      rr(0, 0, metrics.stageW, metrics.stageH, metrics.radius);
      ctx.clip();
    }

    canvasButtons = [];
    drawStageBackdrop();

    const hasShop = game.placements.length > 0;
    const showHud = hasShop && game.state !== STATES.START;
    const vpTop = showHud ? game.hudH : metrics.safe.top + 10;
    const vpBottom = showHud
      ? footerTop()
      : metrics.stageH - metrics.safe.bottom - 14;

    if (showHud) drawHud();
    drawWorld(game.time, vpTop, vpBottom, !showHud);

    if (showHud) {
      drawFooter();
      drawFlyers();
      drawToast();
    }

    drawFlash();
    drawConfetti();

    if (metrics.radius > 0) {
      rr(0.5, 0.5, metrics.stageW - 1, metrics.stageH - 1, metrics.radius);
      ctx.strokeStyle = 'rgba(239, 197, 124, 0.16)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.restore();
  }

  /* ==========================================================================
     20 · BUCLE E INICIALIZACIÓN
     ========================================================================== */

  function hexToRgba(hex, alpha) {
    const normalized = hex.replace('#', '');
    const value = parseInt(normalized, 16);
    const r = (value >> 16) & 255;
    const g = (value >> 8) & 255;
    const b = value & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  let lastFrame = performance.now();

  function loop(now) {
    const dt = Math.min((now - lastFrame) / 1000, 0.05);
    lastFrame = now;
    update(Math.max(0, dt));
    render();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', scheduleResize);
  window.addEventListener('orientationchange', () => {
    scheduleResize();
    window.setTimeout(scheduleResize, 180);
  });
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', scheduleResize);
  }
  document.addEventListener('visibilitychange', () => {
    lastFrame = performance.now();
  });

  /* ------------------------------------------------------------------------
     API de depuración: solo existe con ?debug=1.
     Sirve para probar el flujo, el doble toque y las capturas sin ensuciar
     la experiencia normal.
     ---------------------------------------------------------------------- */

  if (new URLSearchParams(window.location.search).has('debug')) {
    const debugTapStage = (x, y) => {
      const eventInit = {
        bubbles: true,
        cancelable: true,
        clientX: metrics.stageX + x,
        clientY: metrics.stageY + y,
        pointerId: 9871,
        pointerType: 'mouse',
        isPrimary: true,
        button: 0,
      };
      canvas.dispatchEvent(
        new PointerEvent('pointerdown', { ...eventInit, buttons: 1 })
      );
      canvas.dispatchEvent(
        new PointerEvent('pointerup', { ...eventInit, buttons: 0 })
      );
    };

    const debugTapItem = (uid) => {
      const placement = game.placements.find((item) => item.uid === uid);
      if (!placement || placement.collected) return false;

      const viewportH = footerTop() - game.hudH;
      game.maxScroll = Math.max(0, game.worldH - viewportH);
      const centerWorldY = placement.baseY - placement.maxH * 0.5;
      game.scroll = clamp(
        centerWorldY - viewportH * 0.55,
        0,
        game.maxScroll
      );
      const screenY = game.hudH + placement.baseY - game.scroll;
      if (screenY < game.hudH + 12 || screenY > footerTop() - 12) return false;

      debugTapStage(placement.x, screenY);
      debugTapStage(placement.x, screenY);
      return true;
    };

    window.__perfumeria = {
      snapshot() {
        return {
          state: game.state,
          level: game.levelIndex,
          list: game.list.map((product) => ({
            id: product.id,
            name: product.name,
          })),
          collected: game.collected.slice(),
          secondsLeft: game.secondsLeft,
          levelSeconds: game.levelSeconds,
          hudH: game.hudH,
          footerTop: footerTop(),
          scroll: game.scroll,
          maxScroll: game.maxScroll,
          listVisible: isListVisible(),
          listHidden: game.listHidden,
          listReveal: game.listReveal,
          listPeek: game.listPeek,
          cooldown: game.cooldown,
          nextShuffleIn: game.nextShuffleIn,
          shuffleLock: game.shuffleLock,
          pendingShow: game.pendingShow,
          toast: game.toast,
          stage: {
            x: metrics.stageX,
            y: metrics.stageY,
            w: metrics.stageW,
            h: metrics.stageH,
            framed: metrics.framed,
            safe: metrics.safe,
            dpr: metrics.dpr,
          },
          overlay: {
            hidden: ui.overlay.hidden,
            title: ui.title.textContent,
            primary: ui.primary.textContent,
            secondaryHidden: ui.secondary.hidden,
          },
          audio: {
            created: Boolean(audio.ctx),
            state: audio.ctx ? audio.ctx.state : 'none',
            muted: audio.muted,
            plays: audio.plays,
            lastPlayed: audio.lastPlayed,
            masterGain: audio.master ? audio.master.gain.value : null,
            compressor: audio.compressor
              ? {
                  threshold: audio.compressor.threshold.value,
                  ratio: audio.compressor.ratio.value,
                }
              : null,
            muteButton: ui.mute
              ? {
                  rect: (() => {
                    const rect = ui.mute.getBoundingClientRect();
                    return {
                      x: rect.x,
                      y: rect.y,
                      w: rect.width,
                      h: rect.height,
                    };
                  })(),
                  ariaChecked: ui.mute.getAttribute('aria-checked'),
                  dataMuted: ui.mute.dataset.muted,
                  tabIndex: ui.mute.tabIndex,
                  visible: (() => {
                    const style = getComputedStyle(ui.mute);
                    const rect = ui.mute.getBoundingClientRect();
                    return (
                      style.display !== 'none' &&
                      style.visibility !== 'hidden' &&
                      rect.width > 0 &&
                      rect.height > 0
                    );
                  })(),
                }
              : null,
          },
          items: game.placements.map((placement) => ({
            uid: placement.uid,
            id: placement.product.id,
            name: placement.product.name,
            needed: placement.needed,
            collected: placement.collected,
            moving: placement.moveT > 0,
            x: placement.x,
            baseY: placement.baseY,
            fromX: placement.fromX,
            fromY: placement.fromY,
            moveT: placement.moveT,
            slotW: placement.slotW,
            screenY:
              game.hudH + placement.baseY - placement.maxH * 0.5 - game.scroll,
            onScreen:
              game.hudH + placement.baseY - game.scroll > game.hudH &&
              game.hudH + placement.baseY - game.scroll < footerTop(),
          })),
        };
      },
      tapItem(uid) {
        return debugTapItem(uid);
      },
      tapNeeded() {
        const placement = game.placements.find(
          (item) => item.needed && !item.collected
        );
        return placement ? debugTapItem(placement.uid) : false;
      },
      tapDistractor() {
        const placement = game.placements.find(
          (item) => !item.needed && !item.collected
        );
        return placement ? debugTapItem(placement.uid) : false;
      },
      startLevel,
      finishLevel,
      triggerGameOver,
      goToStart,
      toggleList,
      setSeconds(seconds) {
        game.secondsLeft = seconds;
      },
      forceListHidden() {
        game.listReveal = 0;
        game.listPeek = 0;
      },
      openList() {
        game.listPeek = GAME_RULES.peekSeconds;
      },
      hideOverlay() {
        closeOverlay();
      },
      scrollTo(value) {
        game.scroll = clamp(value, 0, game.maxScroll);
      },
      scrollToBottom() {
        game.scroll = game.maxScroll;
      },
      shuffleNow() {
        game.shuffleLock = 0;
        game.nextShuffleIn = 0;
        shuffleShelves();
        return {
          nextShuffleIn: game.nextShuffleIn,
          shuffleLock: game.shuffleLock,
        };
      },
      setNextShuffle(seconds) {
        game.nextShuffleIn = Math.max(0, seconds);
      },
      toggleMute() {
        setMuted(!audio.muted);
      },
      setMuted(value) {
        setMuted(Boolean(value));
      },
      showStartOverlay,
      showLevelClearOverlay,
      showGameOverOverlay,
      showVictoryOverlay,
    };
  }

  initAudioControls();
  resize();
  setupShowcase();
  showStartOverlay();
  requestAnimationFrame(loop);
})();
