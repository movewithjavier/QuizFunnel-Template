import { Switch, Route } from "wouter";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import DetailsPage from "./pages/DetailsPage";
import StrategyPage from "./pages/StrategyPage";

function App() {
  console.log("App: Rendering App component");
  return (
    <Switch>
      <Route 
        path="/" 
        component={() => {
          console.log("App: Rendering QuizPage route");
          return <QuizPage />;
        }} 
      />
      <Route 
        path="/results/:id" 
        component={(params) => {
          console.log("App: Rendering ResultsPage route", params);
          return <ResultsPage />;
        }} 
      />
      <Route 
        path="/details/:id" 
        component={(params) => {
          console.log("App: Rendering DetailsPage route", params);
          return <DetailsPage />;
        }} 
      />
      <Route 
        path="/strategy/:id" 
        component={(params) => {
          console.log("App: Rendering StrategyPage route", params);
          return <StrategyPage />;
        }} 
      />
      <Route component={NotFound} />
    </Switch>
  );
}

function NotFound() {
  console.log("App: Rendering NotFound component");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">404 - Page Not Found</h1>
      </div>
    </div>
  );
}

export default App;