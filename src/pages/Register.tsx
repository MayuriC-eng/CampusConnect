import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle2, Download } from "lucide-react";
import QRCode from "react-qr-code";

const registrationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  year: z.string().min(1, { message: "Please select your year" }),
  branch: z.string().min(2, { message: "Please enter your branch" }),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

export default function Register() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [qrData, setQrData] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = (data: RegistrationForm) => {
    // Generate QR code data
    const registrationData = JSON.stringify({
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      timestamp: new Date().toISOString(),
    });
    setQrData(registrationData);
    
    // Save to localStorage
    const registered = JSON.parse(localStorage.getItem("registeredEvents") || "[]");
    registered.push({
      eventId: "general",
      eventName: "Campus Event",
      registrationData: data,
      qrCode: registrationData,
      date: new Date().toISOString(),
    });
    localStorage.setItem("registeredEvents", JSON.stringify(registered));
    
    toast.success("Registration successful! Check your email for confirmation.");
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setQrData("");
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-3">
            Register for <span className="bg-gradient-primary bg-clip-text text-transparent">Events</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Fill out the form below to register for campus events
          </p>
        </div>

        {/* Registration Form */}
        <Card className="shadow-2xl border-2 animate-slide-up">
          <CardHeader>
            <CardTitle className="text-2xl">Registration Form</CardTitle>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center py-12 space-y-6 animate-fade-in">
                <CheckCircle2 className="h-20 w-20 text-primary mx-auto animate-scale-in" />
                <h2 className="text-2xl font-bold">Registration Successful!</h2>
                <p className="text-muted-foreground">
                  Show this QR code at event check-in
                </p>
                
                {/* QR Code */}
                <div className="bg-white p-6 rounded-xl inline-block">
                  <QRCode value={qrData} size={200} />
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Save this QR code for easy check-in at the event
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="mt-4"
                  >
                    Register Another Event
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    {...register("name")}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    {...register("phone")}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>

                {/* Year & Branch */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      placeholder="3rd Year"
                      {...register("year")}
                      className={errors.year ? "border-destructive" : ""}
                    />
                    {errors.year && (
                      <p className="text-sm text-destructive">{errors.year.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch</Label>
                    <Input
                      id="branch"
                      placeholder="Computer Science"
                      {...register("branch")}
                      className={errors.branch ? "border-destructive" : ""}
                    />
                    {errors.branch && (
                      <p className="text-sm text-destructive">{errors.branch.message}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                >
                  Register Now
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
