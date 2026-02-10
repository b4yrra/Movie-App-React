import { CarouselBar } from "@/components/carousel-bar";
import { Movies } from "@/components/movie-homepage";
import { getNowPlayingMovies } from "@/lib/api";

const Home = async () => {
  const { results: NowPlaying } = await getNowPlayingMovies();
  return (
    <div>
      <CarouselBar movies={NowPlaying} />
      <Movies />
      {/* <MovieInfo /> */}
    </div>
  );
};

export default Home;
