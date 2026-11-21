export function initSpotlight(): void {
  document.addEventListener("pointermove", (e: PointerEvent) => {
    const card = (e.target as Element | null)?.closest<HTMLElement>(".spotlight");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  });
}
