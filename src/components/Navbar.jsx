import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { HiSearch, HiX, HiMenuAlt3 } from "react-icons/hi";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { useApp } from "../context/AppContext";
import { useDebounce } from "../hooks/useDebounce";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/movies", label: "Movies" },
  { to: "/tv", label: "TV Shows" },
  { to: "/trending", label: "Trending" },
  { to: "/watchlist", label: "Watchlist" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const { theme, toggleTheme, watchlist } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const onSearchPage = location.pathname === "/search";

  const [query, setQuery] = useState(onSearchPage ? params.get("q") || "" : "");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const typed = useRef(false);
  const debounced = useDebounce(query, 450);

  useEffect(() => {
    if (!typed.current) return;
    const q = debounced.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`, { replace: onSearchPage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  useEffect(() => {
    setMenuOpen(false);
    if (!onSearchPage) {
      typed.current = false;
      setQuery("");
    }
  }, [location.pathname, onSearchPage]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className={`navbar ${scrolled || menuOpen ? "navbar--solid" : ""}`}>
      <div className="navbar__inner">
        <Link to="/" className="brand" aria-label="ReactFlix home">
          <span className="brand__mark">R</span>
          <span className="brand__text">REACTFLIX</span>
        </Link>

        <nav className={`nav-links ${menuOpen ? "nav-links--open" : ""}`} aria-label="Main">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="nav-link">
              {l.label}
              {l.to === "/watchlist" && watchlist.length > 0 && (
                <span className="badge">{watchlist.length}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <form className="search" onSubmit={submit} role="search">
            <HiSearch className="search__icon" aria-hidden />
            <input
              type="search"
              placeholder="Search movies & TV…"
              value={query}
              aria-label="Search movies and TV shows"
              onChange={(e) => {
                typed.current = true;
                setQuery(e.target.value);
              }}
            />
            {query && (
              <button type="button" className="search__clear" aria-label="Clear search" onClick={() => setQuery("")}>
                <HiX />
              </button>
            )}
          </form>
          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title="Toggle theme"
          >
            {theme === "dark" ? <BsSunFill /> : <BsMoonStarsFill />}
          </button>
          <button
            className="icon-btn menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>
    </header>
  );
}
