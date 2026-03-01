import { getNowPlayingMovies, getMovieDetails } from "@/lib/api";
import { CarouselBar } from "./components/carousel-bar";
import { Movies } from "./components/movie-homepage";

const Home = async () => {
  try {
    const data = await getNowPlayingMovies();
    const NowPlaying = data?.results ?? [];

    const topMovies = NowPlaying.slice(0, 3);
    const trailers = await Promise.allSettled(
      topMovies.map((movie) => getMovieDetails(String(movie.id))),
    ).then((results) =>
      results.map((r) =>
        r.status === "fulfilled" ? r.value : { id: 0, results: [] },
      ),
    );

    return (
      <div>
        <CarouselBar movies={NowPlaying} trailers={trailers} />
        <Movies />
      </div>
    );
  } catch (error) {
    console.error("Home page error:", error);
    return (
      <div>
        <Movies />
      </div>
    );
  }
};

export default Home;
