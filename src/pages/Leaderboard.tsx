import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, Users, Calendar } from "lucide-react";
import { events } from "@/data/events";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface EventStats {
  id: number;
  title: string;
  category: string;
  date: string;
  registrations: number;
  trend: "up" | "down" | "stable";
}

export default function Leaderboard() {
  const [eventStats, setEventStats] = useState<EventStats[]>([]);

  useEffect(() => {
    // Generate random registration numbers for demo
    const stats: EventStats[] = events.map((event) => ({
      id: Number(event.id),
      title: event.title,
      category: event.category,
      date: event.date,
      registrations: Math.floor(Math.random() * 500) + 50,
      trend: ["up", "down", "stable"][Math.floor(Math.random() * 3)] as "up" | "down" | "stable",
    }));

    // Sort by registrations
    stats.sort((a, b) => b.registrations - a.registrations);
    setEventStats(stats);
  }, []);

  const totalRegistrations = eventStats.reduce((sum, event) => sum + event.registrations, 0);
  const averageRegistrations = Math.floor(totalRegistrations / eventStats.length);

  const getMedalColor = (index: number) => {
    if (index === 0) return "text-yellow-500";
    if (index === 1) return "text-gray-400";
    if (index === 2) return "text-amber-600";
    return "text-muted-foreground";
  };

  const getMedalEmoji = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-3">
            Event <span className="bg-gradient-primary bg-clip-text text-transparent">Leaderboard</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Most popular events ranked by registrations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 animate-slide-up">
          <Card className="border-2 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{eventStats.length}</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalRegistrations}</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average per Event</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{averageRegistrations}</div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Top Events by Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventStats.map((event, index) => (
                <div
                  key={event.id}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all hover-scale ${
                    index < 3 ? "bg-accent/30 border-2 border-primary/20" : "bg-muted/30"
                  }`}
                >
                  {/* Rank */}
                  <div className={`text-4xl font-bold ${getMedalColor(index)} min-w-[60px] text-center`}>
                    {getMedalEmoji(index)}
                  </div>

                  {/* Event Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg truncate">{event.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="outline">{event.category}</Badge>
                      <span className="text-sm text-muted-foreground">{event.date}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {event.registrations}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                      <TrendingUp
                        className={`h-3 w-3 ${
                          event.trend === "up"
                            ? "text-green-500"
                            : event.trend === "down"
                            ? "text-red-500 rotate-180"
                            : "text-gray-500"
                        }`}
                      />
                      {event.trend === "up" ? "Rising" : event.trend === "down" ? "Falling" : "Stable"}
                    </div>
                  </div>

                  {/* Action */}
                  <Link to={`/events/${event.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
