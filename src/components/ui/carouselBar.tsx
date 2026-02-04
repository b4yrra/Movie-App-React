import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { Play } from "lucide-react";

export const CarouselBar = () => {
  return (
    <div>
      <Carousel>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem className="flex flex-col items-center" key={index}>
              <div className="w-full lg:max-w-360 lg:w-full">
                <div className="bg-[url(/Wicked.jpg)] bg-cover bg-no-repeat w-full bg-center flex items-center h-100 md:h-140 lg:h-190 relative">
                  <div className="max-md:hidden ml-20">
                    <CarouselNext className="absolute right-10" />
                    <div className="p-7">
                      <div>
                        <p className="text-[14px] text-white xl:text-[16px]">
                          Now Playing:
                        </p>
                        <h1 className="text-[24px] font-semibold text-white xl:text-[36px]">
                          Wicked
                        </h1>
                      </div>
                      <div className="flex gap-2">
                        <Star className=" text-yellow-400" />
                        <h2 className="text-slate-600 text-[16px] xl:text-[16px]">
                          <span className="font-semibold text-[18px] text-white xl:text-[18px]">
                            6.9
                          </span>
                          /10
                        </h2>
                      </div>
                    </div>
                    <div className="px-7">
                      <p className="text-white lg:w-100 md:w-90 text-[12px]">
                        Elphaba, a misunderstood young woman because of her
                        green skin, and Glinda, a popular girl, become friends
                        at Shiz University in the Land of Oz. After an encounter
                        with the Wonderful Wizard of Oz, their friendship
                        reaches a crossroads.
                      </p>
                    </div>
                    <div className="p-7">
                      <button className="flex gap-2 px-4 py-2 rounded-lg text-[14px] font-medium bg-white text-black">
                        <Play />
                        Watch Trailer
                      </button>
                    </div>
                    <CarouselPrevious className="absolute left-10" />
                  </div>
                </div>
                <div className="md:hidden">
                  <div className="p-7 flex justify-between">
                    <div>
                      <p className="text-[14px] text-black xl:text-[16px]">
                        Now Playing:
                      </p>
                      <h1 className="text-[24px] font-semibold text-black xl:text-[36px]">
                        Wicked
                      </h1>
                    </div>
                    <div className="flex gap-2">
                      <Star className=" text-yellow-400" />
                      <h2 className="text-slate-600 text-[16px] xl:text-[16px]">
                        <span className="font-semibold text-[18px] text-black xl:text-[18px]">
                          6.9
                        </span>
                        /10
                      </h2>
                    </div>
                  </div>
                  <div className="px-7">
                    <p className="text-black xl:w-120 w-120 max-w-fit text-[12px]">
                      Elphaba, a misunderstood young woman because of her green
                      skin, and Glinda, a popular girl, become friends at Shiz
                    </p>
                  </div>
                  <div className="p-7">
                    <button className="flex gap-2 px-4 py-2 rounded-lg text-[14px] font-medium bg-black text-white">
                      <Play />
                      Watch Trailer
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
