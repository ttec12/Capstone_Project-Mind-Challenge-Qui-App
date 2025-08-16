import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Quiz',
      path: '/quiz-category-selection',
      icon: 'play-circle',
      tooltip: 'Start new quiz'
    },
    {
      label: 'History',
      path: '/quiz-history-dashboard',
      icon: 'clock',
      tooltip: 'View past results'
    },
    {
      label: 'Profile',
      path: '/user-profile-settings',
      icon: 'user',
      tooltip: 'Settings & preferences'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location?.pathname === path;
  };

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden ${className}`}>
      <div className="flex items-center justify-around h-16 px-4">
        {navigationItems?.map((item) => {
          const active = isActive(item?.path);
          
          return (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-colors duration-200 ${
                active
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
              title={item?.tooltip}
            >
              <Icon
                name={item?.icon}
                size={20}
                className={`mb-1 transition-transform duration-200 ${
                  active ? 'scale-110' : 'scale-100'
                }`}
              />
              <span className={`text-xs font-medium truncate transition-all duration-200 ${
                active ? 'font-semibold' : 'font-normal'
              }`}>
                {item?.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabNavigation;