import { MovieCards } from "@/components/movieCards";
import Link from "next/link";

export default function Movies() {
  return (
    <div className="flex flex-col items-center">
      <CategoriesReturn onClick={"/"} text="Upcoming" />
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
}

type CategoriesReturnProps = {
  onClick: string;
  text: string;
};

export const CategoriesReturn = (props: CategoriesReturnProps) => {
  const { onClick, text } = props;

  return (
    <div className="flex justify-between items-center w-360 max-w-full p-10">
      <h1 className="text-[24px] font-semibold">{text}</h1>
      <Link href={onClick} className="text-[14px] font-medium">
        ← Return To Home Page
      </Link>
    </div>
  );
};
