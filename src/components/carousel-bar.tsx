"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { Play } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Movie } from "@/lib/types";

const TMBD_IMG_URL = "https://image.tmdb.org/t/p/original";

type CarouselBarProps = {
  movies: Movie[];
};

export const CarouselBar = ({ movies }: CarouselBarProps) => {
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
        <CarouselNext className="absolute z-10 right-10 bg-white text-black w-10 h-10 hover:bg-gray-400 max-lg:hidden" />
        <CarouselContent>
          {movies.slice(0, 3).map((card) => (
            <CarouselItem className="flex flex-col items-center" key={card.id}>
              <div className="w-full lg:w-full relative">
                <div className="h-80 md:h-140 lg:h-190 xl:h-220 md:flex md:items-center">
                  <img
                    src={`${TMBD_IMG_URL}${card.backdrop_path}`}
                    alt={card.original_name}
                    className="w-full h-full object-cover object-center md:absolute md:inset-0 md:-z-10"
                  />
                </div>
                <div className="md:absolute md:inset-0 md:flex md:items-center md:ml-30">
                  <div>
                    <div className="p-7">
                      <div>
                        <p className="text-[14px] text-black xl:text-[16px] md:text-white dark:text-white">
                          Now Playing:
                        </p>
                        <h1 className="text-[24px] font-semibold text-black xl:text-[36px] md:text-white dark:text-white">
                          {card.name}
                        </h1>
                      </div>
                      <div className="flex gap-2">
                        <Star fill="yellow" className="text-yellow-400" />
                        <h2 className="text-slate-600 text-[16px] xl:text-[16px]">
                          <span className="font-semibold text-[18px] text-black xl:text-[18px] md:text-white dark:text-white">
                            {card.vote_average}
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
                      <button className="flex gap-2 px-4 py-2 rounded-lg text-[14px] font-medium bg-black text-white md:text-black md:bg-white dark:text-black dark:bg-white">
                        <Play />
                        Watch Trailer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-10 bg-white text-black w-10 h-10 hover:bg-gray-400 z-10 max-lg:hidden" />
      </Carousel>
    </div>
  );
};
