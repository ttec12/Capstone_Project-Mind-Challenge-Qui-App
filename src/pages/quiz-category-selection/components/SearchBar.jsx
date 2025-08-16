import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const SearchBar = ({ 
  onSearch, 
  suggestions = [], 
  placeholder = "Search quiz categories...",
  className = '' 
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    if (query?.length > 0) {
      const filtered = suggestions?.filter(suggestion =>
        suggestion?.toLowerCase()?.includes(query?.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered?.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  }, [query, suggestions]);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setQuery(value);
    onSearch(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setQuery('');
    onSearch('');
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Icon 
            name="search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
          />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
          {query && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name="x" size={18} />
            </button>
          )}
        </div>
      </form>
      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
          {filteredSuggestions?.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left text-foreground hover:bg-muted transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
            >
              <div className="flex items-center space-x-2">
                <Icon name="search" size={14} className="text-muted-foreground" />
                <span className="text-sm">{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
      {/* Popular Searches */}
      {!query && (
        <div className="mt-3">
          <div className="text-xs text-muted-foreground mb-2">Popular searches:</div>
          <div className="flex flex-wrap gap-2">
            {['Science', 'History', 'Sports', 'Movies']?.map((tag) => (
              <button
                key={tag}
                onClick={() => handleSuggestionClick(tag)}
                className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;