import Link from "next/link";
import { MovieCards } from "./movieCards";

export const Movies = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center w-360 max-w-full p-10">
        <h1 className="text-[24px] font-semibold">Upcoming</h1>
        <Link href="" className="text-[14px] font-medium">
          See More →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 p-4">
        <MovieCards />
        <MovieCards />
        <MovieCards />
        <MovieCards />
        <MovieCards />
        <MovieCards />
        <MovieCards />
        <MovieCards />
        <MovieCards />
        <MovieCards />
      </div>
    </div>
  );
};
