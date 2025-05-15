'use client';

import jsPDF from 'jspdf';
import ReactMarkdown from 'react-markdown';

type ResultsProps = {
  scores: Record<string, number>;
  onRestart: () => void;
};

// Add a mapping of rules to their display names
const ruleDisplayNames: Record<string, string> = {
  Authenticity: "Rule 1 - Be Normal",
  Courage: "Rule 2 - Avoid Mistakes",
  Vulnerability: "Rule 3 - Be Independent",
  Diligence: "Rule 4 - Stay Comfortable",
  Significance: "Rule 5 - Pretend You Don't Matter",
  AuthenticRelationship: "Rule 6 - Stay in Control",
  IntegrityOfPurpose: "Rule 7 - Be Popular"
};

const getFeedbackMessage = (rule: string, score: number): string => {
  if (rule === 'Authenticity') {
    if (score >= 67) {
      return "Be Normal is the hidden rule in our culture that tempts us to fit in rather than sharing our true thoughts, feelings, and passions.\n\nBreaking the rule Be Normal leads to authentic expression, being seen and known by others, and accessing the strengths and characteristics that make us unique.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have an exceptional capacity to break this rule by expressing yourself authentically.\n\nThe stories that can help:\nSome of your most engaging stories will be origin stories, key moments of your experience that provided a strong model or motivation to show up authentically in your life.\n\nStory Prompt:\nDescribe a moment of brave or authentic personal expression that you're most proud of, or a moment when you saw someone else—a parent, mentor, teacher, or public figure—model the courage of being authentic in a situation when they could have chosen to stay silent or blend in.";
    } else if (score >= 34) {
      return "Be Normal is the hidden rule in our culture that tempts us to fit in rather than sharing our true thoughts, feelings, and passions.\n\nBreaking the rule Be Normal leads to authentic expression, being seen and known by others, and accessing the strengths and characteristics that make us unique.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have a budding capacity to break this rule by expressing yourself authentically.\n\nThe stories that can help:\nSome of your most engaging stories will illustrate times when you have broken free from the need to conform and risked showing who you really are.\n\nStory Prompt:\nDescribe a time when you caught yourself trying to fit in, and then realized that you needed to be yourself, express yourself, or show yourself with more honesty. Where were you and what was the circumstance when this happened? How did you feel before and after you stepped up more forthrightly?";
    } else {
      return "Be Normal is the hidden rule in our culture that tempts us to fit in rather than sharing our true thoughts, feelings, and passions.\n\nBreaking the rule Be Normal leads to authentic expression, being seen and known by others, and accessing the strengths and characteristics that make us unique.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have a tendency to follow this rule by masking or withholding your authentic expression.\n\nThe stories that can help:\nSome of your most engaging stories will illustrate the cost of withholding your personal expression with the people and issues that matter to you.\n\nStory Prompt:\nDescribe a time when you felt pressured to hide a part of yourself and doing so came at a cost to you. You may have lost connection with another person, or with yourself, or perhaps you lost an opportunity, courage, or your own self-respect and experienced regret for hiding who you really are. Share a specific moment or circumstance from your own experience that illustrates this.";
    }
  } else if (rule === 'Courage') {
    if (score >= 67) {
      return "Avoid Mistakes is the hidden rule in our culture that invites us to play it safe rather than take intelligent and worthwhile risks on behalf of a goal or our own growth.\n\nBreaking the rule Avoid Mistakes gives you access to creativity, discovery, exploration, and innovation. It requires the willingness to try new things before you know if they'll work.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have an exceptional capacity to break this rule by trying new things.\n\nThe stories that can help:\nSome of your most engaging stories will be origin stories, key moments of your experience that provided a strong model or motivation to take intelligent risks in your life.\n\nStory Prompt:\nDescribe a moment of risk taking, creativity, or innovation that you're most proud of, or a moment when you saw someone else—a parent, mentor, teacher, or public figure—model the courage of taking a risk in a situation when they could have chosen to stay silent or blend in.";
    } else if (score >= 34) {
      return "Avoid Mistakes is the hidden rule in our culture that invites us to play it safe rather than take intelligent and worthwhile risks on behalf of a goal or our own growth.\n\nBreaking the rule Avoid Mistakes gives you access to creativity, discovery, exploration, and innovation. It requires the willingness to try new things before you know if they'll work.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have a budding capacity to break this rule by trying new things.\n\nThe stories that can help:\nSome of your most engaging stories will illustrate the power of taking a risk on behalf of something you believe in.\n\nStory Prompt:\nDescribe a time when you had an idea, inspiration, or opportunity that scared you, but it also excited you enough to take action on it. Where were you and what was the circumstance when this happened? How did you feel before and after you stepped up and took the risk? Are you glad you did? Would you do it the same way again? What did you gain or lose with the risk? Share a specific moment or circumstance from your own experience that illustrates this.";
    } else {
      return "Avoid Mistakes is the hidden rule in our culture that invites us to play it safe rather than take intelligent and worthwhile risks on behalf of a goal or our own growth.\n\nBreaking the rule Avoid Mistakes gives you access to creativity, discovery, exploration, and innovation. It requires the willingness to try new things before you know if they'll work.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have a tendency to follow this rule by sticking with things that are safe and familiar.\n\nThe stories that can help:\nSome of your most engaging stories will illustrate the cost of avoiding risk in relationship to something you believe in.\n\nStory Prompt:\nDescribe a time when you had an idea, inspiration, or opportunity that you ignored or declined and doing so came at a cost to you. You may have lost your creativity, enthusiasm, or joy for some part of your life where you allowed yourself to stagnate in a habit or routine instead of continuing to grow or explore. Perhaps you gave up on a dream because you were afraid to fail. Or maybe you said no when the opportunity to do something you always wanted to try was offered to you, and then you regretted it. Share a specific moment or circumstance from your own experience that illustrates this.";
    }
  } else if (rule === 'Vulnerability') {
    if (score >= 67) {
      return "Be Independent is the hidden rule in our culture that tells us we're stronger, safer, and more respected for doing things on our own.\n\nBreaking the rule Be Independent provides us with the potential for collaboration, teamwork, and connection as we serve our responsibilities with the help of others.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have an exceptional capacity to break this rule by asking for help.\n\nThe stories that can help:\nSome of your most engaging stories will be origin stories, key moments of your experience that provided a strong model or motivation to be vulnerable with your needs in life.\n\nStory Prompt:\nDescribe a time when you asked for help that you're most proud of, or a moment when you saw someone else—a parent, mentor, teacher, or public figure—model the courage of asking for assistance or support when they could have chosen to pretend they had it all handled.";
    } else if (score >= 34) {
      return "Be Independent is the hidden rule in our culture that tells us we're stronger, safer, and more respected for doing things on our own.\n\nBreaking the rule Be Independent provides us with the potential for collaboration, teamwork, and connection as we serve our responsibilities with the help of others.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have a budding capacity to break this rule by asking for help.\n\nThe stories that can help:\nSome of your most engaging stories will illustrate the power of asking for the support that you need and what happened when you did so.\n\nStory Prompt:\nDescribe a time when you reached the limit of your knowledge or capacity and hesitated to get help, but then finally relented and made requests for support. Where were you and what was the circumstance when this happened? How did you feel before and after you asked for help? Are you glad you did? Would you ask for help again? What did you gain with the support? Share a specific moment or circumstance from your own experience that illustrates this.";
    } else {
      return "Be Independent is the hidden rule in our culture that tells us we're stronger, safer, and more respected for doing things on our own.\n\nBreaking the rule Be Independent provides us with the potential for collaboration, teamwork, and connection as we serve our responsibilities with the help of others.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have a tendency to follow this rule by convincing yourself and others that you are not in need of help.\n\nThe stories that can help:\nSome of your most engaging stories will illustrate the cost of withholding your needs from friends, family, loved ones, co-workers, and maybe even the universe itself.\n\nStory Prompt:\nDescribe a time when you felt ashamed, afraid, or hesitant to ask for help and doing so came at a cost to you. You may have fallen short of a dream or a goal, failed to deliver on a promise, exhausted yourself, had an accident, jeopardized someone or something else, or burned out because you didn't want to reach out for support. Share a specific moment or circumstance from your own experience that illustrates this.";
    }
  } else if (rule === 'Diligence') {
    if (score >= 67) {
      return "Stay Comfortable is the hidden rule in our culture that invites us to overinvest in comfort, convenience and leisure.\n\nBreaking the rule Stay Comfortable allows you to enjoy achievements and results that require resilience, stamina, diligence and discipline to reach them.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have an exceptional capacity to break this rule by stepping up when physical effort is needed.\n\nThe stories that can help:\nSome of your most engaging stories will be origin stories, key moments of your life experience that provided a strong model or motivation to meet life's challenges with energy, physicality, and diligence.\n\nStory Prompt:\nDescribe a time when you applied yourself to challenging physical work or a task that you're most proud of, or a moment when you saw someone else—a parent, mentor, teacher, or public figure—model the value of hard work when they could just chosen to kick back and let someone else step up, or ignore the needs of the moment.";
    } else if (score >= 34) {
      return "Stay Comfortable is the hidden rule in our culture that invites us to overinvest in comfort, convenience and leisure.\n\nBreaking the rule Stay Comfortable allows you to enjoy achievements and results that require resilience, stamina, diligence and discipline to reach them.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have a budding capacity to break this rule by stepping up when physical effort is needed.\n\nThe stories that can help:\nSome of your most engaging stories will illustrate the power of dedicating yourself to a challenging physical task and what happened when you did so.\n\nStory Prompt:\nDescribe a time when stepping up to hard work created extraordinary results, brought you joy, helped you bond with others, improved your sense of self or your personal strength. Where were you and what was the circumstance when this happened? How did you feel before and after you applied yourself to the task? How did you overcome initial resistance? Are you glad you did? Share a specific moment or circumstance from your own experience that illustrates this.";
    } else {
      return "Stay Comfortable is the hidden rule in our culture that invites us to overinvest in comfort, convenience and leisure.\n\nBreaking the rule Stay Comfortable allows you to enjoy achievements and results that require resilience, stamina, diligence and discipline to reach them.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have a tendency to follow this rule by shying away from physical engagement in life.\n\nThe stories that can help:\nSome of your most engaging stories will illustrate the cost of backing away from physical engagement, challenges, exercise, and labor.\n\nStory Prompt:\nDescribe a time when choosing the path of least resistance came at a cost to you. You may have come up short of a dream or a goal, failed to deliver on a promise, experienced ill health, or been unable to participate in an enjoyable or important activity due to a lack of stamina. Share a specific moment or circumstance from your own experience that illustrates this.";
    }
  } else if (rule === 'Significance') {
    if (score >= 67) {
      return "Pretend You Don't Matter is the hidden rule in our culture that convinces us that our contributions and actions make little difference in the world.\n\nBreaking the rule Pretend You Don't Matter allows you to provide value because you believe you can make a difference and that your actions, words, and feelings have significance.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have an exceptional capacity to break this rule by taking small actions in relation to things you care about.\n\nThe stories that can help:\nSome of your most engaging stories will be origin stories, key moments of your life experience that will illustrate having made a difference in the world in ways you might not have expected, just because you made the effort to step up and believe you could make a difference.\n\nStory Prompt:\nDescribe an incident that is most notable or that you're most proud of, when a small action you took made a significant difference for the outcome of an event, or for the experience of another person. Your action may have facilitated a change, improved a circumstance, or lifted the worth or mood of another person. How did you \"make someone's day\" by making the effort to impact your world? How did this experience contribute to your sense of self-worth? Share a specific moment or circumstance from your own experience that illustrates this.";
    } else if (score >= 34) {
      return "Pretend You Don't Matter is the hidden rule in our culture that convinces us that our contributions and actions make little difference in the world.\n\nBreaking the rule Pretend You Don't Matter allows you to provide value because you believe you can make a difference and that your actions, words, and feelings have significance.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have a budding capacity to break this rule by taking small actions in relation to things you care about.\n\nThe stories that can help:\nSome of your most engaging stories will illustrate having made a difference in the world in ways you might not have expected, just because you made the effort to step up and believe you could make a difference.\n\nStory Prompt:\nDescribe a time when a small action you took made a significant difference for the outcome of an event, or for the experience of another person. Your action may have facilitated a change, improved a circumstance, or lifted the worth or mood of another person. How did you \"make someone's day\" by making the effort to impact your world? Share a specific moment or circumstance from your own experience that illustrates this.";
    } else {
      return "Pretend You Don't Matter is the hidden rule in our culture that convinces us that our contributions and actions make little difference in the world.\n\nBreaking the rule Pretend You Don't Matter allows you to provide value because you believe you can make a difference and that your actions, words, and feelings have significance.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have a tendency to follow this rule by denying the significance of your impact on the people and environments of your life.\n\nThe stories that can help:\nSome of your most engaging stories will illustrate the cost of denying your own agency, feeling hopeless, and choosing not to act or participate in your life.\n\nStory Prompt:\nDescribe a time when your spirit, mental health, or mood declined when you chose to sit at home or resign yourself to an outcome that you didn't like or wished could be different. Especially if you eventually took action and can illustrate the contrast of your experience. Share a specific moment or circumstance from your own experience that illustrates this.";
    }
  } else if (rule === 'AuthenticRelationship') {
    if (score >= 67) {
      return "Stay in Control is the hidden rule in our culture that tempts us to force, status, and emotional leverage to bring others under our influence and direct their behavior.\n\nBreaking the rule Stay in Control provides you with the capacity to recognize and set aside your personal agenda to consider the needs, perspective, and experience of others as the most effective means of leading or guiding.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have an exceptional capacity to break this rule by prioritizing connection over control.\n\nThe stories that can help:\nSome of your most engaging stories will be origin stories, key moments of your life experience that impressed upon you the effectiveness of leading through relationships. You may have seen another person model this, or had a first hand experience of the value of connection.\n\nStory Prompt:\nDescribe an incident that is most notable or that you're most proud of, when you offered care, attention, and receptivity in the face of tension or disconnect between you and another person. Share a specific moment or circumstance from your own experience that illustrates this.";
    } else if (score >= 34) {
      return "Stay in Control is the hidden rule in our culture that tempts us to force, status, and emotional leverage to bring others under our influence and direct their behavior.\n\nBreaking the rule Stay in Control provides you with the capacity to recognize and set aside your personal agenda to consider the needs, perspective, and experience of others as the most effective means of leading or guiding.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have a budding capacity to break this rule by prioritizing connection over control.\n\nThe stories that can help:\nSome of your most engaging stories will illustrate the joy and positive result of considering others and leaning into relationships before pushing for results.\n\nStory Prompt:\nDescribe a time when you made the effort to connect with someone you were leading, guiding or supporting and the effect that had on your relationship, their actions, and behavior. Share a specific moment or circumstance from your own experience that illustrates this.";
    } else {
      return "Stay in Control is the hidden rule in our culture that tempts us to force, status, and emotional leverage to bring others under our influence and direct their behavior.\n\nBreaking the rule Stay in Control provides you with the capacity to recognize and set aside your personal agenda to consider the needs, perspective, and experience of others as the most effective means of leading or guiding.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have a tendency to follow this rule by attempting to control others before you connect with them.\n\nThe stories that can help:\nSome of your most engaging stories will illustrate the cost of attempting to control others, and how it's backfired for you in the past.\n\nStory Prompt:\nDescribe a time when you tried to force a behavior, perspective or point of view on someone, how it seemed to work in the moment, but how it eventually backfired. Describe a relationship where your need for control created tension. What could you have done differently to foster a more authentic connection? Share a specific moment or circumstance from your own experience that illustrates this.";
    }
  } else if (rule === 'IntegrityOfPurpose') {
    if (score >= 67) {
      return "Be Popular is the hidden rule in our culture that places the value of approval from others higher than personal direction, purpose, and integrity.\n\nBreaking the rule Be Popular allows you to stay connected and honor your inner purpose and any vision you may have for the future without getting sidetracked into over-considering the opinion and approval of others.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have a budding capacity to break this rule by staying true to your inner compass, personal sense of values and direction, even in the face of pressure to conform to the contrary views of a group or the public.\n\nThe stories that can help:\nSome of your most engaging stories will be origin stories, key moments of your life experience that impressed upon you the necessity of guarding your integrity. You may have seen another person model this, or had a first hand experience of the value of acting from personal vision rather than public popularity.\n\nStory Prompt:\nDescribe an incident that is most notable or that you're most proud of when you were tempted to make a decision or take an action that would have been more popular, but you decided instead to stick to your sense of what was right and followed through. What happened? What did you learn from the experience? What did this decision teach you about your personal priorities? Share a specific moment or circumstance from your own experience that illustrates this.";
    } else if (score >= 34) {
      return "Be Popular is the hidden rule in our culture that places the value of approval from others higher than personal direction, purpose, and integrity.\n\nBreaking the rule Be Popular allows you to stay connected and honor your inner purpose and any vision you may have for the future without getting sidetracked into over-considering the opinion and approval of others.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have a budding capacity to break this rule by staying true to your inner compass, personal sense of values and direction, even in the face of pressure to conform to the contrary views of a group or the public.\n\nThe stories that can help:\nSome of your most engaging stories will illustrate the sense of uprightness, agency, self-worth, and even positive outer result that has come from staying true to yourself.\n\nStory Prompt:\nDescribe a time when you were tempted to make a decision or take an action that would have been more popular, but you decided instead to stick to your sense of what was right and followed through. What happened? What did you learn from the experience? What did this decision teach you about your personal priorities? Share a specific moment or circumstance from your own experience that illustrates this.";
    } else {
      return "Be Popular is the hidden rule in our culture that places the value of approval from others higher than personal direction, purpose, and integrity.\n\nBreaking the rule Be Popular allows you to stay connected and honor your inner purpose and any vision you may have for the future without getting sidetracked into over-considering the opinion and approval of others.\n\nYour score for this rule is: " + Math.round(score) + "\nThat means you have a tendency to follow this rule by looking to others for affirmation of your worth and direction before looking to yourself.\n\nThe stories that can help:\nSome of your most engaging stories will illustrate the cost of caring too much about what others think.\n\nStory Prompt:\nDescribe a time when you denied your own sense of rightness or direction in favor of the opinion of others? Where and when did you lose your way by seeking popularity? How did you come to see you had disconnected from inner guidance, or left the path of personal integrity? Did you restore it? If so, how? Share a specific moment or circumstance from your own experience that illustrates this.";
    }
  }
  return "";
};

export default function Results({ scores, onRestart }: ResultsProps) {
  const handleDownload = () => {
    const pdf = new jsPDF();
    let yPos = 20;
    const lineHeight = 7;
    const margin = 20;
    const bottomMargin = 30; // Increased bottom margin
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    
    // Helper function to check and add new page if needed
    const checkAndAddPage = (requiredSpace: number) => {
      if (yPos + requiredSpace > pageHeight - bottomMargin) {
        pdf.addPage();
        yPos = margin;
        return true;
      }
      return false;
    };

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
    yPos += lineHeight * 2;

    // Results
    Object.entries(scores).forEach(([rule, score]) => {
      // Check if we need a new page for the entire rule section
      checkAndAddPage(lineHeight * 6); // Minimum space needed for rule header

      // Rule name
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text(ruleDisplayNames[rule], margin, yPos);
      yPos += lineHeight * 1.5;

      // Score
      pdf.setFontSize(20);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${Math.round(score)}`, margin, yPos);
      yPos += lineHeight * 1.5;

      // Feedback
      const feedback = getFeedbackMessage(rule, score);
      
      // Split feedback into sections and format each appropriately
      const sections = feedback.split('\n\n').map(section => {
        // Strip all markdown characters before determining the type
        const cleanText = section.replace(/\*\*/g, '').replace(/\*/g, '');
        
        if (section.startsWith('**')) {
          // Bold header
          return {
            text: cleanText,
            fontSize: 12,
            isBold: true,
            color: 0
          };
        } else if (section.startsWith('*')) {
          // Story prompt
          return {
            text: cleanText,
            fontSize: 12,
            isItalic: true,
            color: 60
          };
        } else {
          // Normal text
          return {
            text: cleanText,
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

        // Calculate the height needed for this text section
        const lines = pdf.splitTextToSize(section.text, pageWidth - (margin * 2));
        const sectionHeight = (lineHeight * lines.length) + (lineHeight * 0.5);

        // Check if we need a new page before rendering this section
        if (checkAndAddPage(sectionHeight)) {
          // Reset font settings after page break
          pdf.setFontSize(section.fontSize);
          pdf.setTextColor(section.color);
          if (section.isBold) {
            pdf.setFont("helvetica", 'bold');
          } else if (section.isItalic) {
            pdf.setFont("helvetica", 'italic');
          } else {
            pdf.setFont("helvetica", 'normal');
          }
        }

        pdf.text(lines, margin, yPos);
        yPos += sectionHeight;
      });

      // Add space between rules
      yPos += lineHeight * 2;
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
                    <h2 className="text-2xl font-medium text-indigo-600">
                      {ruleDisplayNames[rule]}
                    </h2>
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
              onClick={async () => {
                await fetch('/api/quiz/delete-latest', { method: 'DELETE' });
                onRestart();
              }}
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