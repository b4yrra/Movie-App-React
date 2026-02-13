import { getMovieDetails } from "@/lib/get-movie-details";
import { MovieDetails } from "../components/movie-details";

const Home = async ({ params }: { params: Promise<{ movieId: string }> }) => {
  const { movieId } = await params;
  const movie = await getMovieDetails(movieId);
  return (
    <div className="flex flex-col items-center">
      <MovieDetails movie={movie} />
    </div>
  );
};

export default Home;
