import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizHistoryList = ({ quizHistory, onRetakeQuiz }) => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'text-success bg-success/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'hard':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'General Knowledge': 'brain',
      'Science': 'flask',
      'History': 'scroll',
      'Entertainment': 'tv',
      'Sports': 'trophy',
      'Geography': 'globe',
      'Art': 'palette',
      'Literature': 'book'
    };
    return iconMap?.[category] || 'help-circle';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const handleViewResults = (quiz) => {
    navigate('/quiz-results-summary', { state: { quizData: quiz } });
  };

  if (quizHistory?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <Icon name="clock" size={48} className="text-muted-foreground mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Quiz History</h3>
        <p className="text-muted-foreground mb-6">
          You haven't taken any quizzes yet. Start your learning journey!
        </p>
        <Button 
          variant="default" 
          onClick={() => navigate('/quiz-category-selection')}
          iconName="play-circle"
          iconPosition="left"
        >
          Take Your First Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="grid grid-cols-6 gap-4 p-4 bg-muted border-b border-border text-sm font-medium text-muted-foreground">
            <div>Category</div>
            <div>Date</div>
            <div>Difficulty</div>
            <div>Score</div>
            <div>Questions</div>
            <div>Actions</div>
          </div>
          {quizHistory?.map((quiz) => (
            <div key={quiz?.id} className="grid grid-cols-6 gap-4 p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name={getCategoryIcon(quiz?.category)} size={16} className="text-primary" />
                </div>
                <span className="font-medium text-foreground">{quiz?.category}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                {quiz?.date}
              </div>
              <div className="flex items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz?.difficulty)}`}>
                  {quiz?.difficulty}
                </span>
              </div>
              <div className="flex items-center">
                <span className={`text-lg font-bold ${getScoreColor(quiz?.score)}`}>
                  {quiz?.score}%
                </span>
              </div>
              <div className="flex items-center text-muted-foreground">
                {quiz?.correctAnswers}/{quiz?.totalQuestions}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewResults(quiz)}
                  iconName="eye"
                >
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRetakeQuiz(quiz)}
                  iconName="refresh-cw"
                >
                  Retake
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {quizHistory?.map((quiz) => (
          <div key={quiz?.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name={getCategoryIcon(quiz?.category)} size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{quiz?.category}</h3>
                  <p className="text-sm text-muted-foreground">{quiz?.date}</p>
                </div>
              </div>
              <span className={`text-xl font-bold ${getScoreColor(quiz?.score)}`}>
                {quiz?.score}%
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz?.difficulty)}`}>
                  {quiz?.difficulty}
                </span>
                <span className="text-sm text-muted-foreground">
                  {quiz?.correctAnswers}/{quiz?.totalQuestions} correct
                </span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewResults(quiz)}
                iconName="eye"
                className="flex-1"
              >
                View Results
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRetakeQuiz(quiz)}
                iconName="refresh-cw"
                className="flex-1"
              >
                Retake Quiz
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizHistoryList;