import { Event } from "@/components/EventCard";
import aiWorkshopImg from "@/assets/event-ai-workshop.jpg";
import hackathonImg from "@/assets/event-hackathon.jpg";
import culturalImg from "@/assets/event-cultural.jpg";
import sportsImg from "@/assets/event-sports.jpg";
import webdevImg from "@/assets/event-webdev.jpg";
import startupImg from "@/assets/event-startup.jpg";

export const events: Event[] = [
  {
    id: "1",
    title: "AI & Machine Learning Bootcamp",
    description: "Join us for an intensive 3-day workshop on AI fundamentals, neural networks, and practical ML applications.",
    date: "March 15-17, 2024",
    time: "9:00 AM - 5:00 PM",
    venue: "Computer Science Lab, Block A",
    category: "Technical",
    image: aiWorkshopImg,
    attendees: 145,
  },
  {
    id: "2",
    title: "Annual Tech Fest - CodeSprint",
    description: "48-hour hackathon with exciting prizes and mentorship from industry experts. Build, innovate, and win!",
    date: "March 22-24, 2024",
    time: "10:00 AM (Day 1)",
    venue: "Main Auditorium",
    category: "Technical",
    image: hackathonImg,
    attendees: 230,
  },
  {
    id: "3",
    title: "Cultural Night 2024",
    description: "Celebrate diversity with music, dance, drama, and cultural performances from students across the campus.",
    date: "March 28, 2024",
    time: "6:00 PM - 10:00 PM",
    venue: "Open Air Theatre",
    category: "Cultural",
    image: culturalImg,
    attendees: 520,
  },
  {
    id: "4",
    title: "Inter-College Cricket Tournament",
    description: "Annual cricket championship featuring teams from top colleges. Witness thrilling matches and sportsmanship!",
    date: "April 5-8, 2024",
    time: "8:00 AM - 6:00 PM",
    venue: "Sports Complex Ground",
    category: "Sports",
    image: sportsImg,
    attendees: 89,
  },
  {
    id: "5",
    title: "Web Development Workshop",
    description: "Learn modern web development with React, Node.js, and cloud deployment. Hands-on project included.",
    date: "April 12-14, 2024",
    time: "2:00 PM - 6:00 PM",
    venue: "IT Lab 3, Block C",
    category: "Workshop",
    image: webdevImg,
    attendees: 98,
  },
  {
    id: "6",
    title: "Startup Pitch Competition",
    description: "Present your startup ideas to a panel of investors and entrepreneurs. Win funding and mentorship!",
    date: "April 18, 2024",
    time: "11:00 AM - 4:00 PM",
    venue: "Innovation Hub",
    category: "Technical",
    image: startupImg,
    attendees: 67,
  },
];
