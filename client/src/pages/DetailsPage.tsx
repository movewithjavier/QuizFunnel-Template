import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Skeleton } from "@/components/ui/skeleton";
import type { QuizDetails } from "../types/quiz";

interface DetailsPageProps {
  quizId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DetailsPage({ quizId, isOpen, onClose }: DetailsPageProps) {
  const { data: details, isLoading } = useQuery<QuizDetails>({
    queryKey: ["quiz", "details", quizId],
    queryFn: async () => {
      const res = await fetch(`/api/quiz/${quizId}/details`);
      return res.json();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full" />
            </>
          ) : details ? (
            <>
              <div>
                <h3 className="font-semibold mb-2">Key Insights</h3>
                <p className="text-gray-600">{details.insights}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Recommendations</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {details.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Next Steps</h3>
                <p className="text-gray-600">{details.nextSteps}</p>
              </div>
            </>
          ) : (
            <p className="text-gray-600">No details available</p>
          )}
        </CardContent>
      </Card>
    </Modal>
  );
}
