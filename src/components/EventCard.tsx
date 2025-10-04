import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  image?: string;
  attendees?: number;
}

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const categoryColors: Record<string, string> = {
    Technical: "bg-primary text-primary-foreground",
    Cultural: "bg-secondary text-secondary-foreground",
    Sports: "bg-accent text-accent-foreground",
    Workshop: "bg-muted text-foreground",
  };

  return (
    <Card className="group overflow-hidden border-2 hover:border-primary transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer">
      {/* Image Section */}
      {event.image && (
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-3 right-3 transform group-hover:scale-110 transition-transform duration-300">
            <Badge className={categoryColors[event.category] || "bg-primary"}>
              {event.category}
            </Badge>
          </div>
        </div>
      )}

      <CardContent className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-secondary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-accent" />
            <span>{event.venue}</span>
          </div>
          {event.attendees && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              <span>{event.attendees} registered</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Link to={`/events/${event.id}`} className="w-full">
          <Button className="w-full group-hover:shadow-lg transition-all duration-300">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
