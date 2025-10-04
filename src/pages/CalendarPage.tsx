import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import { events } from "@/data/events";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Get events for selected date
  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return [];
    const dateStr = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return events.filter((event) => event.date === dateStr);
  };

  // Get all event dates for highlighting
  const eventDates = events.map((event) => {
    const [month, day, year] = event.date.split(" ");
    const monthNum = new Date(`${month} 1, 2024`).getMonth();
    return new Date(parseInt(year), monthNum, parseInt(day));
  });

  const selectedEvents = getEventsForDate(selectedDate);

  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-3">
            Event <span className="bg-gradient-primary bg-clip-text text-transparent">Calendar</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            View all upcoming events by date
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Select a Date</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-lg border pointer-events-auto"
                modifiers={{
                  event: eventDates,
                }}
                modifiersClassNames={{
                  event: "bg-primary/20 font-bold",
                }}
              />
            </CardContent>
          </Card>

          {/* Events for Selected Date */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              Events on{" "}
              {selectedDate?.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h2>

            {selectedEvents.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <CalendarDays className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">No events scheduled for this date</p>
                  <Link to="/events">
                    <Button variant="hero">View All Events</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4 animate-fade-in">
                {selectedEvents.map((event) => (
                  <Card key={event.id} className="hover-scale transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <Badge>{event.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.venue}
                        </span>
                      </div>
                      <Link to={`/events/${event.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
