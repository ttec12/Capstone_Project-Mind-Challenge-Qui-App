import React from 'react';
import Icon from '../../../components/AppIcon';

const QuizLoadingState = ({ 
  message = 'Loading next question...', 
  showProgress = true,
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      {/* Loading Icon */}
      <div className="relative mb-6">
        <div className="w-16 h-16 border-4 border-muted rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name="brain" size={24} className="text-primary" />
        </div>
      </div>

      {/* Loading Message */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-foreground">
          {message}
        </h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Please wait while we prepare your next challenge
        </p>
      </div>

      {/* Progress Dots */}
      {showProgress && (
        <div className="flex items-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-primary via-transparent to-secondary"></div>
      </div>
    </div>
  );
};

export default QuizLoadingState;