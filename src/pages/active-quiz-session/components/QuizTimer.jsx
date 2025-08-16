import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const QuizTimer = ({ 
  initialTime = 30, 
  onTimeUp, 
  isActive = true, 
  showWarning = true,
  className = '' 
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    setTimeLeft(initialTime);
    setIsWarning(false);
  }, [initialTime]);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        
        // Show warning when 10 seconds or less remain
        if (showWarning && newTime <= 10 && newTime > 0) {
          setIsWarning(true);
        }
        
        // Time's up
        if (newTime <= 0) {
          setIsWarning(false);
          if (onTimeUp) {
            onTimeUp();
          }
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, onTimeUp, showWarning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  const getTimerClasses = () => {
    let baseClasses = "flex items-center space-x-2 px-3 py-2 rounded-lg font-mono font-semibold transition-all duration-200";
    
    if (timeLeft <= 0) {
      return `${baseClasses} bg-error/10 text-error border border-error`;
    } else if (isWarning) {
      return `${baseClasses} bg-warning/10 text-warning border border-warning animate-pulse`;
    } else {
      return `${baseClasses} bg-muted text-foreground border border-border`;
    }
  };

  const getIconName = () => {
    if (timeLeft <= 0) return 'clock-x';
    if (isWarning) return 'clock-alert';
    return 'clock';
  };

  const getProgressPercentage = () => {
    return (timeLeft / initialTime) * 100;
  };

  return (
    <div className={`${className}`}>
      <div className={getTimerClasses()}>
        <Icon 
          name={getIconName()} 
          size={16} 
          className={isWarning ? 'animate-bounce' : ''} 
        />
        <span className="text-sm">
          {formatTime(timeLeft)}
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-2 w-full h-1 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ease-linear ${
            isWarning ? 'bg-warning' : timeLeft <= 0 ? 'bg-error' : 'bg-primary'
          }`}
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>
      
      {/* Time Status Messages */}
      {timeLeft <= 0 && (
        <div className="mt-2 text-center">
          <span className="text-sm text-error font-medium">Time's up!</span>
        </div>
      )}
      
      {isWarning && timeLeft > 0 && (
        <div className="mt-2 text-center">
          <span className="text-sm text-warning font-medium">Hurry up!</span>
        </div>
      )}
    </div>
  );
};

export default QuizTimer;