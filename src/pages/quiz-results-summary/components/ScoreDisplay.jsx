import React from 'react';
import Icon from '../../../components/AppIcon';

const ScoreDisplay = ({ 
  score = 0, 
  totalQuestions = 0, 
  percentage = 0, 
  category = 'General Knowledge',
  difficulty = 'Medium',
  completionTime = 0
}) => {
  const getScoreColor = () => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreIcon = () => {
    if (percentage >= 80) return 'trophy';
    if (percentage >= 60) return 'medal';
    return 'target';
  };

  const getEncouragementMessage = () => {
    if (percentage >= 90) return 'Outstanding performance! 🎉';
    if (percentage >= 80) return 'Excellent work! 👏';
    if (percentage >= 70) return 'Great job! 👍';
    if (percentage >= 60) return 'Good effort! 💪';
    return 'Keep practicing! 📚';
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 text-center">
      {/* Score Icon */}
      <div className="flex justify-center mb-4">
        <div className={`w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center ${getScoreColor()}`}>
          <Icon name={getScoreIcon()} size={32} />
        </div>
      </div>

      {/* Main Score */}
      <div className="mb-4">
        <div className={`text-4xl md:text-5xl font-bold mb-2 ${getScoreColor()}`}>
          {percentage}%
        </div>
        <div className="text-lg text-muted-foreground">
          {score} out of {totalQuestions} correct
        </div>
      </div>

      {/* Encouragement Message */}
      <div className="mb-6">
        <p className="text-lg font-medium text-foreground">
          {getEncouragementMessage()}
        </p>
      </div>

      {/* Quiz Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <Icon name="folder" size={16} className="text-muted-foreground mx-auto mb-1" />
          <div className="text-sm font-medium text-foreground">{category}</div>
          <div className="text-xs text-muted-foreground">Category</div>
        </div>
        <div className="text-center">
          <Icon name="zap" size={16} className="text-muted-foreground mx-auto mb-1" />
          <div className="text-sm font-medium text-foreground">{difficulty}</div>
          <div className="text-xs text-muted-foreground">Difficulty</div>
        </div>
        <div className="text-center">
          <Icon name="clock" size={16} className="text-muted-foreground mx-auto mb-1" />
          <div className="text-sm font-medium text-foreground">{formatTime(completionTime)}</div>
          <div className="text-xs text-muted-foreground">Time Taken</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;