import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PerformanceTracking = ({ performance, onPerformanceUpdate }) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showExportSuccess, setShowExportSuccess] = useState(false);
  const [formData, setFormData] = useState(performance?.settings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleCheckboxChange = (field, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onPerformanceUpdate({ ...performance, settings: formData });
    setHasChanges(false);
  };

  const handleReset = () => {
    setFormData(performance?.settings);
    setHasChanges(false);
  };

  const handleResetStatistics = () => {
    // This would typically call an API to reset user statistics
    setShowResetConfirm(false);
    // Show success message or update UI
  };

  const handleExportData = () => {
    // This would typically generate and download a data export
    setShowExportSuccess(true);
    setTimeout(() => setShowExportSuccess(false), 3000);
  };

  const trackingFeatures = [
    {
      key: 'trackAccuracy',
      title: 'Track Answer Accuracy',
      description: 'Monitor your correct vs incorrect answer ratios over time',
      icon: 'target'
    },
    {
      key: 'trackSpeed',
      title: 'Track Response Speed',
      description: 'Measure how quickly you answer questions',
      icon: 'clock'
    },
    {
      key: 'trackCategories',
      title: 'Category Performance',
      description: 'Track your performance across different quiz categories',
      icon: 'bar-chart'
    },
    {
      key: 'trackStreaks',
      title: 'Streak Tracking',
      description: 'Monitor your daily quiz streaks and consistency',
      icon: 'flame'
    },
    {
      key: 'trackImprovement',
      title: 'Progress Tracking',
      description: 'Analyze your improvement trends and learning patterns',
      icon: 'trending-up'
    },
    {
      key: 'trackWeakAreas',
      title: 'Identify Weak Areas',
      description: 'Highlight topics that need more practice',
      icon: 'alert-circle'
    }
  ];

  const performanceStats = [
    {
      label: 'Total Quizzes Completed',
      value: performance?.stats?.totalQuizzes,
      icon: 'check-circle',
      color: 'text-primary'
    },
    {
      label: 'Average Score',
      value: `${performance?.stats?.averageScore}%`,
      icon: 'target',
      color: 'text-success'
    },
    {
      label: 'Best Score',
      value: `${performance?.stats?.bestScore}%`,
      icon: 'trophy',
      color: 'text-warning'
    },
    {
      label: 'Current Streak',
      value: `${performance?.stats?.currentStreak} days`,
      icon: 'flame',
      color: 'text-error'
    },
    {
      label: 'Total Study Time',
      value: performance?.stats?.totalStudyTime,
      icon: 'clock',
      color: 'text-secondary'
    },
    {
      label: 'Favorite Category',
      value: performance?.stats?.favoriteCategory,
      icon: 'heart',
      color: 'text-accent'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Performance Tracking</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor your quiz performance and learning progress
          </p>
        </div>
        <Icon name="activity" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-6">
        {/* Current Statistics */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Your Statistics</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {performanceStats?.map((stat, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-3">
                  <Icon name={stat?.icon} size={20} className={stat?.color} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground truncate">{stat?.label}</p>
                    <p className="text-lg font-semibold text-foreground">{stat?.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Tracking Preferences</h3>
          
          {trackingFeatures?.map((feature) => (
            <div key={feature?.key} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200">
              <div className="flex-shrink-0 mt-1">
                <Icon name={feature?.icon} size={18} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <Checkbox
                  label={feature?.title}
                  description={feature?.description}
                  checked={formData?.[feature?.key]}
                  onChange={(e) => handleCheckboxChange(feature?.key, e?.target?.checked)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Data Management Actions */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h3 className="text-lg font-medium text-foreground">Data Management</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              variant="outline"
              iconName="download"
              onClick={handleExportData}
              className="justify-start"
            >
              Export Performance Data
            </Button>
            
            <Button
              variant="outline"
              iconName="bar-chart"
              className="justify-start"
            >
              View Detailed Analytics
            </Button>
            
            <Button
              variant="destructive"
              iconName="refresh-cw"
              onClick={() => setShowResetConfirm(true)}
              className="justify-start"
            >
              Reset All Statistics
            </Button>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-muted/50 p-4 rounded-lg border border-border">
          <div className="flex items-start space-x-3">
            <Icon name="lightbulb" size={18} className="text-warning mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-foreground mb-2">Performance Insights</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Your strongest category is {performance?.stats?.favoriteCategory} with an average score of {performance?.stats?.averageScore + 15}%</p>
                <p>• You've improved by 12% over the last month - keep it up!</p>
                <p>• Consider practicing History questions to boost your overall performance</p>
                <p>• Your quiz consistency has increased by 25% this week</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {hasChanges && (
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
            <Button
              variant="default"
              onClick={handleSave}
              iconName="check"
              className="sm:flex-1"
            >
              Save Tracking Settings
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              iconName="rotate-ccw"
              className="sm:flex-1"
            >
              Reset Changes
            </Button>
          </div>
        )}
      </div>
      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card rounded-lg shadow-lg p-6 mx-4 max-w-md w-full animate-scale-in">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="alert-triangle" size={24} className="text-warning" />
              <h3 className="text-lg font-semibold text-foreground">Reset Statistics?</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              This will permanently delete all your quiz statistics, scores, and progress data. 
              This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleResetStatistics}
                className="flex-1"
              >
                Reset Statistics
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Export Success Message */}
      {showExportSuccess && (
        <div className="fixed bottom-4 right-4 z-50 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-lg animate-slide-up">
          <div className="flex items-center space-x-2">
            <Icon name="check" size={16} />
            <span className="text-sm font-medium">Performance data exported successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceTracking;