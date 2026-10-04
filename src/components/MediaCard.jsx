import { AiFillStar, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";
import { imageUrl, mediaTypeOf, ratingOf, titleOf, yearOf } from "../api/tmdb";
import { useApp } from "../context/AppContext";
import noImage from "../assets/no-image.jpg";

export default function MediaCard({ item, type }) {
  const { openDetails, toggleWatchlist, isInWatchlist } = useApp();
  const saved = isInWatchlist(item, type);
  const rating = ratingOf(item);
  const kind = mediaTypeOf(item, type);

  return (
    <article className="card">
      <button className="card__poster" onClick={() => openDetails(item, type)} aria-label={`Open ${titleOf(item)}`}>
        <img src={imageUrl(item.poster_path, "w342") || noImage} alt="" loading="lazy" />
        <span className="card__overlay">
          <BsPlayFill />
        </span>
        {rating && (
          <span className="card__rating">
            <AiFillStar /> {rating}
          </span>
        )}
      </button>
      <button
        className={`card__save ${saved ? "is-saved" : ""}`}
        onClick={() => toggleWatchlist(item, type)}
        aria-label={saved ? "Remove from watchlist" : "Add to watchlist"}
        title={saved ? "Remove from watchlist" : "Add to watchlist"}
      >
        {saved ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
      <div className="card__meta">
        <h3 className="card__title" title={titleOf(item)}>{titleOf(item)}</h3>
        <p className="card__sub">
          {yearOf(item) || "—"} · {kind === "tv" ? "TV" : "Movie"}
        </p>
      </div>
    </article>
  );
}

export function CardSkeleton() {
  return (
    <div className="card card--skeleton" aria-hidden>
      <div className="card__poster skeleton" />
      <div className="skeleton skeleton--line" />
      <div className="skeleton skeleton--line short" />
    </div>
  );
}
