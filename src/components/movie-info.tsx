// "use client";

// import { useEffect, useState } from "react";
// import { datas } from "../../../utils/getData";

// export type Movie = {
//   movie: string;
//   id: string;
//   backdrop_path: string;
//   original_title: string;
//   vote_average: number;
//   overview: string;
//   poster_path: string;
// };

// export default function Home() {
//   const [selectedMovie, setSelectedMovie] = useState<Movie[]>([]);

//   useEffect(() => {
//     const fetchedMovies = async () => {
//       const selectedMovie = await datas("selectedMovie", 1);
//       setSelectedMovie(selectedMovie.results);
//     };
//     fetchedMovies();
//   }, []);

//   console.log(selectedMovie);

//   return (
//     <div className="flex flex-col w-full items-center">
//       {/* <Cards movies={selectedMovie} name="selectedMovie" ontoggle={true} /> */}
//     </div>
//   );
// }
