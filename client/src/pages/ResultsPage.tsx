import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Share2 } from "lucide-react";
import type { QuizSession } from "../types/quiz";

export default function ResultsPage() {
  const [, setLocation] = useLocation();
  const sessionId = window.location.pathname.split("/").pop();
  const { toast } = useToast();

  const { data: session } = useQuery<QuizSession>({
    queryKey: [`/api/quiz/results/${sessionId}`],
  });

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/shared/${sessionId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Quiz Results',
          text: `Check out my quiz results: ${session?.score}`,
          url: shareUrl,
        });
      } catch (err) {
        // Fall back to clipboard if share was cancelled
        await copyToClipboard(shareUrl);
      }
    } else {
      await copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Link copied!",
        description: "Share it with your friends",
      });
    } catch (err) {
      toast({
        title: "Failed to copy link",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Your Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-primary">{session.score}</h2>
              <p className="mt-2 text-gray-600">
                Based on your responses, here's your initial assessment.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button 
                className="w-full"
                onClick={() => setLocation(`/details/${sessionId}`)}
              >
                Get Detailed Analysis
              </Button>
              <Button 
                variant="outline"
                className="w-full"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Results
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}