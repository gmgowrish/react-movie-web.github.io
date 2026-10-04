import { useRef } from "react";
import { Link } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import MediaCard, { CardSkeleton } from "./MediaCard";
import { useTmdb } from "../hooks/useTmdb";

export default function Row({ title, path, params, type, items: given, link }) {
  const { data, loading } = useTmdb(given ? null : path, params);
  const items = given || data?.results || [];
  const track = useRef(null);

  const scroll = (dir) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  if (!loading && items.length === 0) return null;

  return (
    <section className="row">
      <div className="row__head">
        <h2 className="section-title">{title}</h2>
        {link && <Link to={link} className="row__link">See all</Link>}
      </div>
      <div className="row__wrap">
        <button className="row__arrow left" onClick={() => scroll(-1)} aria-label="Scroll left"><HiChevronLeft /></button>
        <div className="row__track" ref={track}>
          {loading && !given
            ? Array.from({ length: 8 }, (_, i) => <CardSkeleton key={i} />)
            : items.map((item) => <MediaCard key={`${item.media_type || type}-${item.id}`} item={item} type={type} />)}
        </div>
        <button className="row__arrow right" onClick={() => scroll(1)} aria-label="Scroll right"><HiChevronRight /></button>
      </div>
    </section>
  );
}
