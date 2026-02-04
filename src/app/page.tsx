import { CarouselBar } from "@/components/ui/carouselBar";
import { Header } from "@/components/ui/header";
import { Movies } from "@/components/ui/movieCards";

export default function Home() {
  return (
    <div>
      <Header />
      <CarouselBar />
      <Movies />
    </div>
  );
}
