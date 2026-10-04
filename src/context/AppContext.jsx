import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { mediaTypeOf } from "../api/tmdb";

const AppContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode etc.) */
  }
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "dark"
  );
  const [watchlist, setWatchlist] = useState(() => readStorage("rf-watchlist", []));
  const [details, setDetails] = useState(null); // { id, type }

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#0b0d12" : "#f6f7fb");
    try {
      localStorage.setItem("rf-theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  useEffect(() => {
    writeStorage("rf-watchlist", watchlist);
  }, [watchlist]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    []
  );

  const isInWatchlist = useCallback(
    (item, type) =>
      watchlist.some((w) => w.id === item.id && w.media_type === mediaTypeOf(item, type)),
    [watchlist]
  );

  const toggleWatchlist = useCallback((item, type) => {
    const media_type = mediaTypeOf(item, type);
    setWatchlist((list) => {
      if (list.some((w) => w.id === item.id && w.media_type === media_type)) {
        return list.filter((w) => !(w.id === item.id && w.media_type === media_type));
      }
      const entry = {
        id: item.id,
        media_type,
        title: item.title,
        name: item.name,
        poster_path: item.poster_path,
        backdrop_path: item.backdrop_path,
        vote_average: item.vote_average,
        release_date: item.release_date,
        first_air_date: item.first_air_date,
        addedAt: Date.now(),
      };
      return [entry, ...list];
    });
  }, []);

  const clearWatchlist = useCallback(() => setWatchlist([]), []);

  const openDetails = useCallback(
    (item, type) => setDetails({ id: item.id, type: mediaTypeOf(item, type) }),
    []
  );
  const closeDetails = useCallback(() => setDetails(null), []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      watchlist,
      isInWatchlist,
      toggleWatchlist,
      clearWatchlist,
      details,
      openDetails,
      closeDetails,
    }),
    [theme, toggleTheme, watchlist, isInWatchlist, toggleWatchlist, clearWatchlist, details, openDetails, closeDetails]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
