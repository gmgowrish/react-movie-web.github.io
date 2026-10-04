import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import MediaCard from "../components/MediaCard";
import { useApp } from "../context/AppContext";

export default function Watchlist() {
  const { watchlist, clearWatchlist } = useApp();
  const [filter, setFilter] = useState("all");
  const [confirming, setConfirming] = useState(false);
  const items = watchlist.filter((w) => filter === "all" || w.media_type === filter);

  return (
    <div className="container page">
      <header className="page__head">
        <div>
          <h1 className="page__title">My Watchlist</h1>
          <p className="page__sub">{watchlist.length} saved title{watchlist.length === 1 ? "" : "s"} · stored on this device</p>
        </div>
        {watchlist.length > 0 &&
          (confirming ? (
            <div className="confirm">
              <span>Clear everything?</span>
              <button className="btn btn--danger btn--sm" onClick={() => { clearWatchlist(); setConfirming(false); }}>Yes, clear</button>
              <button className="btn btn--ghost btn--sm" onClick={() => setConfirming(false)}>Cancel</button>
            </div>
          ) : (
            <button className="btn btn--ghost btn--sm" onClick={() => setConfirming(true)}>Clear all</button>
          ))}
      </header>

      {watchlist.length > 0 && (
        <div className="chips">
          {[["all", "All"], ["movie", "Movies"], ["tv", "TV Shows"]].map(([v, l]) => (
            <button key={v} className={`chip ${filter === v ? "is-active" : ""}`} onClick={() => setFilter(v)}>{l}</button>
          ))}
        </div>
      )}

      {items.length ? (
        <div className="grid">
          {items.map((item) => <MediaCard key={`${item.media_type}-${item.id}`} item={item} type={item.media_type} />)}
        </div>
      ) : (
        <div className="empty">
          <AiOutlineHeart />
          <p>{watchlist.length ? "Nothing in this category yet." : "Your watchlist is empty. Tap the heart on any title to save it here."}</p>
          <Link to="/trending" className="btn btn--primary">Explore trending</Link>
        </div>
      )}
    </div>
  );
}
