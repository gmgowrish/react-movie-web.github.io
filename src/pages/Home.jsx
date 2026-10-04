import Hero from "../components/Hero";
import Row from "../components/Row";
import { useTmdb } from "../hooks/useTmdb";

export default function Home() {
  const { data } = useTmdb("/trending/all/day");
  const trending = data?.results || [];

  return (
    <>
      <Hero items={trending} />
      <div className="container stack">
        <Row title="Trending Today" items={trending.length ? trending : undefined} path="/trending/all/day" link="/trending" />
        <Row title="Popular Movies" path="/movie/popular" type="movie" link="/movies" />
        <Row title="Now Playing in Theatres" path="/movie/now_playing" type="movie" />
        <Row title="Popular TV Shows" path="/tv/popular" type="tv" link="/tv" />
        <Row title="Top Rated Movies" path="/movie/top_rated" type="movie" />
        <Row title="Top Rated TV" path="/tv/top_rated" type="tv" />
        <Row title="Upcoming Movies" path="/movie/upcoming" type="movie" />
      </div>
    </>
  );
}
