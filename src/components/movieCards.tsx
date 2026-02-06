import { Star } from "lucide-react";

export const MovieCards = () => {
  return (
    <div className="flex flex-col items-center rounded-lg">
      <div className="rounded-lg bg-[#F4F4F5] dark:bg-[#27272A] w-full max-w-[157.5px] sm:max-w-45 md:max-w-50 lg:max-w-57.5">
        <img
          src="/dearsanta.jpg"
          alt="Dear Santa"
          className="w-full h-auto rounded-t-lg object-cover"
        />
        <div className="p-2 space-y-1">
          <div className="flex gap-1 items-center">
            <Star className="text-yellow-400" size={17} fill="yellow" />
            <div className="text-slate-600 text-[12px] lg:text-[14px] dark:text-[#A1A1AA]">
              <span className="font-semibold text-[14px] text-black lg:text-[16px] dark:text-white">
                6.9
              </span>
              /10
            </div>
          </div>
          <h1 className="text-sm md:text-base font-medium text-black dark:text-white line-clamp-2">
            Dear Santa
          </h1>
        </div>
      </div>
    </div>
  );
};
