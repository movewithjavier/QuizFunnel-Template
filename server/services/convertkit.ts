import { config } from "../config";

interface ConvertKitSubscriber {
  email: string;
  name?: string;
  quizId: string;
  score: string;
}

export async function subscribeToConvertKit(subscriber: ConvertKitSubscriber) {
  const { apiSecret, formId } = config.convertkit;

  if (!apiSecret || !formId) {
    throw new Error('ConvertKit configuration missing. Please set CONVERTKIT_API_SECRET and CONVERTKIT_FORM_ID in your Replit secrets.');
  }

  const apiUrl = `https://api.convertkit.com/v3/forms/${formId}/subscribe`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_secret: apiSecret,
      email: subscriber.email,
      first_name: subscriber.name,
      fields: {
        quiz_score: subscriber.score,
        quiz_id: subscriber.quizId,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`ConvertKit API error: ${JSON.stringify(error)}`);
  }

  return response.json();
}
