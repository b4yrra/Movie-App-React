import { getGenres } from "@/lib/get-genres";
import { GenreDropdownClient } from "./genre-dropdown-client";

export const HeaderDropdownMenuDemo = async ({
  selectedGenreId,
}: {
  selectedGenreId?: number;
} = {}) => {
  const { genres } = await getGenres();

  return (
    <GenreDropdownClient genres={genres} selectedGenreId={selectedGenreId} />
  );
};
