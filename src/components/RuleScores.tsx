type Rule = {
  name: string;
  displayName: string;
  score?: number;
};

const rules: Rule[] = [
  { name: 'Authenticity', displayName: 'BE NORMAL' },
  { name: 'Courage', displayName: 'AVOID MISTAKES' },
  { name: 'Vulnerability', displayName: 'BE INDEPENDENT' },
  { name: 'Diligence', displayName: 'STAY COMFORTABLE' },
  { name: 'Significance', displayName: 'PRETEND YOU DON\'T MATTER' },
  { name: 'AuthenticRelationship', displayName: 'STAY IN CONTROL' },
  { name: 'IntegrityOfPurpose', displayName: 'BE POPULAR' },
];

type FeedbackMessage = {
  high: string;
  medium: string;
  low: string;
};

const ruleFeedback: Record<string, FeedbackMessage> = {
  Authenticity: {
    high: "Your stories of choosing authenticity over fitting in show a natural strength in being yourself.",
    medium: "You're finding your way between being yourself and meeting others' expectations.",
    low: "There's untapped power in your authentic self waiting to be expressed."
  },
  Courage: {
    high: "Your stories reveal someone who naturally steps into challenges and embraces growth.",
    medium: "You're discovering the balance between caution and bold action.",
    low: "There's hidden courage in your everyday choices waiting to be recognized."
  },
  Vulnerability: {
    high: "Your openness creates deep connections and meaningful relationships.",
    medium: "You're exploring the dance between openness and boundaries.",
    low: "There's strength waiting to be discovered in sharing your true self."
  },
  Diligence: {
    high: "Your drive to push boundaries creates opportunities for growth and discovery.",
    medium: "You're finding your own rhythm between comfort and challenge.",
    low: "There's wisdom in how you choose your moments of comfort and growth."
  },
  // ... similar messages for other rules
};

export default function RuleScores({ 
  currentGroup, 
  scores,
  showScores
}: { 
  currentGroup: number;
  scores: Record<string, number>;
  showScores: boolean;
}) {
  if (!showScores) return null;

  const getScoreFeedback = (rule: string, score: number): string => {
    if (!ruleFeedback[rule]) return '';
    if (score >= 70) return ruleFeedback[rule].high;
    if (score >= 40) return ruleFeedback[rule].medium;
    return ruleFeedback[rule].low;
  };

  const getScoreIndicator = (score: number) => {
    // Return series of dots or circles to represent score
    const total = 5;
    const filled = Math.round((score / 100) * total);
    return (
      <div className="flex space-x-0.5">
        {[...Array(total)].map((_, i) => (
          <div
            key={i}
            className={`w-1 h-1 rounded-full ${
              i < filled ? 'bg-indigo-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  const lastCompletedRule = rules[currentGroup - 1];
  const lastCompletedScore = lastCompletedRule ? scores[lastCompletedRule.name] : null;

  return (
    <div className="space-y-4">
      <div className="w-full grid grid-cols-7 gap-1">
        {rules.map((rule, index) => {
          const isCompleted = index < currentGroup;
          const isActive = index === currentGroup;

          return (
            <div
              key={rule.name}
              className={`h-8 px-2 flex items-center justify-between transition-all duration-300
                ${isCompleted ? 'bg-indigo-50' : 'bg-gray-50'}
                ${isActive ? 'bg-blue-50 ring-1 ring-blue-200' : ''}
                rounded-md relative`}
            >
              <div className="min-w-0 flex-1 flex items-center justify-between">
                {isCompleted ? (
                  <>
                    <span className="text-[10px] uppercase tracking-wider font-medium text-indigo-600">
                      {rule.displayName}
                    </span>
                    {getScoreIndicator(scores[rule.name])}
                    <svg className="h-3 w-3 text-indigo-500 flex-shrink-0 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                ) : isActive ? (
                  <div className="h-1 w-full bg-blue-200 rounded animate-pulse" />
                ) : (
                  <div className="h-1 w-full bg-gray-200 rounded" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Simplified feedback message */}
      {lastCompletedRule && lastCompletedScore && (
        <div className="flex items-center gap-3">
          <div className="text-base font-medium text-indigo-600 uppercase tracking-wider">
            BREAK A RULE: {lastCompletedRule.displayName}
          </div>
          <div className="text-gray-600">
            {getScoreFeedback(lastCompletedRule.name, lastCompletedScore)}
          </div>
        </div>
      )}
    </div>
  );
} 