import { Switch, Route } from "wouter";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import DetailsPage from "./pages/DetailsPage";
import SharedResultsPage from "./pages/SharedResultsPage";

function App() {
  return (
    <Switch>
      <Route path="/" component={QuizPage} />
      <Route path="/results/:id" component={ResultsPage} />
      <Route path="/details/:id" component={DetailsPage} />
      <Route path="/shared/:id" component={SharedResultsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">404 - Page Not Found</h1>
      </div>
    </div>
  );
}

export default App;