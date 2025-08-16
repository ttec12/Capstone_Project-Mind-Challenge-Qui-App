import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ 
  currentScore = 0,
  previousAttempts = [],
  category = 'General Knowledge',
  difficulty = 'Medium'
}) => {
  const calculateAverageScore = () => {
    if (previousAttempts?.length === 0) return currentScore;
    const total = previousAttempts?.reduce((sum, attempt) => sum + attempt?.score, 0);
    return Math.round((total + currentScore) / (previousAttempts?.length + 1));
  };

  const getBestScore = () => {
    if (previousAttempts?.length === 0) return currentScore;
    const allScores = [...previousAttempts?.map(a => a?.score), currentScore];
    return Math.max(...allScores);
  };

  const getImprovement = () => {
    if (previousAttempts?.length === 0) return null;
    const lastAttempt = previousAttempts?.[previousAttempts?.length - 1];
    return currentScore - lastAttempt?.score;
  };

  const getStreakInfo = () => {
    let currentStreak = 0;
    let bestStreak = 0;
    let tempStreak = 0;

    // Include current attempt
    const allAttempts = [...previousAttempts, { score: currentScore }];
    
    for (let i = allAttempts?.length - 1; i >= 0; i--) {
      if (allAttempts?.[i]?.score >= 70) { // Consider 70% as passing
        tempStreak++;
        if (i === allAttempts?.length - 1) {
          currentStreak = tempStreak;
        }
      } else {
        if (tempStreak > bestStreak) {
          bestStreak = tempStreak;
        }
        tempStreak = 0;
      }
    }
    
    if (tempStreak > bestStreak) {
      bestStreak = tempStreak;
    }

    return { currentStreak, bestStreak };
  };

  const averageScore = calculateAverageScore();
  const bestScore = getBestScore();
  const improvement = getImprovement();
  const { currentStreak, bestStreak } = getStreakInfo();

  const metrics = [
    {
      label: 'Current Score',
      value: `${currentScore}%`,
      icon: 'target',
      color: currentScore >= 80 ? 'text-success' : currentScore >= 60 ? 'text-warning' : 'text-error'
    },
    {
      label: 'Average Score',
      value: `${averageScore}%`,
      icon: 'trending-up',
      color: 'text-primary'
    },
    {
      label: 'Best Score',
      value: `${bestScore}%`,
      icon: 'trophy',
      color: 'text-accent'
    },
    {
      label: 'Total Attempts',
      value: previousAttempts?.length + 1,
      icon: 'repeat',
      color: 'text-muted-foreground'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center mb-4">
        <Icon name="bar-chart-3" size={20} className="text-primary mr-2" />
        <h3 className="text-lg font-semibold text-foreground">Performance Metrics</h3>
      </div>
      {/* Main Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {metrics?.map((metric, index) => (
          <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
            <Icon name={metric?.icon} size={16} className={`mx-auto mb-2 ${metric?.color}`} />
            <div className={`text-lg font-bold ${metric?.color}`}>
              {metric?.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {metric?.label}
            </div>
          </div>
        ))}
      </div>
      {/* Improvement & Streak Info */}
      <div className="space-y-3 pt-4 border-t border-border">
        {improvement !== null && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Improvement from last attempt:</span>
            <div className={`flex items-center text-sm font-medium ${
              improvement > 0 ? 'text-success' : improvement < 0 ? 'text-error' : 'text-muted-foreground'
            }`}>
              <Icon 
                name={improvement > 0 ? 'trending-up' : improvement < 0 ? 'trending-down' : 'minus'} 
                size={14} 
                className="mr-1" 
              />
              {improvement > 0 ? '+' : ''}{improvement}%
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Current streak:</span>
          <div className="flex items-center text-sm font-medium text-foreground">
            <Icon name="flame" size={14} className="mr-1 text-accent" />
            {currentStreak} quiz{currentStreak !== 1 ? 'es' : ''}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Best streak:</span>
          <div className="flex items-center text-sm font-medium text-foreground">
            <Icon name="award" size={14} className="mr-1 text-primary" />
            {bestStreak} quiz{bestStreak !== 1 ? 'es' : ''}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Category rank:</span>
          <div className="flex items-center text-sm font-medium text-foreground">
            <Icon name="medal" size={14} className="mr-1 text-secondary" />
            {currentScore >= 90 ? 'Expert' : currentScore >= 80 ? 'Advanced' : currentScore >= 70 ? 'Intermediate' : 'Beginner'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;