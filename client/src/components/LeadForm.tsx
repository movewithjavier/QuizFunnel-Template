import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Lead } from "../types/quiz";

interface LeadFormProps {
  quizId: number;
  onSuccess: () => void;
}

export function LeadForm({ quizId, onSuccess }: LeadFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const submitLead = useMutation({
    mutationFn: async (data: Lead) => {
      const res = await fetch("/api/leads/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, sessionId: quizId }),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to subscribe");
      }
      
      return res.json();
    },
    onSuccess: () => {
      setMessage("Thanks for subscribing! We'll send your detailed analysis shortly.");
      setIsError(false);
      onSuccess();
    },
    onError: (error) => {
      setMessage(error instanceof Error ? error.message : "Please try again");
      setIsError(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email address");
      setIsError(true);
      return;
    }
    submitLead.mutate({ email, name, sessionId: quizId });
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle>Get Your Detailed Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name (Optional)</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          {message && (
            <div className={`text-sm ${isError ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </div>
          )}
          <Button 
            type="submit" 
            className="w-full"
            disabled={submitLead.isPending}
          >
            {submitLead.isPending ? "Submitting..." : "Get Analysis"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
