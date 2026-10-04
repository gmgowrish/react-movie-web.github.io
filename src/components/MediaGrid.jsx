import { useEffect, useRef } from "react";
import MediaCard, { CardSkeleton } from "./MediaCard";

export default function MediaGrid({ items, type, loading, hasMore, loadMore, error }) {
  const sentinel = useRef(null);

  useEffect(() => {
    if (!loadMore || !sentinel.current) return;
    const io = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && loadMore(),
      { rootMargin: "600px" }
    );
    io.observe(sentinel.current);
    return () => io.disconnect();
  }, [loadMore]);

  return (
    <>
      <div className="grid">
        {items.map((item) => (
          <MediaCard key={`${item.media_type || type}-${item.id}`} item={item} type={type} />
        ))}
        {loading && Array.from({ length: 12 }, (_, i) => <CardSkeleton key={`s${i}`} />)}
      </div>
      {error && <p className="state-msg">Couldn't load titles. Please try again later.</p>}
      {hasMore && !error && <div ref={sentinel} className="sentinel" />}
    </>
  );
}
