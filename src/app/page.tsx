import { getNowPlayingMovies, getMovieDetails } from "@/lib/api";
import { CarouselBar } from "./components/carousel-bar";
import { Movies } from "./components/movie-homepage";

const Home = async () => {
  const { results: NowPlaying } = await getNowPlayingMovies();

  const topMovies = NowPlaying.slice(0, 3);
  const trailers = await Promise.all(
    topMovies.map((movie) => getMovieDetails(String(movie.id))),
  );

  return (
    <div>
      <CarouselBar movies={NowPlaying} trailers={trailers} />
      <Movies />
    </div>
  );
};

export default Home;
