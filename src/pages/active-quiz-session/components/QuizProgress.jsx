import React from 'react';
import Icon from '../../../components/AppIcon';

const QuizProgress = ({ 
  currentQuestion, 
  totalQuestions, 
  score, 
  correctAnswers = 0,
  showScore = true,
  className = '' 
}) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  const accuracy = currentQuestion > 1 ? Math.round((correctAnswers / (currentQuestion - 1)) * 100) : 0;

  return (
    <div className={`w-full ${className}`}>
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="list-checks" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            Progress
          </span>
        </div>
        
        {showScore && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="target" size={14} className="text-primary" />
              <span className="text-sm font-semibold text-foreground">{score}</span>
              <span className="text-xs text-muted-foreground">pts</span>
            </div>
            
            {currentQuestion > 1 && (
              <div className="flex items-center space-x-1">
                <Icon name="percent" size={14} className="text-success" />
                <span className="text-sm font-semibold text-foreground">{accuracy}%</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Progress Markers */}
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">
            Question {currentQuestion}
          </span>
          <span className="text-xs text-muted-foreground">
            {totalQuestions} Total
          </span>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4 p-3 bg-muted rounded-lg">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Icon name="check-circle" size={16} className="text-success" />
          </div>
          <div className="text-lg font-semibold text-foreground">{correctAnswers}</div>
          <div className="text-xs text-muted-foreground">Correct</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Icon name="x-circle" size={16} className="text-error" />
          </div>
          <div className="text-lg font-semibold text-foreground">
            {Math.max(0, currentQuestion - 1 - correctAnswers)}
          </div>
          <div className="text-xs text-muted-foreground">Wrong</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Icon name="clock" size={16} className="text-warning" />
          </div>
          <div className="text-lg font-semibold text-foreground">
            {Math.max(0, totalQuestions - currentQuestion + 1)}
          </div>
          <div className="text-xs text-muted-foreground">Left</div>
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;