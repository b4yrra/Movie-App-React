"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Play, X } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Movie, Trailer } from "@/lib/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TMBD_IMG_URL = "https://image.tmdb.org/t/p/original";

type CarouselBarProps = {
  movies: Movie[];
  trailers: Trailer[];
};

export const CarouselBar = ({
  movies = [],
  trailers = [],
}: CarouselBarProps) => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  return (
    <div>
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselNext className="absolute z-10 right-10 backdrop-blur-md bg-white/30 text-black w-12 h-12 hover:bg-gray-400 max-lg:hidden" />
        <CarouselContent>
          {(movies ?? []).slice(0, 3).map((card, index) => {
            const movieTrailers = trailers[index];
            const trailer =
              movieTrailers?.results?.find(
                (t) =>
                  t.site === "YouTube" && t.type === "Trailer" && t.official,
              ) ||
              movieTrailers?.results?.find(
                (t) => t.site === "YouTube" && t.type === "Trailer",
              ) ||
              movieTrailers?.results?.find((t) => t.site === "YouTube");

            return (
              <CarouselItem
                className="flex flex-col items-center"
                key={card.id}
              >
                <div className="w-full lg:w-full relative">
                  <div className="h-80 md:h-140 lg:h-190 xl:h-220 md:flex md:items-center">
                    <img
                      src={`${TMBD_IMG_URL}${card.backdrop_path}`}
                      alt={card.original_name}
                      className="w-full h-full object-cover object-center md:absolute md:inset-0 md:-z-10"
                    />
                  </div>
                  <div className="md:absolute md:inset-0 md:flex md:items-center md:ml-30">
                    <div className="backdrop-blur-xl bg-black/10 rounded-xl">
                      <div className="p-7">
                        <div>
                          <p className="text-[14px] text-black xl:text-[16px] md:text-white dark:text-white">
                            Now Playing:
                          </p>
                          <h1 className="text-[24px] font-semibold text-black xl:text-[36px] md:text-white dark:text-white">
                            {card.title}
                          </h1>
                        </div>
                        <div className="flex gap-2">
                          <Star fill="yellow" className="text-yellow-400" />
                          <h2 className="text-slate-600 text-[16px] xl:text-[16px]">
                            <span className="font-semibold text-[18px] text-black xl:text-[18px] md:text-white dark:text-white">
                              {card.vote_average.toFixed(1)}
                            </span>
                            /10
                          </h2>
                        </div>
                      </div>
                      <div className="px-7">
                        <p className="text-black lg:w-100 md:w-90 text-[12px] md:text-white dark:text-white">
                          {card.overview}
                        </p>
                      </div>
                      <div className="p-7">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="flex gap-2 px-4 py-2 rounded-lg text-[14px] font-medium bg-black text-white md:text-black md:bg-white dark:text-black dark:bg-white cursor-pointer">
                              <Play />
                              Watch Trailer
                            </button>
                          </DialogTrigger>
                          <DialogContent
                            className="bg-black border-0 flex flex-col items-end p-0 rounded-sm w-full lg:max-w-4xl aspect-video"
                            showCloseButton={false}
                          >
                            <DialogClose className="h-fit w-fit m-0 p-0 lg:hidden">
                              <X className="text-white mt-2 mr-2" />
                            </DialogClose>
                            {trailer ? (
                              <iframe
                                className="w-full rounded-sm aspect-video"
                                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=0`}
                                title={trailer.name}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ) : (
                              <div className="w-full bg-zinc-900 flex items-center justify-center text-white aspect-video rounded-sm">
                                <span>Trailer олдсонгүй</span>
                              </div>
                            )}
                            <DialogTitle className="h-0 w-0 p-0 m-0 sr-only">
                              {card.title} trailer
                            </DialogTitle>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-10 backdrop-blur-md bg-white/30 text-black w-12 h-12 hover:bg-gray-400 z-10 max-lg:hidden" />
      </Carousel>
    </div>
  );
};
