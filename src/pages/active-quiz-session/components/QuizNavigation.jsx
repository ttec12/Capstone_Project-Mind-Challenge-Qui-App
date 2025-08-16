import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuizNavigation = ({ 
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  showResult,
  isLoading = false,
  onNext,
  onPrevious,
  onSubmit,
  canGoBack = false,
  className = '' 
}) => {
  const isLastQuestion = currentQuestion === totalQuestions;
  const canProceed = selectedAnswer !== null;

  const handleNext = () => {
    if (showResult && onNext) {
      onNext();
    } else if (canProceed && onSubmit) {
      onSubmit();
    }
  };

  const getNextButtonText = () => {
    if (isLoading) return 'Loading...';
    if (!showResult && canProceed) return 'Submit Answer';
    if (showResult && isLastQuestion) return 'Finish Quiz';
    if (showResult) return 'Next Question';
    return 'Select Answer';
  };

  const getNextButtonVariant = () => {
    if (!canProceed && !showResult) return 'outline';
    if (isLastQuestion && showResult) return 'success';
    return 'default';
  };

  return (
    <div className={`flex items-center justify-between w-full ${className}`}>
      {/* Previous Button */}
      <div className="flex-1">
        {canGoBack && currentQuestion > 1 && (
          <Button
            variant="ghost"
            onClick={onPrevious}
            disabled={isLoading}
            iconName="chevron-left"
            iconPosition="left"
            className="text-muted-foreground hover:text-foreground"
          >
            Previous
          </Button>
        )}
      </div>

      {/* Question Counter */}
      <div className="flex items-center space-x-2 px-4">
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Icon name="layers" size={14} />
          <span>{currentQuestion}</span>
          <span>/</span>
          <span>{totalQuestions}</span>
        </div>
      </div>

      {/* Next/Submit Button */}
      <div className="flex-1 flex justify-end">
        <Button
          variant={getNextButtonVariant()}
          onClick={handleNext}
          disabled={(!canProceed && !showResult) || isLoading}
          loading={isLoading}
          iconName={
            isLoading 
              ? undefined 
              : isLastQuestion && showResult 
              ? 'flag' :'chevron-right'
          }
          iconPosition="right"
          className="min-w-[120px]"
        >
          {getNextButtonText()}
        </Button>
      </div>
    </div>
  );
};

export default QuizNavigation;