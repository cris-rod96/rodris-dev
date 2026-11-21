export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "rodris-theme";
export const DARK_START_HOUR = 18; // oscuro desde las 18:00
export const DARK_END_HOUR = 6; // oscuro hasta las 06:00

const isTheme = (value: unknown): value is Theme =>
  value === "light" || value === "dark";

/** El rango cruza la medianoche, por eso se usa "||" y no "&&". */
export function themeForHour(hour: number): Theme {
  return hour >= DARK_START_HOUR || hour < DARK_END_HOUR ? "dark" : "light";
}

/** Solo en desarrollo: ?hour=0..23 fuerza la hora para probar. */
function forcedHour(): number | null {
  if (!import.meta.env.DEV) return null;
  const raw = new URLSearchParams(location.search).get("hour");
  if (raw === null) return null;
  const n = Number(raw);
  return Number.isInteger(n) && n >= 0 && n <= 23 ? n : null;
}

export const currentHour = (): number => forcedHour() ?? new Date().getHours();
const autoTheme = (): Theme => themeForHour(currentHour());

// Con ?hour= la elección manual vive solo en memoria (no toca localStorage).
let memoryOverride: Theme | null = null;

/**
 * El override se guarda como "tema|tema-automático-cuando-se-guardó".
 * Solo es válido mientras el tema automático siga siendo el mismo:
 * cuando cambia la franja horaria, la elección manual caduca sola.
 */
function readOverride(auto: Theme): Theme | null {
  if (forcedHour() !== null) return memoryOverride;
  try {
    const [chosen, autoAtSet] = (localStorage.getItem(THEME_STORAGE_KEY) ?? "").split("|");
    return isTheme(chosen) && autoAtSet === auto ? chosen : null;
  } catch {
    return null;
  }
}

function saveOverride(chosen: Theme, auto: Theme): void {
  if (forcedHour() !== null) {
    memoryOverride = chosen === auto ? null : chosen;
    return;
  }
  try {
    if (chosen === auto) localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, `${chosen}|${auto}`);
  } catch {
    /* almacenamiento bloqueado: se ignora */
  }
}

export function resolveTheme(): Theme {
  const auto = autoTheme();
  return readOverride(auto) ?? auto;
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function initThemeToggle(): void {
  const btn = document.querySelector<HTMLButtonElement>("#theme-toggle");

  const sync = (): void => {
    const theme = resolveTheme();
    applyTheme(theme);

    if (btn) {
      const label =
        (theme === "dark" ? btn.dataset.labelToLight : btn.dataset.labelToDark) ?? "";
      btn.setAttribute("aria-label", label);
      btn.title = label;
    }
  };

  sync();

  btn?.addEventListener("click", () => {
    const next: Theme = resolveTheme() === "dark" ? "light" : "dark";
    saveOverride(next, autoTheme());
    sync();
  });

  setInterval(sync, 60_000); // cambia solo a las 18:00 / 06:00 sin recargar
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) sync();
  });
  window.addEventListener("storage", (e) => {
    if (e.key === THEME_STORAGE_KEY) sync(); // sincroniza entre pestañas
  });
}
