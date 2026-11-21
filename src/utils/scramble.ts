const GLYPHS = "!<>-_/[]{}=+*^?#01";

/** Decodifica el texto del elemento letra por letra con caracteres aleatorios. */
export function scramble(el: HTMLElement, duration = 900): void {
  const finalText = el.dataset.scramble ?? el.textContent ?? "";

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = finalText;
    return;
  }

  const start = performance.now();

  const tick = (now: number): void => {
    const progress = Math.min((now - start) / duration, 1);
    const revealed = Math.floor(progress * finalText.length);

    el.textContent = finalText
      .split("")
      .map((ch, i) =>
        ch === " " || i < revealed
          ? ch
          : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      )
      .join("");

    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}
