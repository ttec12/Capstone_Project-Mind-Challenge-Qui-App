import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BrandHeader from '../../components/ui/BrandHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ScoreDisplay from './components/ScoreDisplay';
import ResultsBreakdown from './components/ResultsBreakdown';
import PerformanceMetrics from './components/PerformanceMetrics';
import SocialSharing from './components/SocialSharing';
import ActionPanel from './components/ActionPanel';

const QuizResultsSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Mock quiz results data - in real app this would come from location.state or API
  const mockQuizResults = {
    score: 17,
    totalQuestions: 20,
    percentage: 85,
    category: 'Science & Nature',
    difficulty: 'Medium',
    completionTime: 420, // 7 minutes in seconds
    questions: [
      {
        question: "What is the chemical symbol for gold?",
        correct_answer: "Au",
        incorrect_answers: ["Go", "Gd", "Ag"],
        explanation: "Gold\'s chemical symbol Au comes from the Latin word \'aurum\' meaning gold."
      },
      {
        question: "Which planet is known as the Red Planet?",
        correct_answer: "Mars",
        incorrect_answers: ["Venus", "Jupiter", "Saturn"],
        explanation: "Mars appears red due to iron oxide (rust) on its surface."
      },
      {
        question: "What is the largest mammal in the world?",
        correct_answer: "Blue Whale",
        incorrect_answers: ["African Elephant", "Sperm Whale", "Giraffe"],
        explanation: "Blue whales can reach lengths of up to 100 feet and weigh up to 200 tons."
      },
      {
        question: "How many chambers does a human heart have?",
        correct_answer: "Four",
        incorrect_answers: ["Two", "Three", "Five"],
        explanation: "The human heart has four chambers: two atria and two ventricles."
      },
      {
        question: "What gas do plants absorb from the atmosphere during photosynthesis?",
        correct_answer: "Carbon Dioxide",
        incorrect_answers: ["Oxygen", "Nitrogen", "Hydrogen"],
        explanation: "Plants absorb CO2 and convert it to oxygen and glucose during photosynthesis."
      },
      {
        question: "What is the hardest natural substance on Earth?",
        correct_answer: "Diamond",
        incorrect_answers: ["Quartz", "Steel", "Granite"],
        explanation: "Diamond rates 10 on the Mohs hardness scale, making it the hardest natural material."
      },
      {
        question: "Which blood type is known as the universal donor?",
        correct_answer: "O-",
        incorrect_answers: ["AB+", "A+", "B-"],
        explanation: "O- blood can be given to people with any blood type in emergency situations."
      },
      {
        question: "What is the speed of light in a vacuum?",
        correct_answer: "299,792,458 m/s",
        incorrect_answers: ["300,000,000 m/s", "299,000,000 m/s", "298,792,458 m/s"],
        explanation: "The speed of light in vacuum is exactly 299,792,458 meters per second."
      },
      {
        question: "Which organ in the human body produces insulin?",
        correct_answer: "Pancreas",
        incorrect_answers: ["Liver", "Kidney", "Stomach"],
        explanation: "The pancreas produces insulin to regulate blood sugar levels."
      },
      {
        question: "What is the most abundant gas in Earth\'s atmosphere?",
        correct_answer: "Nitrogen",
        incorrect_answers: ["Oxygen", "Carbon Dioxide", "Argon"],
        explanation: "Nitrogen makes up about 78% of Earth\'s atmosphere."
      },
      {
        question: "How many bones are in an adult human body?",
        correct_answer: "206",
        incorrect_answers: ["195", "215", "180"],
        explanation: "Adults have 206 bones, while babies are born with about 270 bones."
      },
      {
        question: "What is the smallest unit of matter?",
        correct_answer: "Atom",
        incorrect_answers: ["Molecule", "Cell", "Electron"],
        explanation: "Atoms are the basic building blocks of all matter."
      },
      {
        question: "Which scientist developed the theory of evolution?",
        correct_answer: "Charles Darwin",
        incorrect_answers: ["Albert Einstein", "Isaac Newton", "Gregor Mendel"],
        explanation: "Charles Darwin proposed the theory of evolution by natural selection."
      },
      {
        question: "What is the pH level of pure water?",
        correct_answer: "7",
        incorrect_answers: ["6", "8", "0"],
        explanation: "Pure water has a neutral pH of 7 on the pH scale."
      },
      {
        question: "Which part of the brain controls balance and coordination?",
        correct_answer: "Cerebellum",
        incorrect_answers: ["Cerebrum", "Brain stem", "Hippocampus"],
        explanation: "The cerebellum is responsible for balance, coordination, and motor control."
      },
      {
        question: "What is the chemical formula for water?",
        correct_answer: "H2O",
        incorrect_answers: ["H2O2", "HO2", "H3O"],
        explanation: "Water consists of two hydrogen atoms and one oxygen atom."
      },
      {
        question: "Which vitamin is produced when skin is exposed to sunlight?",
        correct_answer: "Vitamin D",
        incorrect_answers: ["Vitamin C", "Vitamin A", "Vitamin B12"],
        explanation: "The skin produces Vitamin D when exposed to UVB radiation from sunlight."
      },
      {
        question: "What is the largest organ in the human body?",
        correct_answer: "Skin",
        incorrect_answers: ["Liver", "Brain", "Lungs"],
        explanation: "The skin is the largest organ, covering the entire body surface."
      },
      {
        question: "How many chromosomes do humans have?",
        correct_answer: "46",
        incorrect_answers: ["44", "48", "42"],
        explanation: "Humans have 46 chromosomes arranged in 23 pairs."
      },
      {
        question: "What force keeps planets in orbit around the sun?",
        correct_answer: "Gravity",
        incorrect_answers: ["Magnetism", "Centrifugal force", "Nuclear force"],
        explanation: "Gravitational force between the sun and planets keeps them in orbital motion."
      }
    ],
    userAnswers: [
      "Au", "Mars", "Blue Whale", "Four", "Carbon Dioxide", 
      "Diamond", "O-", "299,792,458 m/s", "Pancreas", "Nitrogen",
      "206", "Atom", "Charles Darwin", "7", "Cerebellum",
      "H2O", "Vitamin D", "Skin", "Go", "Gravity" // Note: one wrong answer (Go instead of 46)
    ]
  };

  // Mock previous attempts for performance metrics
  const mockPreviousAttempts = [
    { score: 75, date: '2025-01-10', category: 'Science & Nature', difficulty: 'Medium' },
    { score: 80, date: '2025-01-08', category: 'Science & Nature', difficulty: 'Medium' },
    { score: 70, date: '2025-01-05', category: 'Science & Nature', difficulty: 'Easy' },
    { score: 85, date: '2025-01-03', category: 'General Knowledge', difficulty: 'Medium' }
  ];

  // Get quiz results from location state or use mock data
  const quizResults = location?.state?.quizResults || mockQuizResults;
  const previousAttempts = location?.state?.previousAttempts || mockPreviousAttempts;

  useEffect(() => {
    // If no quiz results are available, redirect to category selection
    if (!location?.state?.quizResults && !mockQuizResults) {
      navigate('/quiz-category-selection');
    }
  }, [location?.state, navigate]);

  const handleRetakeQuiz = () => {
    navigate('/active-quiz-session', {
      state: {
        category: quizResults?.category,
        difficulty: quizResults?.difficulty,
        questionCount: quizResults?.totalQuestions,
        retake: true
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader onSearch={() => {}} onNotificationClick={() => {}} />
      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        {/* Mobile: Single Column Layout */}
        <div className="md:hidden space-y-6">
          {/* Score Display */}
          <ScoreDisplay
            score={quizResults?.score}
            totalQuestions={quizResults?.totalQuestions}
            percentage={quizResults?.percentage}
            category={quizResults?.category}
            difficulty={quizResults?.difficulty}
            completionTime={quizResults?.completionTime}
          />

          {/* Performance Metrics */}
          <PerformanceMetrics
            currentScore={quizResults?.percentage}
            previousAttempts={previousAttempts}
            category={quizResults?.category}
            difficulty={quizResults?.difficulty}
          />

          {/* Results Breakdown Toggle */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium transition-colors duration-200 hover:bg-primary/90"
            >
              <span>{showBreakdown ? 'Hide' : 'Show'} Question Breakdown</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${showBreakdown ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Collapsible Results Breakdown */}
          {showBreakdown && (
            <ResultsBreakdown
              questions={quizResults?.questions}
              userAnswers={quizResults?.userAnswers}
            />
          )}

          {/* Social Sharing */}
          <SocialSharing
            score={quizResults?.score}
            totalQuestions={quizResults?.totalQuestions}
            category={quizResults?.category}
            difficulty={quizResults?.difficulty}
          />

          {/* Action Panel */}
          <ActionPanel
            category={quizResults?.category}
            difficulty={quizResults?.difficulty}
            questionCount={quizResults?.totalQuestions}
            onRetakeQuiz={handleRetakeQuiz}
          />
        </div>

        {/* Desktop: Two Column Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Summary & Metrics */}
            <div className="lg:col-span-1 space-y-6">
              <ScoreDisplay
                score={quizResults?.score}
                totalQuestions={quizResults?.totalQuestions}
                percentage={quizResults?.percentage}
                category={quizResults?.category}
                difficulty={quizResults?.difficulty}
                completionTime={quizResults?.completionTime}
              />

              <PerformanceMetrics
                currentScore={quizResults?.percentage}
                previousAttempts={previousAttempts}
                category={quizResults?.category}
                difficulty={quizResults?.difficulty}
              />

              <SocialSharing
                score={quizResults?.score}
                totalQuestions={quizResults?.totalQuestions}
                category={quizResults?.category}
                difficulty={quizResults?.difficulty}
              />

              <ActionPanel
                category={quizResults?.category}
                difficulty={quizResults?.difficulty}
                questionCount={quizResults?.totalQuestions}
                onRetakeQuiz={handleRetakeQuiz}
              />
            </div>

            {/* Right Column - Detailed Breakdown */}
            <div className="lg:col-span-2">
              <ResultsBreakdown
                questions={quizResults?.questions}
                userAnswers={quizResults?.userAnswers}
              />
            </div>
          </div>
        </div>
      </main>
      <BottomTabNavigation />
    </div>
  );
};

export default QuizResultsSummary;