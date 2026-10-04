import { useEffect, useRef, useState } from "react";
import { AiFillStar, AiFillHeart, AiOutlinePlus } from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";
import { HiX } from "react-icons/hi";
import { imageUrl, pickTrailer, ratingOf, titleOf, yearOf } from "../api/tmdb";
import { useApp } from "../context/AppContext";
import { useTmdb } from "../hooks/useTmdb";
import Row from "./Row";

function formatRuntime(min) {
  if (!min) return null;
  const h = Math.floor(min / 60);
  return h ? `${h}h ${min % 60}m` : `${min}m`;
}

export default function DetailsModal() {
  const { details, closeDetails, toggleWatchlist, isInWatchlist } = useApp();
  const [playing, setPlaying] = useState(false);
  const dialog = useRef(null);
  const { data, loading, error } = useTmdb(
    details ? `/${details.type}/${details.id}` : null,
    { append_to_response: "videos,credits,similar" }
  );

  useEffect(() => {
    setPlaying(false);
    dialog.current?.scrollTo({ top: 0 });
  }, [details]);

  useEffect(() => {
    if (!details) return;
    const onKey = (e) => e.key === "Escape" && closeDetails();
    document.addEventListener("keydown", onKey);
    document.body.classList.add("no-scroll");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
    };
  }, [details, closeDetails]);

  if (!details) return null;

  const trailer = data ? pickTrailer(data.videos?.results) : null;
  const saved = data ? isInWatchlist(data, details.type) : false;
  const runtime = data && (formatRuntime(data.runtime) ||
    (data.number_of_seasons && `${data.number_of_seasons} season${data.number_of_seasons > 1 ? "s" : ""}`));
  const cast = data?.credits?.cast?.slice(0, 10) || [];
  const similar = data?.similar?.results?.filter((s) => s.poster_path).slice(0, 12) || [];

  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && closeDetails()}>
      <div className="modal__dialog" role="dialog" aria-modal="true" aria-label={data ? titleOf(data) : "Details"} ref={dialog}>
        <button className="modal__close icon-btn" onClick={closeDetails} aria-label="Close">
          <HiX />
        </button>

        {loading && <div className="modal__media skeleton" />}
        {error && <p className="state-msg">Couldn't load details.</p>}

        {data && !loading && (
          <>
            <div className="modal__media">
              {playing && trailer ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&rel=0`}
                  title={`${titleOf(data)} trailer`}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : (
                <>
                  {data.backdrop_path && <img src={imageUrl(data.backdrop_path, "w1280")} alt="" />}
                  <div className="modal__media-shade" />
                  {trailer && (
                    <button className="play-btn" onClick={() => setPlaying(true)} aria-label="Play trailer">
                      <BsPlayFill />
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="modal__body">
              <div className="modal__head">
                {data.poster_path && (
                  <img className="modal__poster" src={imageUrl(data.poster_path, "w342")} alt="" />
                )}
                <div>
                  <h2 className="modal__title">{titleOf(data)}</h2>
                  {data.tagline && <p className="modal__tagline">“{data.tagline}”</p>}
                  <p className="hero__meta">
                    {ratingOf(data) && <span className="rating"><AiFillStar /> {ratingOf(data)}</span>}
                    {yearOf(data) && <span>{yearOf(data)}</span>}
                    {runtime && <span>{runtime}</span>}
                    <span className="pill pill--sm">{details.type === "tv" ? "TV" : "Movie"}</span>
                  </p>
                  <div className="chips">
                    {data.genres?.map((g) => <span key={g.id} className="chip chip--static">{g.name}</span>)}
                  </div>
                  <div className="hero__actions">
                    {trailer && !playing && (
                      <button className="btn btn--primary" onClick={() => setPlaying(true)}>
                        <BsPlayFill /> Play trailer
                      </button>
                    )}
                    <button className="btn btn--ghost" onClick={() => toggleWatchlist(data, details.type)}>
                      {saved ? <AiFillHeart /> : <AiOutlinePlus />} {saved ? "In watchlist" : "Add to watchlist"}
                    </button>
                  </div>
                </div>
              </div>

              {data.overview && (
                <>
                  <h3 className="modal__h">Overview</h3>
                  <p className="modal__overview">{data.overview}</p>
                </>
              )}

              {cast.length > 0 && (
                <>
                  <h3 className="modal__h">Top cast</h3>
                  <div className="cast">
                    {cast.map((c) => (
                      <div key={c.credit_id} className="cast__item">
                        {c.profile_path ? (
                          <img src={imageUrl(c.profile_path, "w185")} alt="" loading="lazy" />
                        ) : (
                          <span className="cast__placeholder">{c.name[0]}</span>
                        )}
                        <strong>{c.name}</strong>
                        <small>{c.character}</small>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {similar.length > 0 && <Row title="More like this" items={similar} type={details.type} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
