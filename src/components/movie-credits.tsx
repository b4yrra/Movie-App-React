import { CreditResponse, Crew } from "@/lib/credit-type";

type MovieDirectorsProps = {
  credit: CreditResponse;
};

export const MovieDirectors = ({ credit }: MovieDirectorsProps) => {
  const directors = credit.crew.filter((el) => el.job === "Director");
  const writers = credit.crew.filter(
    (el) => el.known_for_department === "Writing",
  );

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-10 border-b py-6 pt-5">
        <h3 className="font-semibold text-lg">Director</h3>
        <p className="text-gray-700 dark:text-gray-400">
          {directors.map((d) => d.name).join(" · ")}
        </p>
      </div>
      <div className="flex items-center gap-10 border-b py-6 pt-5">
        <h3 className="font-semibold text-lg">Writers</h3>
        <p className="text-gray-700 dark:text-gray-400">
          {writers
            .slice(0, 3)
            .map((w) => w.name)
            .join(" · ")}
        </p>
      </div>
      <div className="flex items-center gap-10 border-b py-6">
        <h3 className="font-semibold text-lg">Stars</h3>
        <p className="text-gray-700 dark:text-gray-400">
          {credit.cast
            .slice(0, 3)
            .map((c) => c.name)
            .join(" · ")}
        </p>
      </div>
    </div>
  );
};
