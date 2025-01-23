'use client';

type ResultsProps = {
  scores: Record<string, number>;
  onRestart: () => void;
};

export default function Results({ scores, onRestart }: ResultsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-medium tracking-tight text-gray-900">
              Your Story Finder Results
            </h1>
            <p className="text-xl text-gray-600">
              Here's what we discovered about the stories you have to tell
            </p>
          </div>

          {/* Score Cards */}
          <div className="grid gap-8 md:grid-cols-2">
            {Object.entries(scores).map(([rule, score]) => (
              <div 
                key={rule}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-4"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-medium text-indigo-600">
                    {rule.replace(/([A-Z])/g, ' $1').trim()}
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="text-4xl font-bold text-gray-900">
                      {Math.round(score)}%
                    </div>
                    <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {score >= 70 ? (
                    "You have powerful stories to tell about breaking free from conventional limitations."
                  ) : score >= 40 ? (
                    "You're finding your own path between convention and authenticity."
                  ) : (
                    "There's untapped potential in your journey of breaking from convention."
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => {}} // TODO: Implement PDF download
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-lg font-medium text-white hover:from-blue-600 hover:to-indigo-600 shadow-md hover:shadow-lg transition-all duration-150"
            >
              Download Your Results
            </button>
            <button
              onClick={onRestart}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Take the Quiz Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 