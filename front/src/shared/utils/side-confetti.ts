import confetti from 'canvas-confetti';

export function sideConfetti() {
  const options = {
    particleCount: 80,
    spread: 60,
    startVelocity: 55,
    colors: ['#a78bfa', '#f472b6', '#facc15'],
    disableForReducedMotion: true,
  };
  confetti({
    ...options,
    angle: 60,
    origin: { x: 0, y: 0.8 },
  });
  confetti({
    ...options,
    angle: 120,
    origin: { x: 1, y: 0.8 },
  });
}
