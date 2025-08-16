import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuizErrorState = ({ 
  title = 'Something went wrong',
  message = 'We encountered an error while loading your quiz. Please try again.',
  onRetry,
  onGoBack,
  showRetry = true,
  showGoBack = true,
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
      {/* Error Icon */}
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center">
          <Icon name="alert-triangle" size={32} className="text-error" />
        </div>
      </div>

      {/* Error Content */}
      <div className="space-y-3 mb-8 max-w-md">
        <h2 className="text-xl font-semibold text-foreground">
          {title}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {message}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {showRetry && (
          <Button
            variant="default"
            onClick={onRetry}
            iconName="refresh-cw"
            iconPosition="left"
            className="min-w-[140px]"
          >
            Try Again
          </Button>
        )}
        
        {showGoBack && (
          <Button
            variant="outline"
            onClick={onGoBack}
            iconName="arrow-left"
            iconPosition="left"
            className="min-w-[140px]"
          >
            Go Back
          </Button>
        )}
      </div>

      {/* Additional Help */}
      <div className="mt-8 p-4 bg-muted rounded-lg max-w-md">
        <div className="flex items-start space-x-2">
          <Icon name="info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-left">
            <h4 className="text-sm font-medium text-foreground mb-1">
              Need help?
            </h4>
            <p className="text-xs text-muted-foreground">
              Check your internet connection or contact support if the problem persists.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizErrorState;