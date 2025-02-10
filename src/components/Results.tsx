'use client';

import jsPDF from 'jspdf';
import ReactMarkdown from 'react-markdown';

type ResultsProps = {
  scores: Record<string, number>;
  onRestart: () => void;
};

// Add a mapping of rules to their display names
const ruleDisplayNames: Record<string, string> = {
  Authenticity: "Rule to break: Be Normal",
  Courage: "Rule to break: Avoid Mistakes",
  Vulnerability: "Rule to break: Be Independent",
  Diligence: "Rule to break: Stay Comfortable",
  Significance: "Rule to break: Pretend You Don't Matter",
  AuthenticRelationship: "Rule to break: Stay in Control",
  IntegrityOfPurpose: "Rule to break: Be Popular"
};

const getFeedbackMessage = (rule: string, score: number): string => {
  if (rule === 'Authenticity') {
    return score >= 70 ? 
      "**Your stories are likely rich with examples of embracing your unique self, even when it meant defying expectations.**\n\nExplore stories where your authenticity surpassed conformity—a testament to your strength.\n\n*Story Prompt: Describe a time when expressing your true self felt risky, but ultimately rewarding. What surprised you about the outcome?*" :
      score >= 40 ?
      "**Your stories likely show the balance you strike between expressing yourself and meeting expectations.**\n\nUncover stories revealing your journey toward greater authenticity; you're on a powerful path.\n\n*Story Prompt: Recall a situation where you felt torn between being true to yourself and pleasing others. How did this conflict shape your understanding of authenticity?*" :
      "**Uncovering these narratives will help you unlock your unique voice.**\n\nFind stories illustrating the power of breaking free from the need to conform, embracing your authenticity.\n\n*Story Prompt: Describe a time when you felt pressured to hide a part of yourself. What would it feel like to share that part of your story with someone, or even write about it?*";
  } else if (rule === 'Courage') {
    return score >= 70 ?
      "**Your stories likely showcase resilience and a fearless approach to life.**\n\nExplore stories where courageous risk-taking fueled your growth.\n\n*Story Prompt: Describe a time when you failed spectacularly. What did you learn from that experience, and how did it shape your approach to future challenges?*" :
      score >= 40 ?
      "**Your stories reflect this gradual progress.**\n\nUncover stories of small brave acts that built your courage.\n\n*Story Prompt: Recall a time when you overcame a small fear. How did that small act of courage feel, and what did you learn from it?*" :
      "**Understanding these stories can pave the way to greater courage.**\n\nFind stories revealing the narratives behind your fear of failure.\n\n*Story Prompt: Describe a situation where you avoided a risk, even though you secretly wished you hadn't. What kept you from taking that chance, and what would a more courageous path have looked like?*";
  } else if (rule === 'Vulnerability') {
    return score >= 70 ?
      "**Your stories are likely filled with examples of vulnerability and trust.**\n\nExplore stories showing vulnerability's power in building connections.\n\n*Story Prompt: Describe a time you asked for help and felt genuinely supported. What did you learn about yourself and the power of connection?*" :
      score >= 40 ?
      "**Your stories demonstrate this balance.**\n\nUncover stories where seeking support unexpectedly enriched your life's journey.\n\n*Story Prompt: Recall a situation where you allowed someone to help you, even if it was difficult. What did you gain from that experience?*" :
      "**Exploring these stories will reveal the potential for deepening connections.**\n\nFind stories revealing how interdependence can lead to greater fulfillment and vulnerability.\n\n*Story Prompt: Describe a time when you could have used support but chose to handle things alone. What was the outcome, and what might a different approach have yielded?*";
  } else if (rule === 'Diligence') {
    return score >= 70 ?
      "**Your stories likely showcase sustained effort, perseverance, and a commitment to growth.**\n\nExplore stories highlighting your diligent perseverance.\n\n*Story Prompt: Describe a time you worked incredibly hard to achieve a goal. What kept you going even when things got tough?*" :
      score >= 40 ?
      "**Your stories reflect your growing capacity for sustained commitment.**\n\nUncover stories showcasing moments of pushing through discomfort to achieve your goals.\n\n*Story Prompt: Recall a project or task you completed despite facing initial resistance or setbacks. What strategies did you employ to maintain your effort?*" :
      "**Exploring these narratives will reveal your potential for sustained effort and diligence.**\n\nFind stories illustrating how embracing discomfort fuels growth and diligence.\n\n*Story Prompt: Describe a time you avoided a challenging task. What could you have gained by facing that challenge, and what steps could you take to overcome similar situations in the future?*";
  } else if (rule === 'Significance') {
    return score >= 70 ?
      "**Your stories are filled with examples of owning your presence and making a difference.**\n\nExplore stories showcasing your significant impact on others.\n\n*Story Prompt: Describe a time when you made a significant contribution to a project, relationship, or community. What was the impact of your actions, and how did this contribute to your sense of self-worth?*" :
      score >= 40 ?
      "**Your stories reflect this growing self-awareness.**\n\nUncover stories where taking action revealed your growing significance.\n\n*Story Prompt: Recall a situation where you took action, even though you felt hesitant. How did your actions affect the situation or those around you?*" :
      "**Exploring these narratives will help you recognize your inherent significance.**\n\nFind stories illustrating how recognizing your self-worth enhances your impact.\n\n*Story Prompt: Describe a time you felt insignificant or overlooked. What would it feel like to acknowledge your contribution and own your accomplishments?*";
  } else if (rule === 'AuthenticRelationship') {
    return score >= 70 ?
      "**Your stories are likely rich with examples of genuine intimacy and trust.**\n\nExplore stories of authentic connection over control.\n\n*Story Prompt: Describe a close relationship where trust and mutual respect are key components. How did you foster this connection, and what role did letting go of control play?*" :
      score >= 40 ?
      "**Your stories illustrate this progress.**\n\nUncover stories where releasing control fostered deeper, more meaningful relationships.\n\n*Story Prompt: Recall a situation where you had to compromise or let go of some control to build a positive relationship. How did this compromise affect the dynamics of the relationship?*" :
      "**Understanding these narratives will open doors to deeper, more authentic connections.**\n\nFind stories revealing how letting go can build stronger connections.\n\n*Story Prompt: Describe a relationship where your need for control created tension. What could you have done differently to foster a more authentic connection?*";
  } else {
    return score >= 70 ?
      "**Your stories are likely filled with examples of pursuing your purpose despite external pressure.**\n\nExplore stories celebrating your unwavering integrity of purpose.\n\n*Story Prompt: Describe a time when you faced disapproval for pursuing a goal that was deeply meaningful to you. How did you stay true to your values, and what did you learn from this experience?*" :
      score >= 40 ?
      "**Your stories demonstrate this growing integrity.**\n\nUncover stories highlighting choices where integrity outweighed approval.\n\n*Story Prompt: Recall a time when you made a difficult decision based on your values, even though it was unpopular. What did this decision teach you about your personal priorities?*" :
      "**Exploring these will pave the way toward greater alignment with your true purpose and integrity.**\n\nFind stories revealing how staying true to yourself builds purpose.\n\n*Story Prompt: Describe a situation where you prioritized external approval over your own values. How did this compromise affect your sense of purpose, and how might you approach similar situations differently in the future?*";
  }
};

export default function Results({ scores, onRestart }: ResultsProps) {
  const handleDownload = () => {
    const pdf = new jsPDF();
    let yPos = 20;
    const lineHeight = 7;
    const margin = 20;
    const pageWidth = pdf.internal.pageSize.width;
    
    // Title
    pdf.setFontSize(24);
    pdf.setTextColor(0, 0, 0);
    const title = "Your Story Finder Results";
    const titleWidth = pdf.getTextWidth(title);
    pdf.text(title, (pageWidth - titleWidth) / 2, yPos);
    yPos += lineHeight * 1.5;

    // Subtitle
    pdf.setFontSize(14);
    pdf.setTextColor(100);
    const subtitle = "Here's what we discovered about the best stories you have to tell:";
    const subtitleWidth = pdf.getTextWidth(subtitle);
    pdf.text(subtitle, (pageWidth - subtitleWidth) / 2, yPos);
    yPos += lineHeight * 1.5;

    // Results
    Object.entries(scores).forEach(([rule, score]) => {
      // Rule name
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      const ruleName = rule.replace(/([A-Z])/g, ' $1').trim();
      pdf.text(ruleName, margin, yPos);
      yPos += lineHeight;

      // Rule to break
      pdf.setFontSize(12);
      pdf.setTextColor(100);
      pdf.text(ruleDisplayNames[rule], margin, yPos);
      yPos += lineHeight;

      // Score
      pdf.setFontSize(20);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${Math.round(score)}`, margin, yPos);
      yPos += lineHeight;

      // Feedback
      const feedback = getFeedbackMessage(rule, score);
      
      // Split feedback into sections and format each appropriately
      const sections = feedback.split('\n\n').map(section => {
        if (section.startsWith('**')) {
          // Bold header
          return {
            text: section.replace(/\*\*/g, ''),
            fontSize: 12,
            isBold: true,
            color: 0
          };
        } else if (section.startsWith('*')) {
          // Story prompt
          return {
            text: section.replace(/\*/g, ''),
            fontSize: 12,
            isItalic: true,
            color: 60
          };
        } else {
          // Normal text
          return {
            text: section,
            fontSize: 12,
            isNormal: true,
            color: 60
          };
        }
      });

      // Render each section with appropriate styling
      sections.forEach(section => {
        pdf.setFontSize(section.fontSize);
        pdf.setTextColor(section.color);
        
        if (section.isBold) {
          pdf.setFont("helvetica", 'bold');
        } else if (section.isItalic) {
          pdf.setFont("helvetica", 'italic');
        } else {
          pdf.setFont("helvetica", 'normal');
        }

        const lines = pdf.splitTextToSize(section.text, pageWidth - (margin * 2));
        pdf.text(lines, margin, yPos);
        yPos += (lineHeight * lines.length);
        yPos += lineHeight * 0.5; // Add some space between sections
      });

      // Add space between rules
      yPos += lineHeight;

      // Check if we need a new page
      if (yPos > pdf.internal.pageSize.height - margin) {
        pdf.addPage();
        yPos = margin;
      }
    });

    // Save the PDF
    pdf.save('story-finder-results.pdf');
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-medium tracking-tight text-gray-900">
              Your Story Finder Results
            </h1>
            <p className="text-xl text-gray-600">
              Here's what we discovered about the best stories you have to tell:
            </p>
          </div>

          {/* Score Cards */}
          <div className="space-y-8">
            {Object.entries(scores).map(([rule, score]) => (
              <div 
                key={rule}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6"
              >
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-medium text-indigo-600 mb-1">
                      {ruleDisplayNames[rule]}
                    </h2>
                    <div className="text-base text-gray-600">
                      {rule.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-4xl font-bold text-gray-900">
                      {Math.round(score)}
                    </div>
                    <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <ReactMarkdown>
                    {getFeedbackMessage(rule, score)}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleDownload}
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