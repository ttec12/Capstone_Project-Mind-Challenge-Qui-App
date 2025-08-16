import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import QuizSessionHeader from '../../components/ui/QuizSessionHeader';
import QuizQuestion from './components/QuizQuestion';
import QuizTimer from './components/QuizTimer';
import QuizProgress from './components/QuizProgress';
import QuizNavigation from './components/QuizNavigation';
import QuizLoadingState from './components/QuizLoadingState';
import QuizErrorState from './components/QuizErrorState';

const ActiveQuizSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Quiz state from navigation or default
  const quizConfig = location?.state || {
    category: 'General Knowledge',
    difficulty: 'medium',
    questionCount: 10,
    timePerQuestion: 30
  };

  // Mock quiz data
  const mockQuizData = [
    {
      id: 1,
      category: "General Knowledge",
      difficulty: "medium",
      question: "What is the capital city of Australia?",
      correct_answer: "Canberra",
      incorrect_answers: ["Sydney", "Melbourne", "Perth"],
      explanation: "Canberra is the capital city of Australia, located in the Australian Capital Territory."
    },
    {
      id: 2,
      category: "Science",
      difficulty: "medium", 
      question: "What is the chemical symbol for gold?",
      correct_answer: "Au",
      incorrect_answers: ["Go", "Gd", "Ag"],
      explanation: "The chemical symbol for gold is Au, derived from the Latin word 'aurum' meaning gold."
    },
    {
      id: 3,
      category: "History",
      difficulty: "medium",
      question: "In which year did World War II end?",
      correct_answer: "1945",
      incorrect_answers: ["1944", "1946", "1943"],
      explanation: "World War II ended in 1945 with the surrender of Japan in September following the atomic bombings."
    },
    {
      id: 4,
      category: "Geography",
      difficulty: "medium",
      question: "Which is the longest river in the world?",
      correct_answer: "Nile River",
      incorrect_answers: ["Amazon River", "Mississippi River", "Yangtze River"],
      explanation: "The Nile River in Africa is considered the longest river in the world at approximately 6,650 kilometers."
    },
    {
      id: 5,
      category: "Science",
      difficulty: "medium",
      question: "What planet is known as the Red Planet?",
      correct_answer: "Mars",
      incorrect_answers: ["Venus", "Jupiter", "Saturn"],
      explanation: "Mars is called the Red Planet due to iron oxide (rust) on its surface giving it a reddish appearance."
    },
    {
      id: 6,
      category: "Literature",
      difficulty: "medium",
      question: "Who wrote the novel \'1984\'?",
      correct_answer: "George Orwell",
      incorrect_answers: ["Aldous Huxley", "Ray Bradbury", "H.G. Wells"],
      explanation: "George Orwell wrote the dystopian novel '1984', published in 1949."
    },
    {
      id: 7,
      category: "Mathematics",
      difficulty: "medium",
      question: "What is the value of π (pi) to two decimal places?",
      correct_answer: "3.14",
      incorrect_answers: ["3.16", "3.12", "3.18"],
      explanation: "Pi (π) is approximately 3.14159, which rounds to 3.14 when expressed to two decimal places."
    },
    {
      id: 8,
      category: "Sports",
      difficulty: "medium",
      question: "How many players are on a basketball team on the court at one time?",
      correct_answer: "5",
      incorrect_answers: ["6", "4", "7"],
      explanation: "In basketball, each team has 5 players on the court at any given time during play."
    },
    {
      id: 9,
      category: "Art",
      difficulty: "medium",
      question: "Who painted the famous artwork \'The Starry Night\'?",
      correct_answer: "Vincent van Gogh",
      incorrect_answers: ["Pablo Picasso", "Claude Monet", "Leonardo da Vinci"],
      explanation: "Vincent van Gogh painted 'The Starry Night' in 1889 while he was a patient at an asylum in France."
    },
    {
      id: 10,
      category: "Technology",
      difficulty: "medium",
      question: "What does 'HTTP' stand for?",
      correct_answer: "HyperText Transfer Protocol",
      incorrect_answers: ["HyperText Transmission Protocol", "High Transfer Text Protocol", "HyperLink Transfer Protocol"],
      explanation: "HTTP stands for HyperText Transfer Protocol, which is the foundation of data communication on the World Wide Web."
    }
  ];

  // Component state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quizConfig?.timePerQuestion);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  // Get current question data
  const currentQuestion = mockQuizData?.[currentQuestionIndex];
  const totalQuestions = Math.min(quizConfig?.questionCount, mockQuizData?.length);
  
  // Prepare question with shuffled answers
  const prepareQuestion = (questionData) => {
    if (!questionData) return null;
    
    const answers = [...questionData?.incorrect_answers, questionData?.correct_answer];
    // Shuffle answers
    for (let i = answers?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers?.[j], answers?.[i]];
    }
    
    return {
      ...questionData,
      answers
    };
  };

  const preparedQuestion = prepareQuestion(currentQuestion);

  // Initialize quiz
  useEffect(() => {
    setQuizStarted(true);
    setTimeLeft(quizConfig?.timePerQuestion);
  }, [quizConfig?.timePerQuestion]);

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  // Handle answer submission
  const handleSubmitAnswer = () => {
    if (!selectedAnswer || showResult) return;
    
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const isCorrect = selectedAnswer === currentQuestion?.correct_answer;
      
      if (isCorrect) {
        setScore(prev => prev + 10);
        setCorrectAnswers(prev => prev + 1);
      }
      
      setShowResult(true);
      setIsLoading(false);
    }, 500);
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setIsLoading(true);
      
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(quizConfig?.timePerQuestion);
        setIsLoading(false);
      }, 300);
    } else {
      // Quiz completed
      handleQuizComplete();
    }
  };

  // Handle quiz completion
  const handleQuizComplete = () => {
    const quizResults = {
      score,
      correctAnswers,
      totalQuestions,
      category: quizConfig?.category,
      difficulty: quizConfig?.difficulty,
      completedAt: new Date()?.toISOString(),
      timePerQuestion: quizConfig?.timePerQuestion
    };
    
    navigate('/quiz-results-summary', { state: quizResults });
  };

  // Handle time up
  const handleTimeUp = () => {
    if (!showResult && !selectedAnswer) {
      // Auto-submit with no answer
      setSelectedAnswer('');
      setTimeout(() => {
        setShowResult(true);
      }, 100);
    }
  };

  // Handle quiz exit
  const handleQuizExit = () => {
    navigate('/quiz-category-selection');
  };

  // Handle retry on error
  const handleRetry = () => {
    setError(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCorrectAnswers(0);
    setTimeLeft(quizConfig?.timePerQuestion);
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <QuizSessionHeader
          quizTitle={quizConfig?.category}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          score={score}
          onExit={handleQuizExit}
        />
        <div className="container mx-auto px-4 py-8">
          <QuizErrorState
            title="Quiz Loading Error"
            message="We couldn't load the quiz questions. Please check your connection and try again."
            onRetry={handleRetry}
            onGoBack={handleQuizExit}
          />
        </div>
      </div>
    );
  }

  // Loading state for question transition
  if (isLoading && !showResult) {
    return (
      <div className="min-h-screen bg-background">
        <QuizSessionHeader
          quizTitle={quizConfig?.category}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          score={score}
          onExit={handleQuizExit}
        />
        <div className="container mx-auto px-4 py-8">
          <QuizLoadingState 
            message={currentQuestionIndex === 0 ? "Starting your quiz..." : "Loading next question..."}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Quiz Header */}
      <QuizSessionHeader
        quizTitle={quizConfig?.category}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        score={score}
        timeRemaining={timeLeft}
        onExit={handleQuizExit}
      />
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Progress & Timer */}
          <div className="lg:col-span-1 space-y-6">
            <QuizProgress
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
              score={score}
              correctAnswers={correctAnswers}
              className="bg-card rounded-lg p-4 border border-border"
            />
            
            <QuizTimer
              initialTime={quizConfig?.timePerQuestion}
              onTimeUp={handleTimeUp}
              isActive={!showResult && quizStarted}
              className="bg-card rounded-lg p-4 border border-border"
            />
          </div>

          {/* Main Content - Question */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg border border-border p-6 md:p-8">
              {preparedQuestion ? (
                <QuizQuestion
                  question={preparedQuestion}
                  currentQuestion={currentQuestionIndex + 1}
                  totalQuestions={totalQuestions}
                  selectedAnswer={selectedAnswer}
                  onAnswerSelect={handleAnswerSelect}
                  showResult={showResult}
                  correctAnswer={currentQuestion?.correct_answer}
                  explanation={currentQuestion?.explanation}
                />
              ) : (
                <QuizLoadingState message="Preparing question..." />
              )}
            </div>

            {/* Navigation */}
            <div className="mt-6 bg-card rounded-lg border border-border p-4">
              <QuizNavigation
                currentQuestion={currentQuestionIndex + 1}
                totalQuestions={totalQuestions}
                selectedAnswer={selectedAnswer}
                showResult={showResult}
                isLoading={isLoading}
                onNext={handleNextQuestion}
                onSubmit={handleSubmitAnswer}
                onPrevious={() => {}}
                canGoBack={false}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Bottom Spacing */}
      <div className="h-20 md:hidden"></div>
    </div>
  );
};

export default ActiveQuizSession;