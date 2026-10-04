import { useSearchParams } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import MediaGrid from "../components/MediaGrid";
import { usePaginated } from "../hooks/useTmdb";

export default function Search() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim();
  const list = usePaginated(q ? "/search/multi" : null, { query: q, include_adult: false });
  const items = list.items.filter((i) => i.media_type === "movie" || i.media_type === "tv");

  return (
    <div className="container page">
      <header className="page__head">
        <div>
          <h1 className="page__title">{q ? <>Results for “{q}”</> : "Search"}</h1>
          {q && !list.loading && !list.error && <p className="page__sub">{list.totalResults ?? 0} matches</p>}
        </div>
      </header>
      {!q && (
        <div className="empty">
          <HiSearch />
          <p>Start typing in the search bar to find movies and TV shows.</p>
        </div>
      )}
      {q && !list.loading && items.length === 0 && !list.error && (
        <div className="empty">
          <HiSearch />
          <p>No titles found. Try a different search.</p>
        </div>
      )}
      {q && <MediaGrid {...list} items={items} />}
    </div>
  );
}
