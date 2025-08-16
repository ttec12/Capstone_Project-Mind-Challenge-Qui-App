import React from 'react';
import Icon from '../../../components/AppIcon';


const CategoryCard = ({ 
  category, 
  isSelected, 
  onSelect, 
  className = '' 
}) => {
  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      'General Knowledge': 'brain',
      'Science': 'flask-conical',
      'History': 'scroll',
      'Entertainment': 'film',
      'Sports': 'trophy',
      'Geography': 'globe',
      'Art': 'palette',
      'Literature': 'book-open'
    };
    return iconMap?.[categoryName] || 'help-circle';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'text-success bg-success/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'hard':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div 
      className={`group relative bg-card border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-md cursor-pointer ${
        isSelected 
          ? 'ring-2 ring-primary border-primary shadow-md' 
          : 'hover:border-primary/50'
      } ${className}`}
      onClick={() => onSelect(category)}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <Icon name="check" size={14} className="text-primary-foreground" />
        </div>
      )}
      {/* Category Icon */}
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-colors duration-200 ${
        isSelected 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
      }`}>
        <Icon name={getCategoryIcon(category?.name)} size={24} />
      </div>
      {/* Category Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
          {category?.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {category?.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1">
            <Icon name="clock" size={12} className="text-muted-foreground" />
            <span className="text-muted-foreground">{category?.avgTime}</span>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(category?.difficulty)}`}>
            {category?.difficulty}
          </div>
        </div>

        {/* Question Count */}
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Icon name="help-circle" size={12} />
          <span>{category?.questionCount} questions available</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;