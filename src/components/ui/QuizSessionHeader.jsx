import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuizSessionHeader = ({ 
  quizTitle = 'Quiz Session',
  currentQuestion = 1,
  totalQuestions = 10,
  score = 0,
  timeRemaining = null,
  onExit,
  className = ''
}) => {
  const navigate = useNavigate();
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const handleExitClick = () => {
    setShowExitConfirm(true);
  };

  const handleConfirmExit = () => {
    if (onExit) {
      onExit();
    } else {
      navigate('/quiz-category-selection');
    }
  };

  const handleCancelExit = () => {
    setShowExitConfirm(false);
  };

  const formatTime = (seconds) => {
    if (!seconds) return null;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <>
      <header className={`sticky top-0 z-40 bg-card border-b border-border shadow-sm ${className}`}>
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Left Section - Quiz Info */}
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-semibold text-foreground truncate md:text-xl">
                {quizTitle}
              </h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Question {currentQuestion} of {totalQuestions}</span>
                {timeRemaining && (
                  <>
                    <span>•</span>
                    <span className={`font-mono ${timeRemaining <= 60 ? 'text-error' : ''}`}>
                      {formatTime(timeRemaining)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Center Section - Progress */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="target" size={16} className="text-muted-foreground" />
              <span className="text-sm font-mono text-foreground">{score}</span>
            </div>
          </div>

          {/* Right Section - Exit Button */}
          <div className="flex items-center space-x-2">
            <div className="md:hidden flex items-center space-x-2 text-sm">
              <Icon name="target" size={14} className="text-muted-foreground" />
              <span className="font-mono text-foreground">{score}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExitClick}
              iconName="x"
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="hidden sm:inline">Exit</span>
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-muted">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </header>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card rounded-lg shadow-lg p-6 mx-4 max-w-sm w-full animate-scale-in">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="alert-triangle" size={20} className="text-warning" />
              <h3 className="text-lg font-semibold text-foreground">Exit Quiz?</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Your progress will be lost if you exit now. Are you sure you want to continue?
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleCancelExit}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmExit}
                className="flex-1"
              >
                Exit Quiz
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizSessionHeader;