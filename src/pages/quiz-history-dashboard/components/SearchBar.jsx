import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onFilterToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    onSearch(searchQuery?.trim());
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="flex items-center space-x-3 mb-6">
      <form onSubmit={handleSearchSubmit} className="flex-1">
        <div className="relative">
          <Icon 
            name="search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search by category or date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-10 py-2 bg-muted border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Icon name="x" size={16} />
            </button>
          )}
        </div>
      </form>
      <Button
        variant="outline"
        onClick={onFilterToggle}
        iconName="filter"
        className="shrink-0"
      >
        <span className="hidden sm:inline">Filter</span>
      </Button>
    </div>
  );
};

export default SearchBar;