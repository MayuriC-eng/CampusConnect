import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event } from "@/components/EventCard";
import { Link } from "react-router-dom";

interface FeaturedCarouselProps {
  events: Event[];
}

export const FeaturedCarousel = ({ events }: FeaturedCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [events.length, isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentEvent = events[currentIndex];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl group">
      {/* Main Image */}
      <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12 text-background z-10">
          <div className="max-w-3xl space-y-4 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-primary rounded-full">
              <span className="text-sm font-semibold text-primary-foreground">
                {currentEvent.category}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              {currentEvent.title}
            </h2>
            <p className="text-lg sm:text-xl text-background/90 line-clamp-2">
              {currentEvent.description}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to={`/events/${currentEvent.id}`}>
                <Button variant="hero" size="lg" className="shadow-lg">
                  Learn More
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-background/10 backdrop-blur-sm border-background/30 text-background hover:bg-background hover:text-foreground"
                >
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-background/20 backdrop-blur-sm rounded-full hover:bg-background/40 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-background" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-background/20 backdrop-blur-sm rounded-full hover:bg-background/40 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-background" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "w-8 h-3 bg-background"
                : "w-3 h-3 bg-background/50 hover:bg-background/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
