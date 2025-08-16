import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialSharing = ({ 
  score = 0, 
  totalQuestions = 0, 
  category = 'General Knowledge',
  difficulty = 'Medium'
}) => {
  const [copied, setCopied] = useState(false);

  const shareText = `I just scored ${score}/${totalQuestions} (${Math.round((score/totalQuestions) * 100)}%) on a ${difficulty} ${category} quiz on QuizMaster! 🧠✨`;
  const shareUrl = window.location?.origin;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(`${shareText}\n\nTry it yourself: ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };

  const handleLinkedInShare = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`;
    window.open(linkedinUrl, '_blank', 'width=550,height=420');
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareButtons = [
    {
      name: 'Twitter',
      icon: 'twitter',
      color: 'hover:bg-blue-50 hover:text-blue-600',
      onClick: handleTwitterShare
    },
    {
      name: 'Facebook',
      icon: 'facebook',
      color: 'hover:bg-blue-50 hover:text-blue-700',
      onClick: handleFacebookShare
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      color: 'hover:bg-blue-50 hover:text-blue-800',
      onClick: handleLinkedInShare
    },
    {
      name: 'WhatsApp',
      icon: 'message-circle',
      color: 'hover:bg-green-50 hover:text-green-600',
      onClick: handleWhatsAppShare
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center mb-4">
        <Icon name="share-2" size={20} className="text-primary mr-2" />
        <h3 className="text-lg font-semibold text-foreground">Share Your Achievement</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Let your friends know about your quiz performance!
      </p>
      {/* Preview Text */}
      <div className="bg-muted/30 rounded-lg p-3 mb-4">
        <p className="text-sm text-foreground">
          {shareText}
        </p>
      </div>
      {/* Social Media Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {shareButtons?.map((button, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={button?.onClick}
            className={`flex items-center justify-center space-x-2 transition-colors duration-200 ${button?.color}`}
          >
            <Icon name={button?.icon} size={16} />
            <span className="hidden sm:inline">{button?.name}</span>
          </Button>
        ))}
      </div>
      {/* Copy Link Button */}
      <Button
        variant="secondary"
        fullWidth
        onClick={handleCopyLink}
        iconName={copied ? 'check' : 'copy'}
        className="transition-all duration-200"
      >
        {copied ? 'Copied to Clipboard!' : 'Copy Share Link'}
      </Button>
      {/* Achievement Badges */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-2">
          {Math.round((score/totalQuestions) * 100) >= 90 && (
            <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs">
              <Icon name="star" size={12} />
              <span>Quiz Master</span>
            </div>
          )}
          {Math.round((score/totalQuestions) * 100) >= 80 && (
            <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
              <Icon name="trophy" size={12} />
              <span>High Scorer</span>
            </div>
          )}
          {difficulty === 'Hard' && score > 0 && (
            <div className="flex items-center space-x-1 bg-accent/10 text-accent px-2 py-1 rounded-full text-xs">
              <Icon name="zap" size={12} />
              <span>Challenge Accepted</span>
            </div>
          )}
          {score === totalQuestions && (
            <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs">
              <Icon name="target" size={12} />
              <span>Perfect Score</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialSharing;