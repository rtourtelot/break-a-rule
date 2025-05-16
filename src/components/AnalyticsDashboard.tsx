'use client';

import { ResponsiveRadar } from '@nivo/radar';
import { ResponsiveBar } from '@nivo/bar';
import { BarTooltipProps } from '@nivo/bar';
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

const ruleOrder = [
  'Authenticity',
  'Courage',
  'Vulnerability',
  'Diligence',
  'Significance',
  'AuthenticRelationship',
  'IntegrityOfPurpose',
];
const ruleDisplayNames: Record<string, string> = {
  Authenticity: 'Rule 1 - Be Normal',
  Courage: 'Rule 2 - Avoid Mistakes',
  Vulnerability: 'Rule 3 - Be Independent',
  Diligence: 'Rule 4 - Stay Comfortable',
  Significance: 'Rule 5 - Pretend You Don\'t Matter',
  AuthenticRelationship: 'Rule 6 - Stay in Control',
  IntegrityOfPurpose: 'Rule 7 - Be Popular',
};
const ruleQualities: Record<string, string> = {
  Authenticity: 'Authenticity',
  Courage: 'Courage',
  Vulnerability: 'Vulnerability',
  Diligence: 'Diligence',
  Significance: 'Significance',
  AuthenticRelationship: 'Authentic Relationship',
  IntegrityOfPurpose: 'Integrity of Purpose',
};

// Custom bar color and tooltip
const barColor = 'url(#blue-gradient)';
const customTooltip = (bar: BarTooltipProps<any>) => (
  <div style={{
    padding: '8px 12px',
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: 6,
    color: '#1e3a8a',
    fontWeight: 500
  }}>
    {bar.data.score}: <b>{bar.data.responses}</b> responses
  </div>
);

export default function AnalyticsDashboard({ averageScores, responseDistribution }: AnalyticsDashboardProps) {
  // Calculate overall stats
  const totalQuizzes = averageScores.length > 0 ? Math.max(...averageScores.map(s => s.score)) : 0;
  const overallAverage = averageScores.reduce((sum, { score }) => sum + score, 0) / (averageScores.length || 1);
  const highestRule = averageScores.reduce((max, curr) => (curr.score > max.score ? curr : max), averageScores[0] || { rule: '', score: 0 });
  const lowestRule = averageScores.reduce((min, curr) => (curr.score < min.score ? curr : min), averageScores[0] || { rule: '', score: 0 });

  // Helper for score cutoffs (same as RuleScores.tsx)
  function getScoreCategory(score: number) {
    if (score >= 7) return 'high';
    if (score >= 4) return 'medium';
    return 'low';
  }

  // Build score distribution for each rule
  function getScoreTable(rule: string) {
    const dist = responseDistribution.filter(d => d.ruleType === rule);
    const counts: Record<number, number> = {};
    for (let i = 0; i <= 10; i++) counts[i] = 0;
    dist.forEach(d => {
      if (d.score >= 0 && d.score <= 10) counts[d.score] = d.count;
    });
    return counts;
  }

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
    pdf.text(`Highest Scoring Rule: ${highestRule?.rule} (${Math.round(highestRule?.score || 0)}%)`, margin, yPos);
    yPos += lineHeight;
    pdf.text(`Lowest Scoring Rule: ${lowestRule?.rule} (${Math.round(lowestRule?.score || 0)}%)`, margin, yPos);
    yPos += lineHeight * 1.5;

    // Rule Details
    pdf.setFontSize(16);
    pdf.text("Rule Details", margin, yPos);
    yPos += lineHeight;

    ruleOrder.forEach(rule => {
      // Check if we need a new page
      if (yPos > pdf.internal.pageSize.height - margin * 2) {
        pdf.addPage();
        yPos = margin;
      }

      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text(ruleDisplayNames[rule], margin, yPos);
      yPos += lineHeight;

      pdf.setFontSize(12);
      pdf.setTextColor(100);
      pdf.text(`Average Score: ${Math.round(averageScores.find(s => s.rule === rule)?.score || 0)}%`, margin + 5, yPos);
      yPos += lineHeight;
      pdf.text(`Total Responses: ${responseDistribution.filter(d => d.ruleType === rule).reduce((sum, d) => sum + d.count, 0)}`, margin + 5, yPos);
      yPos += lineHeight;
      pdf.text(`High Scores (7-10): ${Math.round((responseDistribution.filter(d => d.ruleType === rule && d.score >= 7).reduce((sum, d) => sum + d.count, 0) / responseDistribution.filter(d => d.ruleType === rule).reduce((sum, d) => sum + d.count, 0) * 100))}%`, margin + 5, yPos);
      yPos += lineHeight;
      pdf.text(`Medium Scores (4-6): ${Math.round((responseDistribution.filter(d => d.ruleType === rule && d.score >= 4 && d.score < 7).reduce((sum, d) => sum + d.count, 0) / responseDistribution.filter(d => d.ruleType === rule).reduce((sum, d) => sum + d.count, 0) * 100))}%`, margin + 5, yPos);
      yPos += lineHeight;
      pdf.text(`Low Scores (0-3): ${Math.round((responseDistribution.filter(d => d.ruleType === rule && d.score < 4).reduce((sum, d) => sum + d.count, 0) / responseDistribution.filter(d => d.ruleType === rule).reduce((sum, d) => sum + d.count, 0) * 100))}%`, margin + 5, yPos);
      yPos += lineHeight * 1.5;
    });

    pdf.save('story-finder-analytics.pdf');
  };

  return (
    <div className="space-y-12">
      {/* Overall Stats */}
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
          <div className="text-3xl font-bold text-gray-900">{Math.round(highestRule?.score || 0)}%</div>
          <div className="text-sm text-indigo-600 mt-1">{ruleDisplayNames[highestRule?.rule]}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-sm text-gray-500 mb-1">Lowest Scoring Rule</div>
          <div className="text-3xl font-bold text-gray-900">{Math.round(lowestRule?.score || 0)}%</div>
          <div className="text-sm text-indigo-600 mt-1">{ruleDisplayNames[lowestRule?.rule]}</div>
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

      {/* Rules in order */}
      {ruleOrder.map(rule => {
        const avg = averageScores.find(s => s.rule === rule)?.score || 0;
        const dist = responseDistribution.filter(d => d.ruleType === rule);
        const totalResponses = dist.reduce((sum, d) => sum + d.count, 0);
        const high = dist.filter(d => d.score >= 7).reduce((sum, d) => sum + d.count, 0);
        const medium = dist.filter(d => d.score >= 4 && d.score < 7).reduce((sum, d) => sum + d.count, 0);
        const low = dist.filter(d => d.score < 4).reduce((sum, d) => sum + d.count, 0);
        const highPct = totalResponses ? Math.round((high / totalResponses) * 100) : 0;
        const medPct = totalResponses ? Math.round((medium / totalResponses) * 100) : 0;
        const lowPct = totalResponses ? Math.round((low / totalResponses) * 100) : 0;
        const scoreTable = getScoreTable(rule);
        return (
          <div key={rule} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-medium text-indigo-600 mb-1">{ruleDisplayNames[rule]}</h2>
              <div className="text-base text-gray-600 mb-2">{ruleQualities[rule]}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-4xl font-bold text-gray-900">{Math.round(avg)}%</div>
              <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500" style={{ width: `${avg}%` }} />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Total Responses</div>
                <div className="text-2xl font-semibold text-gray-900">{totalResponses}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">High Scores (7-10)</div>
                <div className="text-2xl font-semibold text-green-600">{highPct}%</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Medium Scores (4-6)</div>
                <div className="text-2xl font-semibold text-yellow-600">{medPct}%</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Low Scores (0-3)</div>
                <div className="text-2xl font-semibold text-red-600">{lowPct}%</div>
              </div>
            </div>
            {/* Score Distribution Table */}
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border border-gray-200 rounded text-center">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-2 py-1 text-xs text-gray-500 font-semibold text-left">Score</th>
                    {Array.from({ length: 11 }, (_, i) => (
                      <th key={i} className="px-2 py-1 text-xs text-gray-500 font-semibold">{i}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white text-base font-semibold border-t border-gray-100">
                    <td className="text-xs text-gray-500 font-medium text-left bg-gray-50">Responses</td>
                    {Array.from({ length: 11 }, (_, i) => (
                      <td key={i} className="px-2 py-1 font-semibold text-gray-700">{scoreTable[i]}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
      {/* Legend/help */}
      <div className="text-xs text-gray-500 mt-8 text-center">
        <span className="inline-block bg-blue-100 text-blue-700 rounded px-2 py-1 mr-2">High: 7-10</span>
        <span className="inline-block bg-yellow-100 text-yellow-700 rounded px-2 py-1 mr-2">Medium: 4-6</span>
        <span className="inline-block bg-red-100 text-red-700 rounded px-2 py-1">Low: 0-3</span>
        <span className="inline-block ml-4">Table shows number of respondents for each score (0-10)</span>
      </div>
    </div>
  );
} 