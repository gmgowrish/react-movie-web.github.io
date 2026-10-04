const API_KEY =
  import.meta.env.VITE_TMDB_API_KEY || "89e6737d6edec588bddb03c4a212fbb9";
const BASE_URL = "https://api.themoviedb.org/3";

// In-memory cache of in-flight/completed requests, so revisiting a page or
// opening the same title twice is instant and duplicate requests are shared.
const cache = new Map();
const CACHE_LIMIT = 150;

export function tmdb(path, params = {}) {
  const url = new URL(BASE_URL + path);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", "en-US");
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  }
  const key = url.toString();
  if (cache.has(key)) return cache.get(key);

  const request = fetch(key).then((res) => {
    if (!res.ok) throw new Error(`TMDB request failed (${res.status})`);
    return res.json();
  });
  request.catch(() => cache.delete(key));
  cache.set(key, request);
  if (cache.size > CACHE_LIMIT) cache.delete(cache.keys().next().value);
  return request;
}

export const imageUrl = (path, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

/** Responsive srcset, e.g. imageSrcSet(path, [185, 342]) */
export const imageSrcSet = (path, widths) =>
  path ? widths.map((w) => `${imageUrl(path, `w${w}`)} ${w}w`).join(", ") : undefined;

export const mediaTypeOf = (item, fallback) =>
  item.media_type || fallback || (item.title ? "movie" : "tv");

export const titleOf = (item) => item.title || item.name || "Untitled";

export const yearOf = (item) =>
  (item.release_date || item.first_air_date || "").slice(0, 4);

export const ratingOf = (item) =>
  item.vote_average ? item.vote_average.toFixed(1) : null;

export function pickTrailer(videos = []) {
  const yt = videos.filter((v) => v.site === "YouTube");
  return (
    yt.find((v) => v.type === "Trailer" && v.official) ||
    yt.find((v) => v.type === "Trailer") ||
    yt.find((v) => v.type === "Teaser") ||
    yt[0] ||
    null
  );
}
