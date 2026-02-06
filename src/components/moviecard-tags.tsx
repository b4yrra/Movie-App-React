import Link from "next/link";

type CategoriesTagProps = {
  onClick: string;
  text: string;
};

export const CategoriesTag = (props: CategoriesTagProps) => {
  const { onClick, text } = props;

  return (
    <div className="flex justify-between items-center w-360 max-w-full p-10">
      <h1 className="text-[24px] font-semibold">{text}</h1>
      <Link href={onClick} className="text-[14px] font-medium">
        See More →
      </Link>
    </div>
  );
};

//////////////////////

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
