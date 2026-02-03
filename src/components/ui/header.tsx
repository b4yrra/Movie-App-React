import { Film } from "lucide-react";
import { Search } from "lucide-react";
import { Moon } from "lucide-react";

export const Header = () => {
  return (
    <div className="flex justify-between items-center h-14 px-5 py-5 pb-5 xl:px-20">
      <div className="flex gap-2 h-5 items-center">
        <Film className="h-5 w-5 text-indigo-700" />
        <div className="text-[16px] italic font-bold text-indigo-700">
          Movie Z
        </div>
      </div>
      <div className="max-md:hidden md:block">
        <div className="flex gap-3">
          <div>
            <button className="border-2 border-[#E4E4E7] rounded-lg py-1 px-2">
              ▼ Genre
            </button>
          </div>
          <div className="border-2 border-[#E4E4E7] flex px-1 items-center rounded-lg gap-3">
            <Search className="w-4 text-slate-500" />
            <input
              type="text"
              className="outline-none xl:w-94.75"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="w-9 h-9 cursor-pointer md:hidden">
          <div className="border-2 border-[#E4E4E7] h-full w-full flex items-center justify-center rounded-lg">
            <Search className="w-4 h-4" />
          </div>
        </button>
        <button className="w-9 h-9 cursor-pointer">
          <div className="border-2 border-[#E4E4E7] h-full w-full flex items-center justify-center rounded-lg">
            <Moon className="w-4 h-4" />
          </div>
        </button>
      </div>
    </div>
  );
};
