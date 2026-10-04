import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DetailsModal from "./components/DetailsModal";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Trending from "./pages/Trending";
import Search from "./pages/Search";
import Watchlist from "./pages/Watchlist";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="main">
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
      </main>
      <Footer />
      <DetailsModal />
    </>
  );
}
