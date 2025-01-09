import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { Lead } from "../types/quiz";

export default function DetailsPage() {
  const [, setLocation] = useLocation();
  const sessionId = parseInt(window.location.pathname.split("/").pop() || "0");

  const { register, handleSubmit, formState: { errors } } = useForm<Lead>();

  const submitLead = useMutation({
    mutationFn: async (data: Lead) => {
      const res = await fetch("/api/leads/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, sessionId }),
      });
      return res.json();
    },
    onSuccess: () => {
      // Redirect to thank you or download page
      setLocation("/thank-you");
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Get Your Detailed Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit((data) => submitLead.mutate(data))} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">Email is required</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name (Optional)</Label>
              <Input
                id="name"
                {...register("name")}
              />
            </div>
            <Button type="submit" className="w-full">
              Get Analysis
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
