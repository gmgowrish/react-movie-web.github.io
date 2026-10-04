import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          <strong>REACTFLIX</strong> · Built with React & Vite by{" "}
          <a href="https://github.com/gmgowrish" target="_blank" rel="noreferrer">G M Gowrish</a>
        </p>
        <p className="footer__tmdb">
          This product uses the TMDB API but is not endorsed or certified by{" "}
          <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer">TMDB</a>.
        </p>
        <a className="icon-btn" href="https://github.com/gmgowrish/react-movie-web.github.io" target="_blank" rel="noreferrer" aria-label="Source on GitHub">
          <FaGithub />
        </a>
      </div>
    </footer>
  );
}
