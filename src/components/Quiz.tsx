'use client';

import { useState } from 'react';
import { questions } from '@/data/questions';
import RuleScores from './RuleScores';
import Results from './Results';

type Question = {
  id: number;
  text: string;
  rule: string;
};

const getValueLabel = (value: number): string => {
  if (value === 0) return "Not at all true";
  if (value <= 2) return "A little true";
  if (value <= 4) return "Somewhat true";
  if (value <= 6) return "Moderately true";
  if (value <= 8) return "Mostly true";
  if (value === 9) return "Very true";
  return "Completely true";
};

const calculateRuleScore = (answers: Record<number, number>, ruleQuestions: Question[]): number => {
  const questionScores = ruleQuestions.map(q => answers[q.id] ?? 5);
  const total = questionScores.reduce((sum, score) => sum + score, 0);
  return (total / (ruleQuestions.length * 10)) * 100;
};

const ruleHeaders: Record<number, string> = {
  0: "Rule 1 - Be Normal",
  1: "Rule 2 - Avoid Mistakes",
  2: "Rule 3 - Be Independent",
  3: "Rule 4 - Stay Comfortable",
  4: "Rule 5 - Pretend You Don't Matter",
  5: "Rule 6 - Stay in Control",
  6: "Rule 7 - Be Popular"
};

export default function Quiz() {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showScores, setShowScores] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const questionsPerGroup = 4;
  const totalGroups = Math.ceil(questions.length / questionsPerGroup);
  
  const getCurrentQuestions = () => {
    const startIdx = currentGroup * questionsPerGroup;
    const currentQuestions = questions.slice(startIdx, startIdx + questionsPerGroup);
    console.log(`Getting questions for group ${currentGroup}:`, currentQuestions);
    return currentQuestions;
  };

  const handleSliderChange = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = async () => {
    if (currentGroup < totalGroups - 1) {
      setIsTransitioning(true);
      
      // First fade out
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Then change group and scroll
      setCurrentGroup(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Show scores after first section is complete
      if (currentGroup === 0) {
        setTimeout(() => setShowScores(true), 500);
      }
      
      // Reset transition
      setTimeout(() => setIsTransitioning(false), 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
      setIsFinished(true);
    }
  };

  const handlePrevious = async () => {
    if (currentGroup > 0) {
      setIsTransitioning(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setCurrentGroup(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => setIsTransitioning(false), 100);
    }
  };

  const currentQuestions = getCurrentQuestions();

  // Calculate scores for completed sections
  const calculateScores = () => {
    const scores: Record<string, number> = {};
    const completedQuestions = questions.slice(0, (currentGroup + 1) * 4);
    
    // Group questions by rule
    const ruleGroups = completedQuestions.reduce((groups: Record<string, Question[]>, q) => {
      if (!groups[q.rule]) groups[q.rule] = [];
      groups[q.rule].push(q);
      return groups;
    }, {});

    // Calculate score for each completed rule
    Object.entries(ruleGroups).forEach(([rule, ruleQuestions]) => {
      if (ruleQuestions.length === 4) { // Only calculate if all questions for rule are answered
        scores[rule] = calculateRuleScore(answers, ruleQuestions);
      }
    });

    return scores;
  };

  const scores = calculateScores();

  const hasCompletedAnySection = Object.keys(scores).length > 0;

  if (isFinished) {
    return (
      <Results 
        scores={scores}
        onRestart={() => {
          setIsFinished(false);
          setCurrentGroup(0);
          setAnswers({});
          setShowScores(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header - Progress bar only */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-2 bg-gray-100">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentGroup + 1) / totalGroups) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className={currentGroup === 0 ? "pt-8 pb-16" : "pt-8 pb-16"}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-16">
            {/* Title and description - only show on first screen */}
            {currentGroup === 0 && (
              <div className="space-y-4 text-center">
                <h1 className="text-4xl font-medium tracking-tight text-gray-900">
                  The Story Finder Quiz
                </h1>
                <div className="space-y-2 text-xl text-gray-600">
                  <p>In just 5 minutes you'll discover the most inspiring stories you have to tell.</p>
                  <p>There are no right or wrong answers, and it's all anonymous.</p>
                </div>
              </div>
            )}

            {/* Questions */}
            <div 
              className={`space-y-16 transition-all duration-300 transform
                ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
            >
              {currentGroup > 0 && (
                <div className="text-right">
                  <span className="text-sm text-gray-500">
                    Section {currentGroup + 1} of {totalGroups}
                  </span>
                </div>
              )}

              {/* Rule Header */}
              <div className="text-2xl font-medium text-indigo-600 mb-8">
                {ruleHeaders[currentGroup]}
              </div>

              {currentQuestions.map((question, index) => (
                <div 
                  key={question.id} 
                  className="space-y-8 first:pt-4"
                >
                  <p className="text-xl text-gray-900 leading-relaxed">
                    <span className="text-gray-400 font-medium mr-3">
                      {(currentGroup * 4) + index + 1}.
                    </span>
                    {question.text}
                  </p>
                  
                  <div className="relative pt-12">
                    {/* Enhanced value box - now horizontal */}
                    <div 
                      className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-xl z-20 transition-all duration-150 flex items-center border border-gray-100"
                    >
                      <div className="px-4 py-3 border-r border-gray-100">
                        <span className="text-2xl font-medium text-gray-700">
                          {answers[question.id] ?? 5}
                        </span>
                      </div>
                      <div className="px-4 py-3">
                        <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                          {getValueLabel(answers[question.id] ?? 5)}
                        </span>
                      </div>
                    </div>

                    {/* Custom slider container */}
                    <div className="mt-12 px-3 relative">
                      {/* Custom slider track */}
                      <div className="relative h-2 bg-gray-200 rounded-full">
                        <div 
                          className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                          style={{ 
                            width: `${((answers[question.id] ?? 5) / 10) * 100}%`,
                            transition: 'width 0.2s ease-out'
                          }}
                        />
                        
                        {/* Slider thumb */}
                        <div 
                          className="absolute top-1/2 -mt-2.5 left-0 h-5 w-5 bg-white rounded-full shadow-md border border-gray-200 transition-all duration-150 pointer-events-none"
                          style={{ 
                            left: `calc(${((answers[question.id] ?? 5) / 10) * 100}% - 10px)`,
                          }}
                        />
                      </div>

                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={answers[question.id] ?? 5}
                        onChange={(e) => handleSliderChange(question.id, Number(e.target.value))}
                        className="absolute inset-0 w-full h-8 opacity-0 cursor-pointer z-10"
                        style={{
                          WebkitAppearance: 'none',
                          appearance: 'none'
                        }}
                      />
                    </div>
                    
                    {/* Scale labels */}
                    <div className="flex justify-between mt-4 px-2 text-sm font-medium">
                      <span className="text-gray-500">Not At All True</span>
                      <span className="text-gray-500">Completely True</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8">
              <button
                onClick={handlePrevious}
                disabled={currentGroup === 0}
                className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 transition-colors duration-150"
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-sm font-medium text-white hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50 shadow-md hover:shadow-lg transition-all duration-150"
              >
                {currentGroup === totalGroups - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 