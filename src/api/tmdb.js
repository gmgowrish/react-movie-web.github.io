const API_KEY =
  import.meta.env.VITE_TMDB_API_KEY || "89e6737d6edec588bddb03c4a212fbb9";
const BASE_URL = "https://api.themoviedb.org/3";

export async function tmdb(path, params = {}, signal) {
  const url = new URL(BASE_URL + path);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", "en-US");
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  }
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`TMDB request failed (${res.status})`);
  return res.json();
}

export const imageUrl = (path, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

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
