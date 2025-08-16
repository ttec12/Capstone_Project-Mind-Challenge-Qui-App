import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import QuizResultsSummary from './pages/quiz-results-summary';
import UserProfileSettings from './pages/user-profile-settings';
import ActiveQuizSession from './pages/active-quiz-session';
import QuizCategorySelection from './pages/quiz-category-selection';
import QuizHistoryDashboard from './pages/quiz-history-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ActiveQuizSession />} />
        <Route path="/quiz-results-summary" element={<QuizResultsSummary />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="/active-quiz-session" element={<ActiveQuizSession />} />
        <Route path="/quiz-category-selection" element={<QuizCategorySelection />} />
        <Route path="/quiz-history-dashboard" element={<QuizHistoryDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
