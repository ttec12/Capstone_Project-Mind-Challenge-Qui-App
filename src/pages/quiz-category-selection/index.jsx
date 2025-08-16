import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandHeader from '../../components/ui/BrandHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import CategoryGrid from './components/CategoryGrid';
import ConfigurationPanel from './components/ConfigurationPanel';
import SearchBar from './components/SearchBar';
import QuickStatsBar from './components/QuickStatsBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const QuizCategorySelection = () => {
  const navigate = useNavigate();
  
  // State management
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questionCount, setQuestionCount] = useState(15);
  const [difficulty, setDifficulty] = useState('medium');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for quiz categories
  const mockCategories = [
    {
      id: 1,
      name: 'General Knowledge',
      description: 'Test your knowledge across various topics and subjects',
      difficulty: 'Medium',
      avgTime: '12-15 min',
      questionCount: 245,
      icon: 'brain'
    },
    {
      id: 2,
      name: 'Science',
      description: 'Explore physics, chemistry, biology and earth sciences',
      difficulty: 'Hard',
      avgTime: '15-20 min',
      questionCount: 189,
      icon: 'flask-conical'
    },
    {
      id: 3,
      name: 'History',
      description: 'Journey through historical events and civilizations',
      difficulty: 'Medium',
      avgTime: '10-14 min',
      questionCount: 167,
      icon: 'scroll'
    },
    {
      id: 4,
      name: 'Entertainment',
      description: 'Movies, music, celebrities and pop culture trivia',
      difficulty: 'Easy',
      avgTime: '8-12 min',
      questionCount: 203,
      icon: 'film'
    },
    {
      id: 5,
      name: 'Sports',
      description: 'Athletic achievements, records and sporting events',
      difficulty: 'Medium',
      avgTime: '10-13 min',
      questionCount: 134,
      icon: 'trophy'
    },
    {
      id: 6,
      name: 'Geography',
      description: 'Countries, capitals, landmarks and world knowledge',
      difficulty: 'Medium',
      avgTime: '11-15 min',
      questionCount: 156,
      icon: 'globe'
    },
    {
      id: 7,
      name: 'Art',
      description: 'Famous artists, paintings, sculptures and art history',
      difficulty: 'Hard',
      avgTime: '13-17 min',
      questionCount: 98,
      icon: 'palette'
    },
    {
      id: 8,
      name: 'Literature',
      description: 'Classic and modern books, authors and literary works',
      difficulty: 'Hard',
      avgTime: '14-18 min',
      questionCount: 112,
      icon: 'book-open'
    }
  ];

  const searchSuggestions = [
    'General Knowledge', 'Science', 'History', 'Entertainment',
    'Sports', 'Geography', 'Art', 'Literature', 'Movies', 'Music'
  ];

  // Simulate API loading
  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCategories(mockCategories);
        setFilteredCategories(mockCategories);
        setError(null);
      } catch (err) {
        setError('Failed to load quiz categories. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query?.trim()) {
      setFilteredCategories(categories);
    } else {
      const filtered = categories?.filter(category =>
        category?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
        category?.description?.toLowerCase()?.includes(query?.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };

  // Category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Start quiz
  const handleStartQuiz = () => {
    if (selectedCategory) {
      // Store quiz configuration in sessionStorage for the quiz session
      const quizConfig = {
        category: selectedCategory,
        questionCount,
        difficulty,
        startTime: new Date()?.toISOString()
      };
      sessionStorage.setItem('quizConfig', JSON.stringify(quizConfig));
      navigate('/active-quiz-session');
    }
  };

  // Calculate stats
  const totalQuestions = categories?.reduce((sum, cat) => sum + cat?.questionCount, 0);
  const avgCompletionTime = '12-16 min';

  // Error retry
  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    setTimeout(() => {
      setCategories(mockCategories);
      setFilteredCategories(mockCategories);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <BrandHeader 
        showSearch={false}
        showNotifications={false}
        onSearch={() => {}}
        onNotificationClick={() => {}}
      />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Choose Your Quiz Category
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select a topic that interests you, configure your preferences, and start your learning journey
          </p>
        </div>

        {/* Quick Stats */}
        <QuickStatsBar
          totalCategories={categories?.length}
          totalQuestions={totalQuestions}
          avgCompletionTime={avgCompletionTime}
          className="mb-6"
        />

        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          suggestions={searchSuggestions}
          className="mb-6"
        />

        {/* Error State */}
        {error && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="alert-circle" size={20} className="text-error" />
              <h3 className="font-semibold text-error">Error Loading Categories</h3>
            </div>
            <p className="text-error/80 mb-3">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRetry}
              iconName="refresh-cw"
              iconPosition="left"
            >
              Try Again
            </Button>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Categories Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                Available Categories
              </h2>
              {searchQuery && (
                <span className="text-sm text-muted-foreground">
                  {filteredCategories?.length} results for "{searchQuery}"
                </span>
              )}
            </div>
            
            <CategoryGrid
              categories={filteredCategories}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
              isLoading={isLoading}
            />
          </div>

          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ConfigurationPanel
                questionCount={questionCount}
                onQuestionCountChange={setQuestionCount}
                difficulty={difficulty}
                onDifficultyChange={setDifficulty}
                onStartQuiz={handleStartQuiz}
                isStartDisabled={!selectedCategory}
                selectedCategory={selectedCategory}
              />
            </div>
          </div>
        </div>

        {/* Recent Activity (if user has quiz history) */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/quiz-history-dashboard')}
              iconName="arrow-right"
              iconPosition="right"
            >
              View All
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { category: 'Science', score: '85%', date: '2 days ago', questions: 20 },
              { category: 'History', score: '92%', date: '1 week ago', questions: 15 },
              { category: 'Geography', score: '78%', date: '2 weeks ago', questions: 25 }
            ]?.map((activity, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-foreground">{activity?.category}</h3>
                  <span className="text-sm font-mono text-primary">{activity?.score}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{activity?.questions} questions</span>
                  <span>{activity?.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      {/* Bottom Navigation */}
      <BottomTabNavigation />
      {/* Custom Styles for Slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .animate-scale-in {
          animation: scaleIn 0.2s ease-out;
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default QuizCategorySelection;