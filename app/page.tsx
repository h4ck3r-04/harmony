"use client"
import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { BarChartComponent } from "@/components/sample/bar-chart";
import { AreaChartComponent } from "@/components/sample/area-chart";
import { LineChartComponent } from "@/components/sample/line-chart";
import { PieChartComponent } from "@/components/sample/pie-chart";
import { RadarChartComponent } from "@/components/sample/radar-chart";
import Autoplay from "embla-carousel-autoplay"
import { RadialChartComponent } from "@/components/sample/radial-chart";

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  return (
    <div className="flex flex-col justify-center items-center h-[90vh] w-full text-center px-6">
      <h1 className="text-4xl md:text-6xl text-foreground">
        Data Made{" "}
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Beautiful
        </span>
      </h1>
      <p className="mt-4 text-md text-muted-foreground max-w-2xl">
        Transform your raw data into stunning visual insights.
        Make data analytics intuitive, efficient, and elegant.
      </p>
      <Carousel
        opts={{
          align: "start",
        }}
        plugins={[plugin.current]}
        className="mt-20 w-[70vw] md:w-[85vw] lg:w-[90vw]"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {[
            BarChartComponent,
            AreaChartComponent,
            LineChartComponent,
            PieChartComponent,
            RadarChartComponent,
            RadialChartComponent
          ].map((Component, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Component />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
