import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, MapPin, Clock, Star, Trash2, Bell, BellOff } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface RegisteredEvent {
  eventId: string;
  eventName: string;
  registrationData: any;
  date: string;
  reminder?: boolean;
}

interface BookmarkedEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: string;
}

export default function Dashboard() {
  const [registeredEvents, setRegisteredEvents] = useState<RegisteredEvent[]>([]);
  const [bookmarkedEvents, setBookmarkedEvents] = useState<BookmarkedEvent[]>([]);

  useEffect(() => {
    // Load registered events
    const registered = JSON.parse(localStorage.getItem("registeredEvents") || "[]");
    setRegisteredEvents(registered);

    // Load bookmarked events
    const bookmarks = JSON.parse(localStorage.getItem("bookmarkedEvents") || "[]");
    setBookmarkedEvents(bookmarks);
  }, []);

  const handleUnregister = (index: number) => {
    const updated = registeredEvents.filter((_, i) => i !== index);
    setRegisteredEvents(updated);
    localStorage.setItem("registeredEvents", JSON.stringify(updated));
    toast.success("Event registration removed");
  };

  const handleRemoveBookmark = (eventId: number) => {
    const updated = bookmarkedEvents.filter((e) => e.id !== eventId);
    setBookmarkedEvents(updated);
    localStorage.setItem("bookmarkedEvents", JSON.stringify(updated));
    toast.success("Bookmark removed");
  };

  const toggleReminder = (index: number) => {
    const updated = [...registeredEvents];
    updated[index].reminder = !updated[index].reminder;
    setRegisteredEvents(updated);
    localStorage.setItem("registeredEvents", JSON.stringify(updated));
    toast.success(updated[index].reminder ? "Reminder set" : "Reminder removed");
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-3">
            My <span className="bg-gradient-primary bg-clip-text text-transparent">Dashboard</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your registered and bookmarked events
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="registered" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="registered">Registered Events</TabsTrigger>
            <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
          </TabsList>

          {/* Registered Events */}
          <TabsContent value="registered" className="space-y-4 animate-fade-in">
            {registeredEvents.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-muted-foreground mb-4">No registered events yet</p>
                  <Link to="/events">
                    <Button variant="hero">Browse Events</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              registeredEvents.map((event, index) => (
                <Card key={index} className="hover-scale transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{event.eventName}</CardTitle>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Badge variant={event.reminder ? "default" : "outline"}>
                        {event.reminder ? "Reminder On" : "No Reminder"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleReminder(index)}
                      >
                        {event.reminder ? (
                          <>
                            <BellOff className="h-4 w-4 mr-2" />
                            Remove Reminder
                          </>
                        ) : (
                          <>
                            <Bell className="h-4 w-4 mr-2" />
                            Set Reminder
                          </>
                        )}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleUnregister(index)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Unregister
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Bookmarked Events */}
          <TabsContent value="bookmarked" className="space-y-4 animate-fade-in">
            {bookmarkedEvents.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-muted-foreground mb-4">No bookmarked events yet</p>
                  <Link to="/events">
                    <Button variant="hero">Browse Events</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {bookmarkedEvents.map((event) => (
                  <Card key={event.id} className="hover-scale transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <Badge>{event.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.venue}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/events/${event.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            View Details
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveBookmark(event.id)}
                        >
                          <Star className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
