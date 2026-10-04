import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import { useApp } from "./context/AppContext";

// Home ships in the main bundle; everything else loads on demand.
const Browse = lazy(() => import("./pages/Browse"));
const Trending = lazy(() => import("./pages/Trending"));
const Search = lazy(() => import("./pages/Search"));
const Watchlist = lazy(() => import("./pages/Watchlist"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DetailsModal = lazy(() => import("./components/DetailsModal"));

export default function App() {
  const { details } = useApp();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="main">
        <Suspense fallback={<div className="page-loading" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Browse key="movie" type="movie" />} />
            <Route path="/tv" element={<Browse key="tv" type="tv" />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      {details && (
        <Suspense fallback={null}>
          <DetailsModal />
        </Suspense>
      )}
    </>
  );
}
