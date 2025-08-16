import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandHeader from '../../components/ui/BrandHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import PerformanceMetrics from './components/PerformanceMetrics';
import QuizHistoryList from './components/QuizHistoryList';
import FilterPanel from './components/FilterPanel';
import PerformanceChart from './components/PerformanceChart';
import SearchBar from './components/SearchBar';
import LoadingSkeleton from './components/LoadingSkeleton';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const QuizHistoryDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    sortBy: 'date-desc',
    dateFrom: '',
    dateTo: '',
    minScore: '',
    maxScore: ''
  });

  // Mock data for quiz history
  const mockQuizHistory = [
    {
      id: 1,
      category: 'General Knowledge',
      date: '08/15/2025',
      difficulty: 'Medium',
      score: 85,
      correctAnswers: 17,
      totalQuestions: 20,
      timeSpent: '5:30',
      questions: []
    },
    {
      id: 2,
      category: 'Science',
      date: '08/14/2025',
      difficulty: 'Hard',
      score: 70,
      correctAnswers: 14,
      totalQuestions: 20,
      timeSpent: '7:45',
      questions: []
    },
    {
      id: 3,
      category: 'History',
      date: '08/13/2025',
      difficulty: 'Easy',
      score: 95,
      correctAnswers: 19,
      totalQuestions: 20,
      timeSpent: '4:20',
      questions: []
    },
    {
      id: 4,
      category: 'Entertainment',
      date: '08/12/2025',
      difficulty: 'Medium',
      score: 80,
      correctAnswers: 16,
      totalQuestions: 20,
      timeSpent: '6:10',
      questions: []
    },
    {
      id: 5,
      category: 'Sports',
      date: '08/11/2025',
      difficulty: 'Hard',
      score: 65,
      correctAnswers: 13,
      totalQuestions: 20,
      timeSpent: '8:15',
      questions: []
    },
    {
      id: 6,
      category: 'Geography',
      date: '08/10/2025',
      difficulty: 'Easy',
      score: 90,
      correctAnswers: 18,
      totalQuestions: 20,
      timeSpent: '4:45',
      questions: []
    },
    {
      id: 7,
      category: 'General Knowledge',
      date: '08/09/2025',
      difficulty: 'Medium',
      score: 75,
      correctAnswers: 15,
      totalQuestions: 20,
      timeSpent: '5:55',
      questions: []
    },
    {
      id: 8,
      category: 'Science',
      date: '08/08/2025',
      difficulty: 'Easy',
      score: 88,
      correctAnswers: 17,
      totalQuestions: 20,
      timeSpent: '4:30',
      questions: []
    }
  ];

  const [quizHistory, setQuizHistory] = useState(mockQuizHistory);
  const [filteredHistory, setFilteredHistory] = useState(mockQuizHistory);

  // Performance metrics calculation
  const performanceMetrics = {
    totalQuizzes: quizHistory?.length,
    averageScore: Math.round(quizHistory?.reduce((sum, quiz) => sum + quiz?.score, 0) / quizHistory?.length),
    bestScore: Math.max(...quizHistory?.map(quiz => quiz?.score)),
    favoriteCategory: quizHistory?.reduce((acc, quiz) => {
      acc[quiz.category] = (acc?.[quiz?.category] || 0) + 1;
      return acc;
    }, {})
  };

  // Get most frequent category
  performanceMetrics.favoriteCategory = Object.keys(performanceMetrics?.favoriteCategory)?.reduce((a, b) => performanceMetrics?.favoriteCategory?.[a] > performanceMetrics?.favoriteCategory?.[b] ? a : b);

  // Chart data for performance trend
  const chartData = quizHistory?.slice(-10)?.reverse()?.map(quiz => ({
      date: quiz?.date,
      score: quiz?.score
    }));

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters and search
    let filtered = [...quizHistory];

    // Search filter
    if (searchQuery) {
      filtered = filtered?.filter(quiz => 
        quiz?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        quiz?.date?.includes(searchQuery)
      );
    }

    // Category filter
    if (filters?.category) {
      filtered = filtered?.filter(quiz => quiz?.category === filters?.category);
    }

    // Difficulty filter
    if (filters?.difficulty) {
      filtered = filtered?.filter(quiz => quiz?.difficulty?.toLowerCase() === filters?.difficulty);
    }

    // Date range filter
    if (filters?.dateFrom) {
      filtered = filtered?.filter(quiz => new Date(quiz.date) >= new Date(filters.dateFrom));
    }
    if (filters?.dateTo) {
      filtered = filtered?.filter(quiz => new Date(quiz.date) <= new Date(filters.dateTo));
    }

    // Score range filter
    if (filters?.minScore) {
      filtered = filtered?.filter(quiz => quiz?.score >= parseInt(filters?.minScore));
    }
    if (filters?.maxScore) {
      filtered = filtered?.filter(quiz => quiz?.score <= parseInt(filters?.maxScore));
    }

    // Sort
    switch (filters?.sortBy) {
      case 'date-desc':
        filtered?.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'date-asc':
        filtered?.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'score-desc':
        filtered?.sort((a, b) => b?.score - a?.score);
        break;
      case 'score-asc':
        filtered?.sort((a, b) => a?.score - b?.score);
        break;
      case 'category':
        filtered?.sort((a, b) => a?.category?.localeCompare(b?.category));
        break;
      default:
        break;
    }

    setFilteredHistory(filtered);
  }, [searchQuery, filters, quizHistory]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      difficulty: '',
      sortBy: 'date-desc',
      dateFrom: '',
      dateTo: '',
      minScore: '',
      maxScore: ''
    });
    setSearchQuery('');
  };

  const handleRetakeQuiz = (quiz) => {
    navigate('/quiz-category-selection', { 
      state: { 
        selectedCategory: quiz?.category,
        selectedDifficulty: quiz?.difficulty?.toLowerCase(),
        selectedAmount: quiz?.totalQuestions
      }
    });
  };

  const handleClearHistory = () => {
    setQuizHistory([]);
    setFilteredHistory([]);
    setShowClearConfirm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <BrandHeader />
        <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
          <LoadingSkeleton />
        </main>
        <BottomTabNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader 
        onSearch={() => {}}
        onNotificationClick={() => {}}
      />
      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Quiz History</h1>
            <p className="text-muted-foreground">
              Track your learning progress and performance over time
            </p>
          </div>
          
          {quizHistory?.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowClearConfirm(true)}
                iconName="trash-2"
                className="text-muted-foreground hover:text-error"
              >
                <span className="hidden sm:inline">Clear History</span>
              </Button>
            </div>
          )}
        </div>

        {quizHistory?.length > 0 ? (
          <>
            {/* Performance Metrics */}
            <PerformanceMetrics metrics={performanceMetrics} />

            {/* Performance Chart */}
            <PerformanceChart chartData={chartData} />

            {/* Search and Filter */}
            <SearchBar 
              onSearch={handleSearch}
              onFilterToggle={() => setShowFilterPanel(true)}
            />

            {/* Quiz History List */}
            <QuizHistoryList 
              quizHistory={filteredHistory}
              onRetakeQuiz={handleRetakeQuiz}
            />

            {/* Filter Panel */}
            <FilterPanel
              isOpen={showFilterPanel}
              onClose={() => setShowFilterPanel(false)}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </>
        ) : (
          <div className="text-center py-16">
            <div className="mb-6">
              <Icon name="clock" size={64} className="text-muted-foreground mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">No Quiz History</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              You haven't taken any quizzes yet. Start your learning journey by taking your first quiz!
            </p>
            <Button 
              variant="default" 
              size="lg"
              onClick={() => navigate('/quiz-category-selection')}
              iconName="play-circle"
              iconPosition="left"
            >
              Take Your First Quiz
            </Button>
          </div>
        )}
      </main>
      {/* Clear History Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card rounded-lg shadow-lg p-6 mx-4 max-w-sm w-full animate-scale-in">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="alert-triangle" size={20} className="text-warning" />
              <h3 className="text-lg font-semibold text-foreground">Clear All History?</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              This action cannot be undone. All your quiz history and performance data will be permanently deleted.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowClearConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleClearHistory}
                className="flex-1"
              >
                Clear History
              </Button>
            </div>
          </div>
        </div>
      )}
      <BottomTabNavigation />
    </div>
  );
};

export default QuizHistoryDashboard;