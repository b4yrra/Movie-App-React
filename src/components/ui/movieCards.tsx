import { Star } from "lucide-react";

export const MovieCards = () => {
  return (
    <div className="flex flex-col p-7 rounded-lg">
      <div className="bg-slate-200 rounded-lg">
        <img
          src="/dearsanta.jpg"
          alt=""
          className="w-full h-[233.1px] lg:w-[229.729736328125px] lg:h-85"
        />
        <div className="flex gap-2 px-2">
          <Star className=" text-yellow-400" />
          <div className="text-slate-600 text-[14px] xl:text-[16px]">
            <span className="font-semibold text-[16px] text-black xl:text-[18px]">
              6.9
            </span>
            /10
          </div>
        </div>
        <h1 className="px-2 h-10 w-[141.5px]">Dear Santa</h1>
      </div>
    </div>
  );
};

export const Movies = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full lg:max-w-360 lg:w-full">
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
