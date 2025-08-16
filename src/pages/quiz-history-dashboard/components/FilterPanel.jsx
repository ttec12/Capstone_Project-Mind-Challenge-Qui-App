import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange, onClearFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'General Knowledge', label: 'General Knowledge' },
    { value: 'Science', label: 'Science' },
    { value: 'History', label: 'History' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Geography', label: 'Geography' },
    { value: 'Art', label: 'Art' },
    { value: 'Literature', label: 'Literature' }
  ];

  const difficultyOptions = [
    { value: '', label: 'All Difficulties' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'score-desc', label: 'Highest Score' },
    { value: 'score-asc', label: 'Lowest Score' },
    { value: 'category', label: 'Category A-Z' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearAll = () => {
    const clearedFilters = {
      category: '',
      difficulty: '',
      sortBy: 'date-desc',
      dateFrom: '',
      dateTo: '',
      minScore: '',
      maxScore: ''
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      {/* Filter Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Filter & Sort</h2>
            <Button variant="ghost" size="sm" onClick={onClose} iconName="x" />
          </div>

          {/* Filter Options */}
          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <Select
                label="Category"
                options={categoryOptions}
                value={localFilters?.category}
                onChange={(value) => handleFilterChange('category', value)}
              />
            </div>

            {/* Difficulty Filter */}
            <div>
              <Select
                label="Difficulty"
                options={difficultyOptions}
                value={localFilters?.difficulty}
                onChange={(value) => handleFilterChange('difficulty', value)}
              />
            </div>

            {/* Sort By */}
            <div>
              <Select
                label="Sort By"
                options={sortOptions}
                value={localFilters?.sortBy}
                onChange={(value) => handleFilterChange('sortBy', value)}
              />
            </div>

            {/* Date Range */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Date Range</h3>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="From"
                  type="date"
                  value={localFilters?.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
                />
                <Input
                  label="To"
                  type="date"
                  value={localFilters?.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
                />
              </div>
            </div>

            {/* Score Range */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Score Range (%)</h3>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Min Score"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0"
                  value={localFilters?.minScore}
                  onChange={(e) => handleFilterChange('minScore', e?.target?.value)}
                />
                <Input
                  label="Max Score"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="100"
                  value={localFilters?.maxScore}
                  onChange={(e) => handleFilterChange('maxScore', e?.target?.value)}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="flex-1"
              iconName="refresh-cw"
            >
              Clear All
            </Button>
            <Button
              variant="default"
              onClick={handleApplyFilters}
              className="flex-1"
              iconName="check"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;