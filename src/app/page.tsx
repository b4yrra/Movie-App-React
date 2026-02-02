import { CarouselBar } from "@/components/ui/carouselBar";
import { Header } from "@/components/ui/header";

export default function Home() {
  return (
    <div className="max-md:w-full">
      <Header />
      <CarouselBar />
    </div>
  );
}
