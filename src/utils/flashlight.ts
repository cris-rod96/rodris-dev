export function initFlashlight(): void {
  const el = document.querySelector<HTMLElement>("#flashlight");
  if (!el) return;

  // Sin ratón (móviles y tablets) no hay linterna.
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let targetX = 0;
  let targetY = 0;
  let x = 0;
  let y = 0;
  let frame = 0;
  let started = false;

  const render = (): void => {
    const ease = reduceMotion.matches ? 1 : 0.18; // 1 = sigue al cursor sin retardo
    x += (targetX - x) * ease;
    y += (targetY - y) * ease;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    const settled = Math.abs(targetX - x) < 0.1 && Math.abs(targetY - y) < 0.1;
    frame = settled ? 0 : requestAnimationFrame(render);
  };

  window.addEventListener(
    "pointermove",
    (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      targetX = e.clientX;
      targetY = e.clientY;
      if (!started) {
        x = targetX;
        y = targetY;
        started = true;
      }
      el.classList.add("is-active");
      if (!frame) frame = requestAnimationFrame(render);
    },
    { passive: true },
  );

  document.documentElement.addEventListener("mouseleave", () => {
    el.classList.remove("is-active");
  });
}
