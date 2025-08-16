import React from 'react';
import Icon from '../../../components/AppIcon';

const QuizQuestion = ({ 
  question, 
  currentQuestion, 
  totalQuestions, 
  selectedAnswer, 
  onAnswerSelect, 
  showResult, 
  correctAnswer,
  explanation,
  className = '' 
}) => {
  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt?.value;
  };

  const getAnswerStatus = (answer) => {
    if (!showResult) return 'default';
    if (answer === correctAnswer) return 'correct';
    if (answer === selectedAnswer && answer !== correctAnswer) return 'incorrect';
    return 'default';
  };

  const getAnswerClasses = (answer) => {
    const status = getAnswerStatus(answer);
    const isSelected = selectedAnswer === answer;
    
    let baseClasses = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 font-medium";
    
    if (showResult) {
      switch (status) {
        case 'correct':
          return `${baseClasses} bg-success/10 border-success text-success`;
        case 'incorrect':
          return `${baseClasses} bg-error/10 border-error text-error`;
        default:
          return `${baseClasses} bg-muted border-border text-muted-foreground`;
      }
    } else {
      if (isSelected) {
        return `${baseClasses} bg-primary/10 border-primary text-primary`;
      }
      return `${baseClasses} bg-card border-border text-foreground hover:bg-muted hover:border-muted-foreground`;
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Question Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentQuestion} of {totalQuestions}
          </span>
          <div className="flex items-center space-x-2">
            <Icon name="help-circle" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              {question?.difficulty?.charAt(0)?.toUpperCase() + question?.difficulty?.slice(1) || 'Medium'}
            </span>
          </div>
        </div>
        
        <h2 className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed">
          {decodeHtml(question?.question || 'Loading question...')}
        </h2>
        
        {question?.category && (
          <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Icon name="tag" size={14} className="mr-1" />
            {decodeHtml(question?.category)}
          </div>
        )}
      </div>
      {/* Answer Options */}
      <div className="space-y-3 mb-6">
        {question?.answers?.map((answer, index) => {
          const answerLetter = String.fromCharCode(65 + index); // A, B, C, D
          const status = getAnswerStatus(answer);
          
          return (
            <button
              key={index}
              onClick={() => !showResult && onAnswerSelect(answer)}
              disabled={showResult}
              className={getAnswerClasses(answer)}
            >
              <div className="flex items-center space-x-3">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-semibold text-sm ${
                  status === 'correct' ?'bg-success border-success text-white' 
                    : status === 'incorrect' ?'bg-error border-error text-white'
                    : selectedAnswer === answer && !showResult
                    ? 'bg-primary border-primary text-white' :'bg-transparent border-current'
                }`}>
                  {showResult && status === 'correct' ? (
                    <Icon name="check" size={16} />
                  ) : showResult && status === 'incorrect' ? (
                    <Icon name="x" size={16} />
                  ) : (
                    answerLetter
                  )}
                </div>
                <span className="flex-1 text-left">
                  {decodeHtml(answer)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      {/* Explanation */}
      {showResult && explanation && (
        <div className="bg-muted rounded-lg p-4 border border-border">
          <div className="flex items-start space-x-2">
            <Icon name="lightbulb" size={16} className="text-warning mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Explanation</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {decodeHtml(explanation)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;