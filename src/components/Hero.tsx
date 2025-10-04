import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Rocket } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Rocket className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Your Campus Event Hub</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Discover Events,
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Workshops & Contests
                </span>
                <br />
                on Campus!
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
                Never miss out on exciting campus events. Discover, register, and participate in workshops, contests, and cultural activities all in one place.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/events">
                <Button variant="hero" size="lg" className="group">
                  View Events
                  <Calendar className="ml-2 h-5 w-5 group-hover:animate-ruffle" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg" className="group">
                  Register Now
                  <Users className="ml-2 h-5 w-5 group-hover:animate-ruffle" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-border">
              <div>
                <p className="text-3xl font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground">Active Events</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary">2000+</p>
                <p className="text-sm text-muted-foreground">Students Registered</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">10+</p>
                <p className="text-sm text-muted-foreground">Categories</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-up lg:animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-glow transition-all duration-500 hover:scale-105">
              <img
                src={heroBanner}
                alt="Students at campus events"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-xl shadow-lg border border-border animate-float">
              <p className="text-sm font-medium">🎉 New Workshop</p>
              <p className="text-xs text-muted-foreground">AI & ML Bootcamp</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-card p-4 rounded-xl shadow-lg border border-border animate-float" style={{ animationDelay: "1.5s" }}>
              <p className="text-sm font-medium">🏆 Hackathon</p>
              <p className="text-xs text-muted-foreground">Code Sprint 2024</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
