import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ metrics }) => {
  const metricCards = [
    {
      title: 'Total Quizzes',
      value: metrics?.totalQuizzes,
      icon: 'play-circle',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Average Score',
      value: `${metrics?.averageScore}%`,
      icon: 'target',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Best Score',
      value: `${metrics?.bestScore}%`,
      icon: 'trophy',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Favorite Category',
      value: metrics?.favoriteCategory,
      icon: 'heart',
      color: 'text-error',
      bgColor: 'bg-error/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metricCards?.map((metric, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-lg ${metric?.bgColor}`}>
              <Icon name={metric?.icon} size={20} className={metric?.color} />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{metric?.value}</p>
            <p className="text-sm text-muted-foreground">{metric?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceMetrics;