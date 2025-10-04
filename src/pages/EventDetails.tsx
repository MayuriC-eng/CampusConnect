import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Users, ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { events } from "@/data/events";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EventDetails() {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);
  const [timeLeft, setTimeLeft] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Check if event is bookmarked
  useEffect(() => {
    if (!event) return;
    const bookmarks = JSON.parse(localStorage.getItem("bookmarkedEvents") || "[]");
    const exists = bookmarks.some((b: any) => b.id === event.id);
    setIsBookmarked(exists);
  }, [event]);

  useEffect(() => {
    if (!event) return;

    const calculateTimeLeft = () => {
      const eventDate = new Date(event.date.split(",")[0] + ", 2024");
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft("Event has started!");
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, [event]);

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
          <Link to="/events">
            <Button variant="hero">Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const toggleBookmark = () => {
    if (!event) return;
    const bookmarks = JSON.parse(localStorage.getItem("bookmarkedEvents") || "[]");
    
    if (isBookmarked) {
      const updated = bookmarks.filter((b: any) => b.id !== event.id);
      localStorage.setItem("bookmarkedEvents", JSON.stringify(updated));
      setIsBookmarked(false);
      toast.success("Removed from bookmarks");
    } else {
      bookmarks.push(event);
      localStorage.setItem("bookmarkedEvents", JSON.stringify(bookmarks));
      setIsBookmarked(true);
      toast.success("Added to bookmarks");
    }
  };

  const categoryColors: Record<string, string> = {
    Technical: "bg-primary text-primary-foreground",
    Cultural: "bg-secondary text-secondary-foreground",
    Sports: "bg-accent text-accent-foreground",
    Workshop: "bg-muted text-foreground",
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link to="/events">
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:animate-ruffle" />
            Back to Events
          </Button>
        </Link>

        {/* Event Card */}
        <Card className="overflow-hidden shadow-2xl border-2 animate-fade-in">
          {/* Banner Image */}
          {event.image && (
            <div className="relative h-64 md:h-96 overflow-hidden bg-muted">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              <div className="absolute top-4 right-4">
                <Badge className={`${categoryColors[event.category]} text-base px-4 py-2`}>
                  {event.category}
                </Badge>
              </div>
            </div>
          )}

          <CardContent className="p-8 space-y-8">
            {/* Title & Countdown */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">{event.title}</h1>
              {timeLeft && (
                <div className="inline-block bg-gradient-accent px-6 py-3 rounded-lg shadow-md">
                  <p className="text-accent-foreground font-semibold">
                    ⏰ {timeLeft}
                  </p>
                </div>
              )}
            </div>

            {/* Event Info Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <Calendar className="h-6 w-6 text-primary mt-1" />
                <div>
                  <p className="font-semibold">Date</p>
                  <p className="text-muted-foreground">{event.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <Clock className="h-6 w-6 text-secondary mt-1" />
                <div>
                  <p className="font-semibold">Time</p>
                  <p className="text-muted-foreground">{event.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <MapPin className="h-6 w-6 text-accent mt-1" />
                <div>
                  <p className="font-semibold">Venue</p>
                  <p className="text-muted-foreground">{event.venue}</p>
                </div>
              </div>

              {event.attendees && (
                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  <Users className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Attendees</p>
                    <p className="text-muted-foreground">{event.attendees} registered</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">About This Event</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {event.description}
              </p>
              <p className="text-muted-foreground">
                Join us for an incredible experience that will enhance your skills and expand your network. 
                This event is designed to provide valuable insights, hands-on learning, and opportunities 
                to connect with like-minded individuals. Don't miss out on this amazing opportunity!
              </p>
            </div>

            {/* Registration CTA */}
            <div className="pt-4 border-t border-border flex flex-wrap gap-4">
              <Link to="/register" className="flex-1 sm:flex-none">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  Register for Event
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                onClick={toggleBookmark}
                className={isBookmarked ? "border-primary" : ""}
              >
                <Star className={`h-5 w-5 mr-2 ${isBookmarked ? "fill-primary text-primary" : ""}`} />
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
