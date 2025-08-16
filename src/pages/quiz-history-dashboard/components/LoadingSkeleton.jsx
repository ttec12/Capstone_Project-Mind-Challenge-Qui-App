import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Metrics Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)]?.map((_, index) => (
          <div key={index} className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-muted-foreground/20 rounded-lg"></div>
            </div>
            <div className="space-y-2">
              <div className="w-16 h-6 bg-muted-foreground/20 rounded"></div>
              <div className="w-20 h-4 bg-muted-foreground/20 rounded"></div>
            </div>
          </div>
        ))}
      </div>
      {/* Chart Skeleton */}
      <div className="bg-muted rounded-lg p-6">
        <div className="w-40 h-6 bg-muted-foreground/20 rounded mb-4"></div>
        <div className="w-full h-64 bg-muted-foreground/10 rounded"></div>
      </div>
      {/* Search Bar Skeleton */}
      <div className="flex items-center space-x-3">
        <div className="flex-1 h-10 bg-muted rounded-md"></div>
        <div className="w-20 h-10 bg-muted rounded-md"></div>
      </div>
      {/* History List Skeleton */}
      <div className="space-y-3">
        {[...Array(5)]?.map((_, index) => (
          <div key={index} className="bg-muted rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted-foreground/20 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="w-32 h-4 bg-muted-foreground/20 rounded"></div>
                  <div className="w-20 h-3 bg-muted-foreground/20 rounded"></div>
                </div>
              </div>
              <div className="w-12 h-6 bg-muted-foreground/20 rounded"></div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-5 bg-muted-foreground/20 rounded-full"></div>
                <div className="w-20 h-3 bg-muted-foreground/20 rounded"></div>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="flex-1 h-8 bg-muted-foreground/20 rounded"></div>
              <div className="flex-1 h-8 bg-muted-foreground/20 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;