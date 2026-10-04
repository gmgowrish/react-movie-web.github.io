import { FaGithub, FaReact } from "react-icons/fa";
import { SiVite, SiReactrouter } from "react-icons/si";
import { BsCollectionPlay, BsHeart, BsSearch, BsPhone, BsMoonStars, BsFilm } from "react-icons/bs";
import me from "../assets/me.png";
import wave from "../assets/wave.png";

const FEATURES = [
  { icon: <BsFilm />, title: "Discover", text: "Browse popular, top-rated, upcoming and trending titles." },
  { icon: <BsCollectionPlay />, title: "Trailers", text: "Watch official trailers right inside the details view." },
  { icon: <BsSearch />, title: "Instant search", text: "Debounced search across movies and TV shows." },
  { icon: <BsHeart />, title: "Watchlist", text: "Save favourites, persisted locally on your device." },
  { icon: <BsMoonStars />, title: "Dark & light", text: "Theme toggle that remembers your choice." },
  { icon: <BsPhone />, title: "Responsive", text: "Designed to feel great from phones to wide screens." },
];

export default function About() {
  return (
    <div className="container page">
      <section className="about">
        <div className="about__text">
          <h1 className="about__hello">
            Hi <img src={wave} alt="" width={44} height={44} />
          </h1>
          <h2 className="about__name">
            I'm <span className="gradient-text">G M Gowrish</span>
          </h2>
          <p className="about__guide">
            Under the guidance of <strong>Miss Naga Suma C V</strong>, HOD of <em>BCA</em>
          </p>
          <p className="about__bio">
            I design and develop experiences that make people's lives simpler through the web.
            I work with HTML, CSS, JavaScript, React, Python and cyber security.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="https://github.com/gmgowrish" target="_blank" rel="noreferrer">
              <FaGithub /> See my projects
            </a>
            <a
              className="btn btn--ghost"
              href="https://medium.com/bingewave/building-a-live-streaming-movie-app-live-tv-website-part-1-d0857aaac8ea"
              target="_blank"
              rel="noreferrer"
            >
              Hire me
            </a>
          </div>
        </div>
        <figure className="about__photo">
          <img src={me} alt="Portrait of G M Gowrish" />
        </figure>
      </section>

      <h2 className="section-title">What ReactFlix can do</h2>
      <div className="features">
        {FEATURES.map((f) => (
          <div key={f.title} className="feature">
            <span className="feature__icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>

      <h2 className="section-title">Built with</h2>
      <div className="chips">
        <span className="chip chip--static"><FaReact /> React 18</span>
        <span className="chip chip--static"><SiVite /> Vite</span>
        <span className="chip chip--static"><SiReactrouter /> React Router</span>
        <span className="chip chip--static">TMDB API</span>
        <span className="chip chip--static">GitHub Pages</span>
      </div>
    </div>
  );
}
