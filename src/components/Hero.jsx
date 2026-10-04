import { useEffect, useState } from "react";
import { AiFillStar, AiFillHeart, AiOutlinePlus } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { imageSrcSet, imageUrl, mediaTypeOf, ratingOf, titleOf, yearOf } from "../api/tmdb";
import { useApp } from "../context/AppContext";

export default function Hero({ items }) {
  const slides = items.filter((i) => i.backdrop_path).slice(0, 6);
  const [index, setIndex] = useState(0);
  // Only slides in `loaded` get an <img>, so we never download all backdrops up front.
  const [loaded, setLoaded] = useState(() => new Set([0]));
  const { openDetails, toggleWatchlist, isInWatchlist } = useApp();

  const show = (i) => {
    setLoaded((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
    setIndex(i);
  };

  // Once the current backdrop has loaded, warm up the next one before it's shown.
  const preloadNext = (i) => {
    const next = (i + 1) % slides.length;
    setTimeout(() => setLoaded((prev) => (prev.has(next) ? prev : new Set(prev).add(next))), 2500);
  };

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setTimeout(() => show((index + 1) % slides.length), 8000);
    return () => clearTimeout(t);
  }, [slides.length, index]);

  if (!slides.length) return <div className="hero hero--empty skeleton" />;
  const item = slides[index];
  const saved = isInWatchlist(item);

  return (
    <section className="hero">
      {slides.map((s, i) =>
        loaded.has(i) ? (
          <img
            key={s.id}
            className={`hero__bg ${i === index ? "is-active" : ""}`}
            src={imageUrl(s.backdrop_path, "w1280")}
            srcSet={imageSrcSet(s.backdrop_path, [780, 1280])}
            sizes="100vw"
            alt=""
            aria-hidden
            fetchpriority={i === 0 ? "high" : "low"}
            decoding="async"
            onLoad={() => i === index && preloadNext(i)}
          />
        ) : null
      )}
      <div className="hero__shade" />
      <div className="hero__content container" key={item.id}>
        <span className="pill">#{index + 1} Trending · {mediaTypeOf(item) === "tv" ? "TV Series" : "Movie"}</span>
        <h1 className="hero__title">{titleOf(item)}</h1>
        <p className="hero__meta">
          {ratingOf(item) && (
            <span className="rating"><AiFillStar /> {ratingOf(item)}</span>
          )}
          <span>{yearOf(item)}</span>
        </p>
        <p className="hero__overview">{item.overview}</p>
        <div className="hero__actions">
          <button className="btn btn--primary" onClick={() => openDetails(item)}>
            <BsInfoCircle /> More info
          </button>
          <button className="btn btn--ghost" onClick={() => toggleWatchlist(item)}>
            {saved ? <AiFillHeart /> : <AiOutlinePlus />} {saved ? "In watchlist" : "Watchlist"}
          </button>
        </div>
      </div>
      <div className="hero__dots">
        {slides.map((s, i) => (
          <button
            key={s.id}
            className={i === index ? "is-active" : ""}
            onClick={() => show(i)}
            aria-label={`Show slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
