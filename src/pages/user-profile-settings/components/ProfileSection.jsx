import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileSection = ({ userProfile, onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: userProfile?.username,
    email: userProfile?.email,
    avatar: userProfile?.avatar
  });
  const [errors, setErrors] = useState({});

  const avatarOptions = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.username?.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData?.username?.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onProfileUpdate(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: userProfile?.username,
      email: userProfile?.email,
      avatar: userProfile?.avatar
    });
    setErrors({});
    setIsEditing(false);
  };

  const handleAvatarSelect = (avatarUrl) => {
    setFormData(prev => ({
      ...prev,
      avatar: avatarUrl
    }));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            iconName="edit"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>
      <div className="space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <Image
                src={formData?.avatar}
                alt="Profile Avatar"
                className="w-20 h-20 rounded-full object-cover border-2 border-border"
              />
              {isEditing && (
                <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                  <Icon name="camera" size={12} className="text-primary-foreground" />
                </div>
              )}
            </div>
            <span className="text-sm text-muted-foreground">Profile Picture</span>
          </div>

          {isEditing && (
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-3">
                Choose Avatar
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {avatarOptions?.map((avatar, index) => (
                  <button
                    key={index}
                    onClick={() => handleAvatarSelect(avatar)}
                    className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                      formData?.avatar === avatar
                        ? 'border-primary ring-2 ring-primary/20' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <Image
                      src={avatar}
                      alt={`Avatar option ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {formData?.avatar === avatar && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <Icon name="check" size={16} className="text-primary" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Username"
            type="text"
            name="username"
            value={formData?.username}
            onChange={handleInputChange}
            disabled={!isEditing}
            error={errors?.username}
            placeholder="Enter your username"
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            error={errors?.email}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{userProfile?.stats?.totalQuizzes}</div>
            <div className="text-sm text-muted-foreground">Total Quizzes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{userProfile?.stats?.averageScore}%</div>
            <div className="text-sm text-muted-foreground">Average Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{userProfile?.stats?.bestScore}%</div>
            <div className="text-sm text-muted-foreground">Best Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">{userProfile?.stats?.streak}</div>
            <div className="text-sm text-muted-foreground">Current Streak</div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="default"
              onClick={handleSave}
              iconName="check"
              className="sm:flex-1"
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              iconName="x"
              className="sm:flex-1"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;