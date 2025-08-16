import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfigurationPanel = ({
  questionCount,
  onQuestionCountChange,
  difficulty,
  onDifficultyChange,
  onStartQuiz,
  isStartDisabled,
  selectedCategory,
  className = ''
}) => {
  const difficultyOptions = [
    { value: 'easy', label: 'Easy', icon: 'smile', color: 'success' },
    { value: 'medium', label: 'Medium', icon: 'meh', color: 'warning' },
    { value: 'hard', label: 'Hard', icon: 'frown', color: 'error' }
  ];

  const getDifficultyButtonClass = (option) => {
    const baseClass = "flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border transition-all duration-200";
    
    if (difficulty === option?.value) {
      switch (option?.color) {
        case 'success':
          return `${baseClass} bg-success/10 border-success text-success`;
        case 'warning':
          return `${baseClass} bg-warning/10 border-warning text-warning`;
        case 'error':
          return `${baseClass} bg-error/10 border-error text-error`;
        default:
          return `${baseClass} bg-primary/10 border-primary text-primary`;
      }
    }
    
    return `${baseClass} bg-muted border-border text-muted-foreground hover:border-primary/50 hover:text-foreground`;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 space-y-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="settings" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Quiz Configuration</h2>
      </div>
      {/* Selected Category Display */}
      {selectedCategory && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="check-circle" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              Selected: {selectedCategory?.name}
            </span>
          </div>
        </div>
      )}
      {/* Question Count Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            Number of Questions
          </label>
          <span className="text-sm font-mono bg-muted px-2 py-1 rounded text-foreground">
            {questionCount}
          </span>
        </div>
        
        <div className="space-y-2">
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={questionCount}
            onChange={(e) => onQuestionCountChange(parseInt(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5 min</span>
            <span>25 avg</span>
            <span>50 max</span>
          </div>
        </div>
      </div>
      {/* Difficulty Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          Difficulty Level
        </label>
        <div className="grid grid-cols-3 gap-2">
          {difficultyOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => onDifficultyChange(option?.value)}
              className={getDifficultyButtonClass(option)}
            >
              <Icon name={option?.icon} size={16} />
              <span className="text-sm font-medium">{option?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Estimated Time */}
      <div className="bg-muted/50 rounded-lg p-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="clock" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">Estimated Time:</span>
          </div>
          <span className="font-medium text-foreground">
            {Math.ceil(questionCount * 1.5)} - {Math.ceil(questionCount * 2)} min
          </span>
        </div>
      </div>
      {/* Start Quiz Button */}
      <Button
        onClick={onStartQuiz}
        disabled={isStartDisabled}
        variant="default"
        size="lg"
        fullWidth
        iconName="play"
        iconPosition="left"
        className="mt-6"
      >
        {isStartDisabled ? 'Select Category to Start' : 'Start Quiz'}
      </Button>
      {/* Quick Stats */}
      {selectedCategory && (
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">
              {selectedCategory?.questionCount}
            </div>
            <div className="text-xs text-muted-foreground">Available Questions</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">
              {selectedCategory?.avgTime}
            </div>
            <div className="text-xs text-muted-foreground">Avg. Completion</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigurationPanel;