import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionPanel = ({ 
  category = 'General Knowledge',
  difficulty = 'Medium',
  questionCount = 10,
  onRetakeQuiz,
  className = ''
}) => {
  const navigate = useNavigate();

  const handleRetakeQuiz = () => {
    if (onRetakeQuiz) {
      onRetakeQuiz();
    } else {
      // Navigate to active quiz with same parameters
      navigate('/active-quiz-session', { 
        state: { 
          category, 
          difficulty, 
          questionCount,
          retake: true 
        } 
      });
    }
  };

  const handleTryDifferentCategory = () => {
    navigate('/quiz-category-selection');
  };

  const handleViewAllResults = () => {
    navigate('/quiz-history-dashboard');
  };

  const handleBackToProfile = () => {
    navigate('/user-profile-settings');
  };

  const actionButtons = [
    {
      label: 'Retake Quiz',
      description: 'Try the same quiz again',
      icon: 'refresh-cw',
      variant: 'default',
      onClick: handleRetakeQuiz,
      primary: true
    },
    {
      label: 'Try Different Category',
      description: 'Explore other topics',
      icon: 'grid-3x3',
      variant: 'outline',
      onClick: handleTryDifferentCategory,
      primary: false
    },
    {
      label: 'View All Results',
      description: 'See your quiz history',
      icon: 'history',
      variant: 'outline',
      onClick: handleViewAllResults,
      primary: false
    }
  ];

  const quickActions = [
    {
      label: 'Profile',
      icon: 'user',
      onClick: handleBackToProfile
    },
    {
      label: 'Categories',
      icon: 'folder',
      onClick: handleTryDifferentCategory
    },
    {
      label: 'History',
      icon: 'clock',
      onClick: handleViewAllResults
    }
  ];

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center mb-4">
        <Icon name="arrow-right" size={20} className="text-primary mr-2" />
        <h3 className="text-lg font-semibold text-foreground">What's Next?</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Continue your learning journey with these options:
      </p>
      {/* Main Action Buttons */}
      <div className="space-y-3 mb-6">
        {actionButtons?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant}
            fullWidth
            onClick={action?.onClick}
            iconName={action?.icon}
            iconPosition="left"
            className={`justify-start text-left h-auto py-3 ${
              action?.primary ? 'ring-2 ring-primary/20' : ''
            }`}
          >
            <div className="flex flex-col items-start ml-2">
              <span className="font-medium">{action?.label}</span>
              <span className="text-xs text-muted-foreground font-normal">
                {action?.description}
              </span>
            </div>
          </Button>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Quick Actions</h4>
        <div className="grid grid-cols-3 gap-2">
          {quickActions?.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={action?.onClick}
              className="flex flex-col items-center space-y-1 h-auto py-2"
            >
              <Icon name={action?.icon} size={16} />
              <span className="text-xs">{action?.label}</span>
            </Button>
          ))}
        </div>
      </div>
      {/* Current Quiz Info */}
      <div className="mt-4 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-2">Current Quiz Details</h4>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-muted/30 rounded-md p-2">
            <Icon name="folder" size={14} className="text-muted-foreground mx-auto mb-1" />
            <div className="text-xs font-medium text-foreground truncate">{category}</div>
          </div>
          <div className="bg-muted/30 rounded-md p-2">
            <Icon name="zap" size={14} className="text-muted-foreground mx-auto mb-1" />
            <div className="text-xs font-medium text-foreground">{difficulty}</div>
          </div>
          <div className="bg-muted/30 rounded-md p-2">
            <Icon name="hash" size={14} className="text-muted-foreground mx-auto mb-1" />
            <div className="text-xs font-medium text-foreground">{questionCount} Questions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;