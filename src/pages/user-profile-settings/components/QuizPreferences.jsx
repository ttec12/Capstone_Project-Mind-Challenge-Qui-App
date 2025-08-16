import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const QuizPreferences = ({ preferences, onPreferencesUpdate }) => {
  const [formData, setFormData] = useState(preferences);
  const [hasChanges, setHasChanges] = useState(false);

  const difficultyOptions = [
    { value: 'easy', label: 'Easy', description: 'Simple questions for beginners' },
    { value: 'medium', label: 'Medium', description: 'Moderate difficulty level' },
    { value: 'hard', label: 'Hard', description: 'Challenging questions for experts' },
    { value: 'mixed', label: 'Mixed', description: 'Random difficulty levels' }
  ];

  const questionCountOptions = [
    { value: '5', label: '5 Questions', description: 'Quick 2-3 minute quiz' },
    { value: '10', label: '10 Questions', description: 'Standard 5-7 minute quiz' },
    { value: '15', label: '15 Questions', description: 'Extended 8-12 minute quiz' },
    { value: '20', label: '20 Questions', description: 'Long 15-20 minute quiz' }
  ];

  const categoryOptions = [
    { value: 'general', label: 'General Knowledge' },
    { value: 'science', label: 'Science & Nature' },
    { value: 'history', label: 'History' },
    { value: 'geography', label: 'Geography' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'sports', label: 'Sports' },
    { value: 'art', label: 'Art & Literature' },
    { value: 'technology', label: 'Technology' }
  ];

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleCategoryToggle = (categoryValue, checked) => {
    setFormData(prev => ({
      ...prev,
      favoriteCategories: checked
        ? [...prev?.favoriteCategories, categoryValue]
        : prev?.favoriteCategories?.filter(cat => cat !== categoryValue)
    }));
    setHasChanges(true);
  };

  const handleCheckboxChange = (field, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onPreferencesUpdate(formData);
    setHasChanges(false);
  };

  const handleReset = () => {
    setFormData(preferences);
    setHasChanges(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Quiz Preferences</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Customize your default quiz settings for a personalized experience
          </p>
        </div>
        <Icon name="settings" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-6">
        {/* Default Difficulty */}
        <div>
          <Select
            label="Default Difficulty Level"
            description="Choose your preferred difficulty for new quizzes"
            options={difficultyOptions}
            value={formData?.defaultDifficulty}
            onChange={(value) => handleSelectChange('defaultDifficulty', value)}
            className="max-w-md"
          />
        </div>

        {/* Question Count */}
        <div>
          <Select
            label="Preferred Question Count"
            description="Select how many questions you'd like in each quiz"
            options={questionCountOptions}
            value={formData?.defaultQuestionCount}
            onChange={(value) => handleSelectChange('defaultQuestionCount', value)}
            className="max-w-md"
          />
        </div>

        {/* Favorite Categories */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Favorite Categories
          </label>
          <p className="text-sm text-muted-foreground mb-4">
            Select categories you're most interested in for personalized recommendations
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categoryOptions?.map((category) => (
              <Checkbox
                key={category?.value}
                label={category?.label}
                checked={formData?.favoriteCategories?.includes(category?.value)}
                onChange={(e) => handleCategoryToggle(category?.value, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Quiz Behavior Settings */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h3 className="text-lg font-medium text-foreground">Quiz Behavior</h3>
          
          <Checkbox
            label="Auto-advance to next question"
            description="Automatically move to the next question after selecting an answer"
            checked={formData?.autoAdvance}
            onChange={(e) => handleCheckboxChange('autoAdvance', e?.target?.checked)}
          />

          <Checkbox
            label="Show correct answers immediately"
            description="Display the correct answer right after each question"
            checked={formData?.showCorrectAnswers}
            onChange={(e) => handleCheckboxChange('showCorrectAnswers', e?.target?.checked)}
          />

          <Checkbox
            label="Enable quiz timer"
            description="Add time pressure with a countdown timer for each question"
            checked={formData?.enableTimer}
            onChange={(e) => handleCheckboxChange('enableTimer', e?.target?.checked)}
          />

          <Checkbox
            label="Randomize question order"
            description="Shuffle questions for a different experience each time"
            checked={formData?.randomizeQuestions}
            onChange={(e) => handleCheckboxChange('randomizeQuestions', e?.target?.checked)}
          />
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
              Save Preferences
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

export default QuizPreferences;