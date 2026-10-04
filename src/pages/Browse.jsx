import { useSearchParams } from "react-router-dom";
import MediaGrid from "../components/MediaGrid";
import { useTmdb, usePaginated } from "../hooks/useTmdb";

const today = new Date().toISOString().slice(0, 10);

const SORTS = {
  movie: [
    { value: "popularity.desc", label: "Most popular" },
    { value: "vote_average.desc", label: "Top rated" },
    { value: "primary_release_date.desc", label: "Newest" },
    { value: "revenue.desc", label: "Box office" },
  ],
  tv: [
    { value: "popularity.desc", label: "Most popular" },
    { value: "vote_average.desc", label: "Top rated" },
    { value: "first_air_date.desc", label: "Newest" },
  ],
};

export default function Browse({ type }) {
  const [params, setParams] = useSearchParams();
  const genre = params.get("genre") || "";
  const sort = params.get("sort") || "popularity.desc";
  const { data: genreData } = useTmdb(`/genre/${type}/list`);

  const dateKey = type === "movie" ? "primary_release_date.lte" : "first_air_date.lte";
  const list = usePaginated(`/discover/${type}`, {
    with_genres: genre,
    sort_by: sort,
    [dateKey]: today,
    "vote_count.gte": sort.startsWith("vote_average") ? 300 : sort.includes("date") ? 10 : undefined,
  });

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  return (
    <div className="container page">
      <header className="page__head">
        <div>
          <h1 className="page__title">{type === "movie" ? "Movies" : "TV Shows"}</h1>
          <p className="page__sub">Browse by genre and sort the way you like.</p>
        </div>
        <label className="select">
          <span>Sort by</span>
          <select value={sort} onChange={(e) => update("sort", e.target.value)}>
            {SORTS[type].map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>
      </header>

      <div className="chips chips--scroll" role="toolbar" aria-label="Genres">
        <button className={`chip ${!genre ? "is-active" : ""}`} onClick={() => update("genre", "")}>All</button>
        {genreData?.genres?.map((g) => (
          <button
            key={g.id}
            className={`chip ${genre === String(g.id) ? "is-active" : ""}`}
            onClick={() => update("genre", String(g.id))}
          >
            {g.name}
          </button>
        ))}
      </div>

      <MediaGrid type={type} {...list} />
    </div>
  );
}
