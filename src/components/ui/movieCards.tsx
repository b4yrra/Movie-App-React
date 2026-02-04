import { Star } from "lucide-react";

export const MovieCards = () => {
  return (
    <div className="flex flex-col items-center rounded-lg">
      <div className="rounded-lg bg-slate-200 w-[157.5px] lg:w-[229.729736328125px] md:w-50">
        <img
          src="/dearsanta.jpg"
          alt=""
          className="w-[157.5px] h-[233.1px] md:h-75 lg:h-85 lg:w-[229.729736328125px] md:w-50"
        />
        <div className="flex gap-1 px-2 items-center">
          <Star className=" text-yellow-400" size={17} fill="yellow" />
          <div className="text-slate-600 text-[12px] lg:text-[14px]">
            <span className="font-semibold text-[14px] text-black lg:text-[16px]">
              6.9
            </span>
            /10
          </div>
        </div>
        <h1 className="px-2 h-12 w-[141.5px] overflow-hidden">Dear Santa</h1>
      </div>
    </div>
  );
};

export const Movies = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:gap-5 md:grid-cols-4 lg:gap-6 lg:grid-cols-5 w-full lg:max-w-360 lg:w-full">
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
