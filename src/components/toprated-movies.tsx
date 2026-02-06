import { Star } from "lucide-react";

const upcomingMovies = [
  {
    id: 1,
    name: "Pulp Fiction",
    img: "/pulp.jpg",
    rating: 6.9,
  },

  {
    id: 2,
    name: "Pulp Fiction",
    img: "/pulp.jpg",
    rating: 6.9,
  },

  {
    id: 3,
    name: "Pulp Fiction",
    img: "/pulp.jpg",
    rating: 6.9,
  },

  {
    id: 4,
    name: "Pulp Fiction",
    img: "/pulp.jpg",
    rating: 6.9,
  },

  {
    id: 5,
    name: "Pulp Fiction",
    img: "/pulp.jpg",
    rating: 6.9,
  },

  {
    id: 6,
    name: "Pulp Fiction",
    img: "/pulp.jpg",
    rating: 6.9,
  },

  {
    id: 7,
    name: "Pulp Fiction",
    img: "/pulp.jpg",
    rating: 6.9,
  },

  {
    id: 8,
    name: "Pulp Fiction",
    img: "/pulp.jpg",
    rating: 6.9,
  },

  {
    id: 9,
    name: "Pulp Fiction",
    img: "/pulp.jpg",
    rating: 6.9,
  },

  {
    id: 10,
    name: "Pulp Fiction",
    img: "/pulp.jpg",
    rating: 6.9,
  },
];

export const TopRatedMovies = () => {
  return upcomingMovies.map((movie) => (
    <div key={movie.id} className="flex flex-col items-center rounded-lg">
      <div className="rounded-lg bg-[#F4F4F5] dark:bg-[#27272A] w-full max-w-[157.5px] sm:max-w-45 md:max-w-50 lg:max-w-57.5">
        <img
          src={movie.img}
          alt={movie.name}
          className="w-full h-auto rounded-t-lg object-cover"
        />
        <div className="p-2 space-y-1">
          <div className="flex gap-1 items-center">
            <Star className="text-yellow-400" size={17} fill="yellow" />
            <div className="text-slate-600 text-[12px] lg:text-[14px] dark:text-[#A1A1AA]">
              <span className="font-semibold text-[14px] text-black lg:text-[16px] dark:text-white">
                {movie.rating}
              </span>
              /10
            </div>
          </div>
          <h1 className="text-sm md:text-base font-medium text-black dark:text-white line-clamp-2 w-30 h-12">
            {movie.name}
          </h1>
        </div>
      </div>
    </div>
  ));
};
