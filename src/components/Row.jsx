import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import MediaCard, { CardSkeleton } from "./MediaCard";
import { useTmdb } from "../hooks/useTmdb";

export default function Row({ title, path, params, type, items: given, link }) {
  const section = useRef(null);
  const track = useRef(null);
  const [visible, setVisible] = useState(false);
  // Render only about a screenful of cards (and posters) until the row is scrolled.
  const [expanded, setExpanded] = useState(false);
  const initialCount = window.innerWidth < 640 ? 4 : 8;

  // Don't fetch rows until they're about to scroll into view.
  useEffect(() => {
    if (given || visible || !section.current) return;
    const io = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setVisible(true),
      { rootMargin: "400px 0px" }
    );
    io.observe(section.current);
    return () => io.disconnect();
  }, [given, visible]);

  const { data, loading } = useTmdb(given || !visible ? null : path, params);
  const items = given || data?.results || [];
  const pending = !given && (!visible || loading);

  const scroll = (dir) => {
    const el = track.current;
    setExpanded(true);
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  if (!pending && items.length === 0) return null;

  return (
    <section className="row" ref={section}>
      <div className="row__head">
        <h2 className="section-title">{title}</h2>
        {link && <Link to={link} className="row__link">See all</Link>}
      </div>
      <div className="row__wrap">
        <button className="row__arrow left" onClick={() => scroll(-1)} aria-label="Scroll left"><HiChevronLeft /></button>
        <div
          className="row__track"
          ref={track}
          onScroll={() => setExpanded(true)}
          onPointerEnter={() => setExpanded(true)}
          onFocus={() => setExpanded(true)}
        >
          {pending
            ? Array.from({ length: 8 }, (_, i) => <CardSkeleton key={i} />)
            : (expanded ? items : items.slice(0, initialCount)).map((item) => <MediaCard key={`${item.media_type || type}-${item.id}`} item={item} type={type} />)}
        </div>
        <button className="row__arrow right" onClick={() => scroll(1)} aria-label="Scroll right"><HiChevronRight /></button>
      </div>
    </section>
  );
}
