import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const BrandHeader = ({ 
  showSearch = false,
  showNotifications = false,
  onSearch,
  onNotificationClick,
  className = ''
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navigationItems = [
    {
      label: 'Quiz',
      path: '/quiz-category-selection',
      icon: 'play-circle'
    },
    {
      label: 'History',
      path: '/quiz-history-dashboard',
      icon: 'clock'
    },
    {
      label: 'Profile',
      path: '/user-profile-settings',
      icon: 'user'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setShowMobileMenu(false);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (onSearch && searchQuery?.trim()) {
      onSearch(searchQuery?.trim());
    }
  };

  const isActive = (path) => {
    return location?.pathname === path;
  };

  const getPageTitle = () => {
    const currentPath = location?.pathname;
    switch (currentPath) {
      case '/quiz-category-selection':
        return 'Choose Category';
      case '/quiz-history-dashboard':
        return 'Quiz History';
      case '/user-profile-settings':
        return 'Profile Settings';
      case '/quiz-results-summary':
        return 'Quiz Results';
      default:
        return 'QuizMaster';
    }
  };

  return (
    <header className={`sticky top-0 z-30 bg-card border-b border-border shadow-sm ${className}`}>
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Left Section - Logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/quiz-category-selection')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="brain" size={20} className="text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">
              QuizMaster
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 ml-8">
            {navigationItems?.map((item) => {
              const active = isActive(item?.path);
              
              return (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    active
                      ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center Section - Search (if enabled) */}
        {showSearch && (
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <Icon 
                  name="search" 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </form>
          </div>
        )}

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          {/* Mobile Page Title */}
          <span className="text-lg font-semibold text-foreground md:hidden">
            {getPageTitle()}
          </span>

          {/* Search Button (Mobile) */}
          {showSearch && (
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              iconName="search"
            />
          )}

          {/* Notifications */}
          {showNotifications && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onNotificationClick}
              iconName="bell"
              className="relative"
            >
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            iconName="menu"
            className="md:hidden"
          />
        </div>
      </div>
      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems?.map((item) => {
              const active = isActive(item?.path);
              
              return (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    active
                      ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </button>
              );
            })}
            
            {showSearch && (
              <div className="pt-2 border-t border-border mt-2">
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <Icon 
                      name="search" 
                      size={16} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                    />
                    <input
                      type="text"
                      placeholder="Search quizzes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </form>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default BrandHeader;