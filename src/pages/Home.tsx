import { Hero } from "@/components/Hero";
import { EventCard } from "@/components/EventCard";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { events } from "@/data/events";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const featuredEvents = events.slice(0, 4);
  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Featured Events Carousel */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-4">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Spotlight</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Featured <span className="bg-gradient-accent bg-clip-text text-transparent">Events</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't miss these handpicked events happening soon
            </p>
          </div>

          <FeaturedCarousel events={featuredEvents} />
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Coming Soon</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Upcoming <span className="bg-gradient-primary bg-clip-text text-transparent">Events</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mark your calendar for these exciting opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/events">
              <Button variant="hero" size="lg" className="group">
                View All Events
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">Campus Connect</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your one-stop platform for all campus events and activities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 hover:border-primary">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto group-hover:animate-ruffle">
                  <Calendar className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">Easy Discovery</h3>
                <p className="text-muted-foreground">
                  Browse and discover all campus events in one place with powerful filters and search
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 hover:border-secondary">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto group-hover:animate-ruffle">
                  <Users className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold">Quick Registration</h3>
                <p className="text-muted-foreground">
                  Register for events with just a few clicks and get instant confirmation
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 hover:border-accent">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto group-hover:animate-ruffle">
                  <Sparkles className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold">Stay Updated</h3>
                <p className="text-muted-foreground">
                  Get timely reminders and notifications about upcoming events you've registered for
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-2 shadow-2xl">
            <div className="bg-gradient-primary p-12 text-center space-y-6 animate-fade-in">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                Join thousands of students already using Campus Connect to discover and participate in amazing events
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Link to="/events">
                  <Button variant="accent" size="lg" className="group">
                    Browse Events
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-primary-foreground hover:bg-primary-foreground/90 border-0"
                  >
                    Register Now
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
