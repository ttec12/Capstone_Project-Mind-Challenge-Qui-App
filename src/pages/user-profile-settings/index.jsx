import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import BrandHeader from '../../components/ui/BrandHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ProfileSection from './components/ProfileSection';
import QuizPreferences from './components/QuizPreferences';
import NotificationSettings from './components/NotificationSettings';
import PrivacyControls from './components/PrivacyControls';
import AccessibilitySettings from './components/AccessibilitySettings';
import PerformanceTracking from './components/PerformanceTracking';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const UserProfileSettings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Mock user data
  const [userProfile, setUserProfile] = useState({
    username: "QuizMaster2024",
    email: "user@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    stats: {
      totalQuizzes: 127,
      averageScore: 78,
      bestScore: 95,
      streak: 12
    }
  });

  const [preferences, setPreferences] = useState({
    defaultDifficulty: 'medium',
    defaultQuestionCount: '10',
    favoriteCategories: ['general', 'science', 'history'],
    autoAdvance: true,
    showCorrectAnswers: true,
    enableTimer: false,
    randomizeQuestions: true
  });

  const [notifications, setNotifications] = useState({
    masterToggle: true,
    quizReminders: true,
    achievements: true,
    newQuizzes: false,
    streakReminders: true,
    weeklyReports: true,
    socialUpdates: false,
    reminderFrequency: 'daily',
    reminderTime: '18:00',
    browserNotifications: true,
    emailNotifications: false,
    soundAlerts: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'friends',
    dataRetention: '365',
    shareQuizResults: true,
    allowFriendRequests: true,
    showOnlineStatus: false,
    allowDataAnalytics: true,
    personalizedAds: true,
    thirdPartyIntegration: false
  });

  const [accessibility, setAccessibility] = useState({
    fontSize: 'medium',
    contrast: 'normal',
    animationSpeed: 'normal',
    language: 'en',
    screenReaderSupport: false,
    keyboardNavigation: true,
    focusIndicators: true,
    autoReadQuestions: false,
    colorBlindSupport: false,
    simplifiedInterface: false,
    showTooltips: true,
    confirmActions: false,
    extendedTime: false
  });

  const [performance, setPerformance] = useState({
    stats: {
      totalQuizzes: 127,
      averageScore: 78,
      bestScore: 95,
      currentStreak: 12,
      totalStudyTime: "24h 35m",
      favoriteCategory: "Science"
    },
    settings: {
      trackAccuracy: true,
      trackSpeed: true,
      trackCategories: true,
      trackStreaks: true,
      trackImprovement: true,
      trackWeakAreas: true
    }
  });

  const settingSections = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'user',
      component: ProfileSection
    },
    {
      id: 'preferences',
      label: 'Quiz Preferences',
      icon: 'settings',
      component: QuizPreferences
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'bell',
      component: NotificationSettings
    },
    {
      id: 'privacy',
      label: 'Privacy & Data',
      icon: 'shield',
      component: PrivacyControls
    },
    {
      id: 'accessibility',
      label: 'Accessibility',
      icon: 'accessibility',
      component: AccessibilitySettings
    },
    {
      id: 'performance',
      label: 'Performance',
      icon: 'activity',
      component: PerformanceTracking
    }
  ];

  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile(prev => ({ ...prev, ...updatedProfile }));
  };

  const handlePreferencesUpdate = (updatedPreferences) => {
    setPreferences(updatedPreferences);
  };

  const handleNotificationsUpdate = (updatedNotifications) => {
    setNotifications(updatedNotifications);
  };

  const handlePrivacyUpdate = (updatedPrivacy) => {
    setPrivacy(updatedPrivacy);
  };

  const handleAccessibilityUpdate = (updatedAccessibility) => {
    setAccessibility(updatedAccessibility);
  };

  const handlePerformanceUpdate = (updatedPerformance) => {
    setPerformance(updatedPerformance);
  };

  const renderActiveSection = () => {
    const activeConfig = settingSections?.find(section => section?.id === activeSection);
    if (!activeConfig) return null;

    const Component = activeConfig?.component;
    const props = {
      profile: { userProfile, onProfileUpdate: handleProfileUpdate },
      preferences: { preferences, onPreferencesUpdate: handlePreferencesUpdate },
      notifications: { notifications, onNotificationsUpdate: handleNotificationsUpdate },
      privacy: { privacy, onPrivacyUpdate: handlePrivacyUpdate },
      accessibility: { accessibility, onAccessibilityUpdate: handleAccessibilityUpdate },
      performance: { performance, onPerformanceUpdate: handlePerformanceUpdate }
    };

    return <Component {...props?.[activeSection]} />;
  };

  // Close mobile sidebar when section changes
  useEffect(() => {
    setShowMobileSidebar(false);
  }, [activeSection]);

  return (
    <>
      <Helmet>
        <title>Profile Settings - QuizMaster</title>
        <meta name="description" content="Customize your QuizMaster experience with personalized settings for quizzes, notifications, privacy, and accessibility." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <BrandHeader 
          onSearch={() => {}}
          onNotificationClick={() => {}}
        />
        
        <div className="flex">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:top-16 lg:bg-card lg:border-r lg:border-border">
            <div className="flex-1 overflow-y-auto p-4">
              <nav className="space-y-2">
                {settingSections?.map((section) => (
                  <button
                    key={section?.id}
                    onClick={() => setActiveSection(section?.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md transition-colors duration-200 ${
                      activeSection === section?.id
                        ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={section?.icon} size={18} />
                    <span className="font-medium">{section?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Mobile Sidebar */}
          {showMobileSidebar && (
            <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setShowMobileSidebar(false)}>
              <aside className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h2 className="text-lg font-semibold text-foreground">Settings</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="x"
                    onClick={() => setShowMobileSidebar(false)}
                  />
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <nav className="space-y-2">
                    {settingSections?.map((section) => (
                      <button
                        key={section?.id}
                        onClick={() => setActiveSection(section?.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md transition-colors duration-200 ${
                          activeSection === section?.id
                            ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={section?.icon} size={18} />
                        <span className="font-medium">{section?.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 lg:ml-64">
            <div className="p-4 lg:p-6">
              {/* Mobile Header */}
              <div className="lg:hidden flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Settings</h1>
                  <p className="text-sm text-muted-foreground">
                    {settingSections?.find(s => s?.id === activeSection)?.label}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="menu"
                  onClick={() => setShowMobileSidebar(true)}
                >
                  Menu
                </Button>
              </div>

              {/* Desktop Header */}
              <div className="hidden lg:block mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {settingSections?.find(s => s?.id === activeSection)?.label}
                </h1>
                <p className="text-muted-foreground">
                  Customize your QuizMaster experience to match your preferences and needs.
                </p>
              </div>

              {/* Active Section Content */}
              <div className="max-w-4xl">
                {renderActiveSection()}
              </div>
            </div>
          </main>
        </div>

        <BottomTabNavigation className="pb-safe" />
      </div>
    </>
  );
};

export default UserProfileSettings;