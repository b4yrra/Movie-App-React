import { Movie, MovieDetailResponse, Trailer } from "@/lib/types";

type MovieTrailerProps = {
  movie: Movie | MovieDetailResponse;
  trailers: Trailer;
};

export const MovieTrailer = ({ movie, trailers }: MovieTrailerProps) => {
  const trailer =
    trailers.results.find((t) => {
      return t.site === "YouTube" && t.type === "Trailer" && t.official;
    }) ||
    trailers.results.find((t) => {
      return t.site === "YouTube" && t.type === "Trailer";
    }) ||
    trailers.results.find((t) => {
      return t.site === "YouTube";
    });

  return (
    <div>
      {trailer ? (
        <iframe
          className="w-full lg:max-w-190 aspect-video lg:rounded-sm"
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
          title={trailer.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full lg:max-w-190 aspect-video object-cover brightness-60 lg:rounded-sm"
        />
      )}
    </div>
  );
};
