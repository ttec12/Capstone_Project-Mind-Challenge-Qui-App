import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsBar = ({ 
  totalCategories, 
  totalQuestions, 
  avgCompletionTime,
  className = '' 
}) => {
  const stats = [
    {
      icon: 'folder',
      label: 'Categories',
      value: totalCategories,
      color: 'text-primary'
    },
    {
      icon: 'help-circle',
      label: 'Questions',
      value: totalQuestions?.toLocaleString() || '0',
      color: 'text-secondary'
    },
    {
      icon: 'clock',
      label: 'Avg. Time',
      value: avgCompletionTime,
      color: 'text-accent'
    }
  ];

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="grid grid-cols-3 gap-4">
        {stats?.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center mx-auto mb-2 ${stat?.color}`}>
              <Icon name={stat?.icon} size={20} />
            </div>
            <div className="text-lg font-semibold text-foreground">
              {stat?.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {stat?.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStatsBar;