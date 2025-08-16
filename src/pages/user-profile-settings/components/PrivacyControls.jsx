import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const PrivacyControls = ({ privacy, onPrivacyUpdate }) => {
  const [formData, setFormData] = useState(privacy);
  const [hasChanges, setHasChanges] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const profileVisibilityOptions = [
    { value: 'public', label: 'Public', description: 'Anyone can see your profile and quiz history' },
    { value: 'friends', label: 'Friends Only', description: 'Only your friends can see your profile' },
    { value: 'private', label: 'Private', description: 'Only you can see your profile and history' }
  ];

  const dataRetentionOptions = [
    { value: '30', label: '30 Days', description: 'Delete quiz history after 30 days' },
    { value: '90', label: '90 Days', description: 'Delete quiz history after 3 months' },
    { value: '365', label: '1 Year', description: 'Delete quiz history after 1 year' },
    { value: 'never', label: 'Never', description: 'Keep quiz history indefinitely' }
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
    onPrivacyUpdate(formData);
    setHasChanges(false);
  };

  const handleReset = () => {
    setFormData(privacy);
    setHasChanges(false);
  };

  const handleDeleteAllData = () => {
    // This would typically call an API to delete user data
    setShowDeleteConfirm(false);
    // Show success message or redirect
  };

  const privacySettings = [
    {
      key: 'shareQuizResults',
      title: 'Share Quiz Results',
      description: 'Allow others to see your quiz scores and achievements',
      icon: 'share'
    },
    {
      key: 'allowFriendRequests',
      title: 'Allow Friend Requests',
      description: 'Let other users send you friend requests',
      icon: 'user-plus'
    },
    {
      key: 'showOnlineStatus',
      title: 'Show Online Status',
      description: 'Display when you are active on QuizMaster',
      icon: 'circle'
    },
    {
      key: 'allowDataAnalytics',
      title: 'Analytics & Insights',
      description: 'Help improve QuizMaster by sharing anonymous usage data',
      icon: 'bar-chart'
    },
    {
      key: 'personalizedAds',
      title: 'Personalized Content',
      description: 'Show quiz recommendations based on your interests',
      icon: 'target'
    },
    {
      key: 'thirdPartyIntegration',
      title: 'Third-party Integration',
      description: 'Allow integration with external learning platforms',
      icon: 'link'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Privacy & Data Controls</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your privacy settings and control how your data is used
          </p>
        </div>
        <Icon name="shield" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-6">
        {/* Profile Visibility */}
        <div>
          <Select
            label="Profile Visibility"
            description="Control who can see your profile and quiz history"
            options={profileVisibilityOptions}
            value={formData?.profileVisibility}
            onChange={(value) => handleSelectChange('profileVisibility', value)}
            className="max-w-md"
          />
        </div>

        {/* Data Retention */}
        <div>
          <Select
            label="Data Retention Period"
            description="Choose how long to keep your quiz history and personal data"
            options={dataRetentionOptions}
            value={formData?.dataRetention}
            onChange={(value) => handleSelectChange('dataRetention', value)}
            className="max-w-md"
          />
        </div>

        {/* Privacy Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Privacy Preferences</h3>
          
          {privacySettings?.map((setting) => (
            <div key={setting?.key} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200">
              <div className="flex-shrink-0 mt-1">
                <Icon name={setting?.icon} size={18} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <Checkbox
                  label={setting?.title}
                  description={setting?.description}
                  checked={formData?.[setting?.key]}
                  onChange={(e) => handleCheckboxChange(setting?.key, e?.target?.checked)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Data Management */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h3 className="text-lg font-medium text-foreground">Data Management</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              variant="outline"
              iconName="download"
              className="justify-start"
            >
              Export My Data
            </Button>
            
            <Button
              variant="outline"
              iconName="refresh-cw"
              className="justify-start"
            >
              Reset Statistics
            </Button>
            
            <Button
              variant="destructive"
              iconName="trash-2"
              onClick={() => setShowDeleteConfirm(true)}
              className="justify-start"
            >
              Delete All Data
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="info" size={16} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium mb-1">Data Usage Information</p>
                <p>
                  We collect minimal data to provide you with the best quiz experience. 
                  Your quiz history, preferences, and performance data are stored securely 
                  and used only to improve your learning experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {hasChanges && (
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
            <Button
              variant="default"
              onClick={handleSave}
              iconName="check"
              className="sm:flex-1"
            >
              Save Privacy Settings
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
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card rounded-lg shadow-lg p-6 mx-4 max-w-md w-full animate-scale-in">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="alert-triangle" size={24} className="text-error" />
              <h3 className="text-lg font-semibold text-foreground">Delete All Data?</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              This action cannot be undone. All your quiz history, achievements, 
              and profile data will be permanently deleted.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAllData}
                className="flex-1"
              >
                Delete Everything
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyControls;