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
      <Carousel className="max-md:h-66">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div>
                <Card>
                  <CardContent>
                    <div className="bg-[url(/Wicked.jpg)] bg-cover bg-no-repeat bg-center w-full max-md:h-100 max-xl:h-130 xl:h-150 flex items-center">
                      <div className="">
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
                          <p className="text-white xl:w-120 max-md:w-100 md:w-110 text-[12px]">
                            Elphaba, a misunderstood young woman because of her
                            green skin, and Glinda, a popular girl, become
                            friends at Shiz University in the Land of Oz. After
                            an encounter with the Wonderful Wizard of Oz, their
                            friendship reaches a crossroads.
                          </p>
                        </div>
                        <div className="p-7">
                          <button className="flex gap-2 px-4 py-2 rounded-lg text-[14px] font-medium bg-white text-black">
                            <Play />
                            Watch Trailer
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
