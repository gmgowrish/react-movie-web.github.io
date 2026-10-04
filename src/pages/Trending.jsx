import { useState } from "react";
import MediaGrid from "../components/MediaGrid";
import { usePaginated } from "../hooks/useTmdb";

const MEDIA = [
  { value: "all", label: "All" },
  { value: "movie", label: "Movies" },
  { value: "tv", label: "TV Shows" },
];

export default function Trending() {
  const [media, setMedia] = useState("all");
  const [window_, setWindow] = useState("week");
  const list = usePaginated(`/trending/${media}/${window_}`);

  return (
    <div className="container page">
      <header className="page__head">
        <div>
          <h1 className="page__title">Trending</h1>
          <p className="page__sub">What everyone is watching right now.</p>
        </div>
        <div className="segmented" role="group" aria-label="Time window">
          {["day", "week"].map((w) => (
            <button key={w} className={window_ === w ? "is-active" : ""} onClick={() => setWindow(w)}>
              {w === "day" ? "Today" : "This week"}
            </button>
          ))}
        </div>
      </header>
      <div className="chips">
        {MEDIA.map((m) => (
          <button key={m.value} className={`chip ${media === m.value ? "is-active" : ""}`} onClick={() => setMedia(m.value)}>
            {m.label}
          </button>
        ))}
      </div>
      <MediaGrid type={media === "all" ? undefined : media} {...list} />
    </div>
  );
}
