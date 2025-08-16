import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const NotificationSettings = ({ notifications, onNotificationsUpdate }) => {
  const [formData, setFormData] = useState(notifications);
  const [hasChanges, setHasChanges] = useState(false);

  const reminderFrequencyOptions = [
    { value: 'never', label: 'Never', description: 'No quiz reminders' },
    { value: 'daily', label: 'Daily', description: 'Once per day' },
    { value: 'weekly', label: 'Weekly', description: 'Once per week' },
    { value: 'biweekly', label: 'Bi-weekly', description: 'Every two weeks' }
  ];

  const reminderTimeOptions = [
    { value: '09:00', label: '9:00 AM', description: 'Morning reminder' },
    { value: '12:00', label: '12:00 PM', description: 'Lunch time reminder' },
    { value: '18:00', label: '6:00 PM', description: 'Evening reminder' },
    { value: '20:00', label: '8:00 PM', description: 'Night reminder' }
  ];

  const handleCheckboxChange = (field, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
    }));
    setHasChanges(true);
  };

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onNotificationsUpdate(formData);
    setHasChanges(false);
  };

  const handleReset = () => {
    setFormData(notifications);
    setHasChanges(false);
  };

  const notificationTypes = [
    {
      key: 'quizReminders',
      title: 'Quiz Reminders',
      description: 'Get reminded to take quizzes based on your schedule',
      icon: 'clock'
    },
    {
      key: 'achievements',
      title: 'Achievement Notifications',
      description: 'Celebrate your milestones and accomplishments',
      icon: 'trophy'
    },
    {
      key: 'newQuizzes',
      title: 'New Quiz Alerts',
      description: 'Be notified when new quizzes are added in your favorite categories',
      icon: 'plus-circle'
    },
    {
      key: 'streakReminders',
      title: 'Streak Reminders',
      description: 'Keep your quiz streak alive with gentle reminders',
      icon: 'flame'
    },
    {
      key: 'weeklyReports',
      title: 'Weekly Progress Reports',
      description: 'Receive summaries of your quiz performance and progress',
      icon: 'bar-chart'
    },
    {
      key: 'socialUpdates',
      title: 'Social Updates',
      description: 'Get notified about friend activities and challenges',
      icon: 'users'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Notification Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage how and when you receive notifications from QuizMaster
          </p>
        </div>
        <Icon name="bell" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-6">
        {/* Master Toggle */}
        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <Checkbox
            label="Enable all notifications"
            description="Master switch to enable or disable all notifications at once"
            checked={formData?.masterToggle}
            onChange={(e) => handleCheckboxChange('masterToggle', e?.target?.checked)}
          />
        </div>

        {/* Individual Notification Types */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Notification Types</h3>
          
          {notificationTypes?.map((type) => (
            <div key={type?.key} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200">
              <div className="flex-shrink-0 mt-1">
                <Icon name={type?.icon} size={18} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <Checkbox
                  label={type?.title}
                  description={type?.description}
                  checked={formData?.[type?.key] && formData?.masterToggle}
                  disabled={!formData?.masterToggle}
                  onChange={(e) => handleCheckboxChange(type?.key, e?.target?.checked)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Reminder Settings */}
        {formData?.masterToggle && formData?.quizReminders && (
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-lg font-medium text-foreground">Reminder Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Reminder Frequency"
                description="How often you'd like to receive quiz reminders"
                options={reminderFrequencyOptions}
                value={formData?.reminderFrequency}
                onChange={(value) => handleSelectChange('reminderFrequency', value)}
              />

              <Select
                label="Preferred Time"
                description="What time of day you'd like to receive reminders"
                options={reminderTimeOptions}
                value={formData?.reminderTime}
                onChange={(value) => handleSelectChange('reminderTime', value)}
                disabled={formData?.reminderFrequency === 'never'}
              />
            </div>
          </div>
        )}

        {/* Delivery Methods */}
        {formData?.masterToggle && (
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-lg font-medium text-foreground">Delivery Methods</h3>
            
            <div className="space-y-3">
              <Checkbox
                label="Browser notifications"
                description="Show notifications in your web browser"
                checked={formData?.browserNotifications}
                onChange={(e) => handleCheckboxChange('browserNotifications', e?.target?.checked)}
              />

              <Checkbox
                label="Email notifications"
                description="Receive notifications via email"
                checked={formData?.emailNotifications}
                onChange={(e) => handleCheckboxChange('emailNotifications', e?.target?.checked)}
              />

              <Checkbox
                label="Sound alerts"
                description="Play sound when receiving notifications"
                checked={formData?.soundAlerts}
                onChange={(e) => handleCheckboxChange('soundAlerts', e?.target?.checked)}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {hasChanges && (
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
            <Button
              variant="default"
              onClick={handleSave}
              iconName="check"
              className="sm:flex-1"
            >
              Save Notification Settings
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              iconName="rotate-ccw"
              className="sm:flex-1"
            >
              Reset Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationSettings;