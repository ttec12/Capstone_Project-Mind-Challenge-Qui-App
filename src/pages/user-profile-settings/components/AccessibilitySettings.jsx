import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const AccessibilitySettings = ({ accessibility, onAccessibilityUpdate }) => {
  const [formData, setFormData] = useState(accessibility);
  const [hasChanges, setHasChanges] = useState(false);

  const fontSizeOptions = [
    { value: 'small', label: 'Small', description: '14px - Compact text size' },
    { value: 'medium', label: 'Medium', description: '16px - Default text size' },
    { value: 'large', label: 'Large', description: '18px - Larger text for better readability' },
    { value: 'extra-large', label: 'Extra Large', description: '20px - Maximum text size' }
  ];

  const contrastOptions = [
    { value: 'normal', label: 'Normal', description: 'Standard color contrast' },
    { value: 'high', label: 'High Contrast', description: 'Enhanced contrast for better visibility' },
    { value: 'dark', label: 'Dark Mode', description: 'Dark theme with light text' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English', description: 'English (United States)' },
    { value: 'es', label: 'Español', description: 'Spanish' },
    { value: 'fr', label: 'Français', description: 'French' },
    { value: 'de', label: 'Deutsch', description: 'German' },
    { value: 'it', label: 'Italiano', description: 'Italian' },
    { value: 'pt', label: 'Português', description: 'Portuguese' }
  ];

  const animationSpeedOptions = [
    { value: 'none', label: 'No Animations', description: 'Disable all animations and transitions' },
    { value: 'reduced', label: 'Reduced Motion', description: 'Minimal animations for essential feedback' },
    { value: 'normal', label: 'Normal', description: 'Standard animation speed' },
    { value: 'fast', label: 'Fast', description: 'Quicker animations and transitions' }
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
    onAccessibilityUpdate(formData);
    setHasChanges(false);
  };

  const handleReset = () => {
    setFormData(accessibility);
    setHasChanges(false);
  };

  const accessibilityFeatures = [
    {
      key: 'screenReaderSupport',
      title: 'Screen Reader Support',
      description: 'Enhanced compatibility with screen reading software',
      icon: 'volume-2'
    },
    {
      key: 'keyboardNavigation',
      title: 'Keyboard Navigation',
      description: 'Navigate the entire interface using only keyboard shortcuts',
      icon: 'keyboard'
    },
    {
      key: 'focusIndicators',
      title: 'Enhanced Focus Indicators',
      description: 'More visible focus outlines for better navigation',
      icon: 'target'
    },
    {
      key: 'autoReadQuestions',
      title: 'Auto-read Questions',
      description: 'Automatically read quiz questions aloud',
      icon: 'headphones'
    },
    {
      key: 'colorBlindSupport',
      title: 'Color Blind Support',
      description: 'Use patterns and symbols in addition to colors',
      icon: 'eye'
    },
    {
      key: 'simplifiedInterface',
      title: 'Simplified Interface',
      description: 'Remove non-essential visual elements for clarity',
      icon: 'minimize'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Accessibility Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Customize the interface to meet your accessibility needs
          </p>
        </div>
        <Icon name="accessibility" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-6">
        {/* Visual Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Visual Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Font Size"
              description="Adjust text size for better readability"
              options={fontSizeOptions}
              value={formData?.fontSize}
              onChange={(value) => handleSelectChange('fontSize', value)}
            />

            <Select
              label="Color Contrast"
              description="Choose contrast level that works best for you"
              options={contrastOptions}
              value={formData?.contrast}
              onChange={(value) => handleSelectChange('contrast', value)}
            />
          </div>
        </div>

        {/* Motion Settings */}
        <div>
          <Select
            label="Animation & Motion"
            description="Control animation speed and motion effects"
            options={animationSpeedOptions}
            value={formData?.animationSpeed}
            onChange={(value) => handleSelectChange('animationSpeed', value)}
            className="max-w-md"
          />
        </div>

        {/* Language Settings */}
        <div>
          <Select
            label="Interface Language"
            description="Choose your preferred language for the interface"
            options={languageOptions}
            value={formData?.language}
            onChange={(value) => handleSelectChange('language', value)}
            className="max-w-md"
          />
        </div>

        {/* Accessibility Features */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Accessibility Features</h3>
          
          {accessibilityFeatures?.map((feature) => (
            <div key={feature?.key} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200">
              <div className="flex-shrink-0 mt-1">
                <Icon name={feature?.icon} size={18} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <Checkbox
                  label={feature?.title}
                  description={feature?.description}
                  checked={formData?.[feature?.key]}
                  onChange={(e) => handleCheckboxChange(feature?.key, e?.target?.checked)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Options */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h3 className="text-lg font-medium text-foreground">Additional Options</h3>
          
          <div className="space-y-3">
            <Checkbox
              label="Show tooltips and help text"
              description="Display additional context and help information throughout the interface"
              checked={formData?.showTooltips}
              onChange={(e) => handleCheckboxChange('showTooltips', e?.target?.checked)}
            />

            <Checkbox
              label="Confirm before actions"
              description="Ask for confirmation before important actions like submitting answers"
              checked={formData?.confirmActions}
              onChange={(e) => handleCheckboxChange('confirmActions', e?.target?.checked)}
            />

            <Checkbox
              label="Extended time limits"
              description="Provide additional time for timed quizzes and activities"
              checked={formData?.extendedTime}
              onChange={(e) => handleCheckboxChange('extendedTime', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Accessibility Resources */}
        <div className="bg-muted/50 p-4 rounded-lg border border-border">
          <div className="flex items-start space-x-3">
            <Icon name="info" size={18} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-foreground mb-2">Accessibility Resources</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Need help with accessibility features? We're here to support you.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" iconName="book">
                  User Guide
                </Button>
                <Button variant="outline" size="sm" iconName="headphones">
                  Contact Support
                </Button>
                <Button variant="outline" size="sm" iconName="message-circle">
                  Feedback
                </Button>
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
              Save Accessibility Settings
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

export default AccessibilitySettings;