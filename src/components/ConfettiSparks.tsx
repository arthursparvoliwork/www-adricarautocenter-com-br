import confetti from "canvas-confetti";

/** Dispara fagulhas no estilo solda quando chamado (ex: form enviado). */
export const fireSparks = () => {
  const colors = ["#FF1A1A", "#FFC700", "#FF6B00", "#FFFFFF"];

  // Burst central
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors,
    scalar: 0.9,
    ticks: 200,
  });

  // Side cannons (esquerda e direita)
  setTimeout(() => {
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
      scalar: 0.7,
    });
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
      scalar: 0.7,
    });
  }, 200);

  // Final burst
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 90,
      origin: { y: 0.5 },
      colors,
      scalar: 1.1,
      shapes: ["star"],
    });
  }, 500);
};
