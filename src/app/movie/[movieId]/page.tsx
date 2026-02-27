import { getMovieDetails } from "@/lib/get-movie-details";
import { getCredtiDetails } from "@/lib/get-credit-details";
import { WatchMovieClient } from "./watch-movie-client";

const WatchMoviePage = async ({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) => {
  const { movieId } = await params;
  const [movie, credits] = await Promise.all([
    getMovieDetails(movieId),
    getCredtiDetails(movieId),
  ]);

  return <WatchMovieClient movie={movie} credits={credits} />;
};

export default WatchMoviePage;
