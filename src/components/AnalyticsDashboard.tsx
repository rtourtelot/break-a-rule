'use client';

import { ResponsiveRadar } from '@nivo/radar';
import { ResponsiveBar } from '@nivo/bar';
import jsPDF from 'jspdf';

type AnalyticsDashboardProps = {
  averageScores: Array<{
    rule: string;
    score: number;
  }>;
  responseDistribution: Array<{
    ruleType: string;
    score: number;
    count: number;
  }>;
};

const ruleDisplayNames: Record<string, string> = {
  Authenticity: "Rule 1 - Be Normal",
  Courage: "Rule 2 - Avoid Mistakes",
  Vulnerability: "Rule 3 - Be Independent",
  Diligence: "Rule 4 - Stay Comfortable",
  Significance: "Rule 5 - Pretend You Don't Matter",
  AuthenticRelationship: "Rule 6 - Stay in Control",
  IntegrityOfPurpose: "Rule 7 - Be Popular"
};

export default function AnalyticsDashboard({ 
  averageScores, 
  responseDistribution 
}: AnalyticsDashboardProps) {
  // Calculate statistics for each rule
  const ruleStats = averageScores.map(({ rule, score }) => {
    const ruleResponses = responseDistribution.filter(d => d.ruleType === rule);
    const totalResponses = ruleResponses.reduce((sum, d) => sum + d.count, 0);
    
    // Calculate distribution percentages
    const distribution = {
      high: ruleResponses.filter(d => d.score >= 4).reduce((sum, d) => sum + d.count, 0) / totalResponses * 100,
      medium: ruleResponses.filter(d => d.score >= 2 && d.score <= 3).reduce((sum, d) => sum + d.count, 0) / totalResponses * 100,
      low: ruleResponses.filter(d => d.score <= 1).reduce((sum, d) => sum + d.count, 0) / totalResponses * 100
    };

    return {
      rule,
      displayName: ruleDisplayNames[rule] || rule,
      averageScore: score,
      totalResponses,
      distribution
    };
  });

  // Calculate overall statistics
  const totalQuizzes = ruleStats[0]?.totalResponses || 0;
  const overallAverage = averageScores.reduce((sum, { score }) => sum + score, 0) / averageScores.length;
  const highestRule = [...ruleStats].sort((a, b) => b.averageScore - a.averageScore)[0];
  const lowestRule = [...ruleStats].sort((a, b) => a.averageScore - b.averageScore)[0];

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    let yPos = 15;
    const lineHeight = 7;
    const margin = 20;
    const pageWidth = pdf.internal.pageSize.width;
    
    // Title
    pdf.setFontSize(24);
    pdf.setTextColor(0, 0, 0);
    const title = "Story Finder Analytics Report";
    const titleWidth = pdf.getTextWidth(title);
    pdf.text(title, (pageWidth - titleWidth) / 2, yPos);
    yPos += lineHeight * 1.5;

    // Date
    pdf.setFontSize(12);
    pdf.setTextColor(100);
    const date = new Date().toLocaleDateString();
    pdf.text(`Generated on ${date}`, margin, yPos);
    yPos += lineHeight * 1.5;

    // Summary Statistics
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Summary Statistics", margin, yPos);
    yPos += lineHeight;

    pdf.setFontSize(12);
    pdf.text(`Total Quizzes Completed: ${totalQuizzes}`, margin, yPos);
    yPos += lineHeight;
    pdf.text(`Overall Average Score: ${Math.round(overallAverage)}%`, margin, yPos);
    yPos += lineHeight;
    pdf.text(`Highest Scoring Rule: ${highestRule?.rule} (${Math.round(highestRule?.averageScore || 0)}%)`, margin, yPos);
    yPos += lineHeight;
    pdf.text(`Lowest Scoring Rule: ${lowestRule?.rule} (${Math.round(lowestRule?.averageScore || 0)}%)`, margin, yPos);
    yPos += lineHeight * 1.5;

    // Rule Details
    pdf.setFontSize(16);
    pdf.text("Rule Details", margin, yPos);
    yPos += lineHeight;

    ruleStats.forEach(stat => {
      // Check if we need a new page
      if (yPos > pdf.internal.pageSize.height - margin * 2) {
        pdf.addPage();
        yPos = margin;
      }

      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text(stat.displayName, margin, yPos);
      yPos += lineHeight;

      pdf.setFontSize(12);
      pdf.setTextColor(100);
      pdf.text(`Average Score: ${Math.round(stat.averageScore)}%`, margin + 5, yPos);
      yPos += lineHeight;
      pdf.text(`Total Responses: ${stat.totalResponses}`, margin + 5, yPos);
      yPos += lineHeight;
      pdf.text(`High Scores (4-5): ${Math.round(stat.distribution.high)}%`, margin + 5, yPos);
      yPos += lineHeight;
      pdf.text(`Medium Scores (2-3): ${Math.round(stat.distribution.medium)}%`, margin + 5, yPos);
      yPos += lineHeight;
      pdf.text(`Low Scores (1): ${Math.round(stat.distribution.low)}%`, margin + 5, yPos);
      yPos += lineHeight * 1.5;
    });

    pdf.save('story-finder-analytics.pdf');
  };

  return (
    <div className="space-y-8">
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-sm text-gray-500 mb-1">Total Quizzes Completed</div>
          <div className="text-3xl font-bold text-gray-900">{totalQuizzes}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-sm text-gray-500 mb-1">Overall Average Score</div>
          <div className="text-3xl font-bold text-gray-900">{Math.round(overallAverage)}%</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-sm text-gray-500 mb-1">Highest Scoring Rule</div>
          <div className="text-3xl font-bold text-gray-900">{Math.round(highestRule?.averageScore || 0)}%</div>
          <div className="text-sm text-indigo-600 mt-1">{highestRule?.rule.replace(/([A-Z])/g, ' $1').trim()}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-sm text-gray-500 mb-1">Lowest Scoring Rule</div>
          <div className="text-3xl font-bold text-gray-900">{Math.round(lowestRule?.averageScore || 0)}%</div>
          <div className="text-sm text-indigo-600 mt-1">{lowestRule?.rule.replace(/([A-Z])/g, ' $1').trim()}</div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-end">
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-white font-medium hover:from-blue-600 hover:to-indigo-600 shadow-md hover:shadow-lg transition-all duration-150"
        >
          Download Analytics Report
        </button>
      </div>

      {/* Overview Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-medium text-gray-900 mb-4">Overall Statistics</h2>
        <div className="h-[400px]">
          <ResponsiveRadar
            data={averageScores}
            keys={['score']}
            indexBy="rule"
            maxValue={100}
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            borderColor={{ from: 'color' }}
            gridLabelOffset={36}
            dotSize={10}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={2}
            colors={{ scheme: 'nivo' }}
            blendMode="multiply"
            motionConfig="wobbly"
          />
        </div>
      </div>

      {/* Rule Cards */}
      {ruleStats.map(stat => (
        <div 
          key={stat.rule}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6"
        >
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-medium text-indigo-600 mb-1">
                {stat.displayName}
              </h2>
              <div className="text-base text-gray-600">
                {stat.rule.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>

            {/* Score and Progress Bar */}
            <div className="flex items-center gap-3">
              <div className="text-4xl font-bold text-gray-900">
                {Math.round(stat.averageScore)}%
              </div>
              <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  style={{ width: `${stat.averageScore}%` }}
                />
              </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Total Responses</div>
                <div className="text-2xl font-semibold text-gray-900">{stat.totalResponses}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">High Scores (4-5)</div>
                <div className="text-2xl font-semibold text-green-600">{Math.round(stat.distribution.high)}%</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Medium Scores (2-3)</div>
                <div className="text-2xl font-semibold text-yellow-600">{Math.round(stat.distribution.medium)}%</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Low Scores (1)</div>
                <div className="text-2xl font-semibold text-red-600">{Math.round(stat.distribution.low)}%</div>
              </div>
            </div>

            {/* Response Distribution Chart */}
            <div className="h-[200px] mt-4">
              <ResponsiveBar
                data={responseDistribution
                  .filter(d => d.ruleType === stat.rule)
                  .map(d => ({
                    score: `Score ${d.score}`,
                    responses: d.count
                  }))}
                keys={['responses']}
                indexBy="score"
                margin={{ top: 10, right: 10, bottom: 30, left: 40 }}
                padding={0.3}
                colors={{ scheme: 'nivo' }}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Responses',
                  legendPosition: 'middle',
                  legendOffset: -30
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 