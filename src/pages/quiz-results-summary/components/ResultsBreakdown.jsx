import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResultsBreakdown = ({ questions = [], userAnswers = [] }) => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt?.value;
  };

  const getAnswerStatus = (questionIndex) => {
    const userAnswer = userAnswers?.[questionIndex];
    const correctAnswer = questions?.[questionIndex]?.correct_answer;
    return userAnswer === correctAnswer;
  };

  const getStatusIcon = (isCorrect) => {
    return isCorrect ? 'check-circle' : 'x-circle';
  };

  const getStatusColor = (isCorrect) => {
    return isCorrect ? 'text-success' : 'text-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="list" size={20} className="mr-2" />
          Question Breakdown
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Review your answers and see explanations
        </p>
      </div>
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {questions?.map((question, index) => {
          const isCorrect = getAnswerStatus(index);
          const isExpanded = expandedQuestion === index;
          const userAnswer = userAnswers?.[index];
          const allAnswers = [...question?.incorrect_answers, question?.correct_answer]?.sort();

          return (
            <div key={index} className="p-4">
              {/* Question Header */}
              <div 
                className="flex items-start justify-between cursor-pointer"
                onClick={() => toggleQuestion(index)}
              >
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className={`flex-shrink-0 mt-1 ${getStatusColor(isCorrect)}`}>
                    <Icon name={getStatusIcon(isCorrect)} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground mb-1">
                      Question {index + 1}
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {decodeHtml(question?.question)}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={isExpanded ? 'chevron-up' : 'chevron-down'}
                  className="flex-shrink-0 ml-2"
                />
              </div>
              {/* Expanded Content */}
              {isExpanded && (
                <div className="mt-4 pl-6 space-y-4">
                  {/* Full Question */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">
                      {decodeHtml(question?.question)}
                    </h4>
                  </div>

                  {/* Answer Options */}
                  <div className="space-y-2">
                    {allAnswers?.map((answer, answerIndex) => {
                      const isUserAnswer = answer === userAnswer;
                      const isCorrectAnswer = answer === question?.correct_answer;
                      
                      let answerClass = 'bg-muted text-muted-foreground';
                      let iconName = 'circle';
                      
                      if (isCorrectAnswer) {
                        answerClass = 'bg-success/10 text-success border-success/20';
                        iconName = 'check-circle';
                      } else if (isUserAnswer && !isCorrectAnswer) {
                        answerClass = 'bg-error/10 text-error border-error/20';
                        iconName = 'x-circle';
                      }

                      return (
                        <div
                          key={answerIndex}
                          className={`flex items-center space-x-2 p-2 rounded-md border ${answerClass}`}
                        >
                          <Icon name={iconName} size={14} />
                          <span className="text-sm">{decodeHtml(answer)}</span>
                          {isUserAnswer && (
                            <span className="text-xs font-medium ml-auto">Your Answer</span>
                          )}
                          {isCorrectAnswer && (
                            <span className="text-xs font-medium ml-auto">Correct</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation (if available) */}
                  {question?.explanation && (
                    <div className="bg-muted/50 rounded-md p-3">
                      <h5 className="text-sm font-medium text-foreground mb-1">
                        Explanation:
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        {decodeHtml(question?.explanation)}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsBreakdown;