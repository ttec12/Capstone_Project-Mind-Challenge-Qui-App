import React from 'react';
import CategoryCard from './CategoryCard';

const CategoryGrid = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect, 
  isLoading = false,
  className = '' 
}) => {
  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)]?.map((_, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 animate-pulse">
          <div className="w-12 h-12 bg-muted rounded-lg mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-full"></div>
            <div className="h-3 bg-muted rounded w-2/3"></div>
            <div className="flex justify-between items-center mt-3">
              <div className="h-3 bg-muted rounded w-16"></div>
              <div className="h-5 bg-muted rounded-full w-12"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Empty state
  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">🔍</span>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No categories found</h3>
      <p className="text-muted-foreground">
        Try adjusting your search terms or browse all available categories.
      </p>
    </div>
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!categories || categories?.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories?.map((category) => (
          <CategoryCard
            key={category?.id}
            category={category}
            isSelected={selectedCategory?.id === category?.id}
            onSelect={onCategorySelect}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;