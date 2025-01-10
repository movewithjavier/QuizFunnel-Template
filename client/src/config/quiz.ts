import { QuizConfig } from "../types/quiz";

export const quizConfig: QuizConfig = {
  title: "Assessment Title",
  description: "Take this quick assessment to discover your results",
  questions: [
    {
      id: "q1",
      type: "multiple-choice",
      text: "What is your primary goal?",
      options: [
        { value: "growth", label: "Business Growth" },
        { value: "efficiency", label: "Improve Efficiency" },
        { value: "innovation", label: "Drive Innovation" }
      ]
    },
    {
      id: "q2",
      type: "slider",
      text: "How comfortable are you with taking risks?",
      min: 0,
      max: 10,
      step: 1,
      minLabel: "Very Conservative",
      maxLabel: "High Risk Tolerance",
      defaultValue: 5
    },
    {
      id: "q3",
      type: "multiple-choice",
      text: "What is your current challenge?",
      options: [
        { value: "time", label: "Time Management" },
        { value: "resources", label: "Resource Allocation" },
        { value: "strategy", label: "Strategic Planning" }
      ]
    },
    {
      id: "q4",
      type: "slider",
      text: "How would you rate your team's current productivity?",
      min: 1,
      max: 5,
      step: 0.5,
      minLabel: "Needs Improvement",
      maxLabel: "Highly Productive",
      defaultValue: 3
    },
    {
      id: "q5",
      type: "slider",
      text: "What percentage of your processes are currently automated?",
      min: 0,
      max: 100,
      step: 5,
      minLabel: "0% (All Manual)",
      maxLabel: "100% (Fully Automated)",
      defaultValue: 50
    }
  ],
  results: {
    title: "Your Assessment Results",
    description: "Based on your responses, here's our analysis of your situation",
    scoreInterpretations: {
      "Growth Oriented": {
        title: "Growth-Focused Leader",
        description: "You demonstrate a strong inclination towards business expansion and scaling operations.",
        summary: "Based on your responses, you're focused on scaling and expanding your business. Here's your personalized growth strategy.",
        recommendations: [
          "Focus on scalable systems",
          "Invest in market research",
          "Build strategic partnerships",
          "Develop expansion roadmap"
        ]
      },
      "Efficiency Focused": {
        title: "Efficiency-Focused Leader",
        description: "You prioritize operational excellence and process optimization.",
        summary: "Your responses indicate a strong focus on optimizing operations and improving efficiency. Here's your tailored strategy.",
        recommendations: [
          "Implement automation tools",
          "Streamline workflows",
          "Optimize resource allocation",
          "Establish clear KPIs"
        ]
      }
    }
  },
  strategy: {
    sections: {
      "Growth Oriented": {
        title: "Your Growth Strategy Blueprint",
        description: "A comprehensive plan to accelerate your business growth",
        keyPoints: [
          "Market Expansion Opportunities",
          "Scalable Systems Implementation",
          "Team Growth and Development",
          "Investment and Funding Strategies"
        ],
        recommendations: [
          "Focus on building scalable systems that can handle 10x your current capacity",
          "Invest in automation to reduce manual operational overhead",
          "Develop a clear market expansion roadmap",
          "Build strategic partnerships to accelerate growth"
        ],
        nextSteps: [
          "Schedule a strategy session with your leadership team",
          "Identify top 3 growth opportunities",
          "Create 90-day action plan",
          "Set up monthly review checkpoints"
        ]
      },
      "Efficiency Focused": {
        title: "Your Efficiency Optimization Plan",
        description: "A structured approach to maximize operational efficiency",
        keyPoints: [
          "Process Optimization",
          "Resource Allocation",
          "Automation Opportunities",
          "Cost Management"
        ],
        recommendations: [
          "Implement workflow automation for repetitive tasks",
          "Optimize resource allocation across departments",
          "Streamline communication channels",
          "Establish clear KPIs for measuring efficiency gains"
        ],
        nextSteps: [
          "Conduct process audit",
          "Identify automation opportunities",
          "Create resource optimization plan",
          "Set up efficiency metrics dashboard"
        ]
      }
    }
  }
};
