// Tiny WebAudio sound effects – no audio files needed.
let ctx: AudioContext | null = null;

function tone(freq: number, start: number, dur: number, type: OscillatorType = 'sine', gain = 0.08) {
  if (!ctx) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(gain, ctx.currentTime + start);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
  o.connect(g).connect(ctx.destination);
  o.start(ctx.currentTime + start);
  o.stop(ctx.currentTime + start + dur + 0.02);
}

export function play(kind: 'correct' | 'wrong' | 'finish' | 'medal', enabled: boolean) {
  if (!enabled) return;
  try {
    ctx ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    if (kind === 'correct') {
      tone(660, 0, 0.12);
      tone(880, 0.08, 0.18);
    } else if (kind === 'wrong') {
      tone(220, 0, 0.22, 'triangle', 0.07);
    } else if (kind === 'finish') {
      [523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.1, 0.25));
    } else {
      [523, 659, 784, 1046, 1318].forEach((f, i) => tone(f, i * 0.09, 0.35, 'triangle', 0.07));
    }
  } catch {
    /* audio not available */
  }
}
