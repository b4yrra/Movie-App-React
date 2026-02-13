import { getNowPlayingMovies } from "@/lib/api";
import { CarouselBar } from "./components/carousel-bar";
import Movies from "./popular/page";

const Home = async () => {
  const { results: NowPlaying } = await getNowPlayingMovies();
  return (
    <div>
      <CarouselBar movies={NowPlaying} />
      <Movies />
    </div>
  );
};

export default Home;
