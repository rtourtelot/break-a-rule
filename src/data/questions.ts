export type Question = {
  id: number;
  text: string;
  rule: 'Authenticity' | 'Courage' | 'Vulnerability' | 'Diligence' | 'Significance' | 'AuthenticRelationship' | 'IntegrityOfPurpose';
};

export const questions: Question[] = [
  {
    id: 1,
    text: "I am quite open about my strengths, weaknesses, and eccentricities and tend to share them rather than keeping them to myself.",
    rule: 'Authenticity'
  },
  {
    id: 2,
    text: "I spend more time talking about what I want than I complain about what isn't right, and what I DON'T want.",
    rule: 'Authenticity'
  },
  {
    id: 3,
    text: "I am happy with the amount of time I get to spend doing things that I love.",
    rule: 'Authenticity'
  },
  {
    id: 4,
    text: "I seldom use alcohol or other substances as a way to relax and just be myself around others.",
    rule: 'Authenticity'
  },
  {
    id: 5,
    text: "I am willing to try something new before knowing if it will work.",
    rule: 'Courage'
  },
  {
    id: 6,
    text: "I consider myself a creative person.",
    rule: 'Courage'
  },
  {
    id: 7,
    text: "Some people are overwhelmed by a lack of structure, but that's not me—freedom excites me.",
    rule: 'Courage'
  },
  {
    id: 8,
    text: "I notice when I am assuming the worst about a future outcome and actively practice imagining more positive outcomes.",
    rule: 'Courage'
  },
  {
    id: 9,
    text: "It's not hard for me to ask for help when I need it and I regularly do.",
    rule: 'Vulnerability'
  },
  {
    id: 10,
    text: "I readily accept offers of help or assistance, rather than saying things like \"no thanks,\" \"I'm fine,\" or \"I can handle it.\"",
    rule: 'Vulnerability'
  },
  {
    id: 11,
    text: "I am very aware that the efforts of others contribute to my success.",
    rule: 'Vulnerability'
  },
  {
    id: 12,
    text: "I seek out expert opinions in areas where I don't have much experience.",
    rule: 'Vulnerability'
  },
  {
    id: 13,
    text: "I exercise regularly, either with formal fitness activities or other physical recreational activities.",
    rule: 'Diligence'
  },
  {
    id: 14,
    text: "I am able to interrupt myself in a moment of comfort if I realize there is something that needs to be actively attended to.",
    rule: 'Diligence'
  },
  {
    id: 15,
    text: "The idea of breaking a sweat to get something done doesn't dissuade me from taking action—in fact, I look forward to it.",
    rule: 'Diligence'
  },
  {
    id: 16,
    text: "I remind myself how good it will feel when I'm done as a way to get in motion with tasks, labor, and projects that I'm resisting in the moment.",
    rule: 'Diligence'
  },
  {
    id: 17,
    text: "I notice small things that need attention in my environment and take necessary action.",
    rule: 'Significance'
  },
  {
    id: 18,
    text: "I regularly take time to myself for reflection, re-charging, or contemplation.",
    rule: 'Significance'
  },
  {
    id: 19,
    text: "I follow my instinct to take action, make a communication or move in a certain direction even when I don't have a logical reason to do so.",
    rule: 'Significance'
  },
  {
    id: 20,
    text: "I make myself visible and available in a group setting rather than fading into the background, sitting at the edges, or attending virtual meetings with my camera off.",
    rule: 'Significance'
  },
  {
    id: 21,
    text: "I ask questions of others and show interest in their perspectives and experiences.",
    rule: 'AuthenticRelationship'
  },
  {
    id: 22,
    text: "I seek out the company of others and look for opportunities to share experiences of recreation or learning.",
    rule: 'AuthenticRelationship'
  },
  {
    id: 23,
    text: "I'm in the habit of offering praise, appreciation and acknowledgment to people I work with or that work for me.",
    rule: 'AuthenticRelationship'
  },
  {
    id: 24,
    text: "I tend to focus more on identifying shared interests and perspectives in conflict situations rather than having to be right or get my way.",
    rule: 'AuthenticRelationship'
  },
  {
    id: 25,
    text: "I'll excuse myself from conversations, projects, activities and perspectives that do not resonate with my vision, even if means leaving in the middle sometimes.",
    rule: 'IntegrityOfPurpose'
  },
  {
    id: 26,
    text: "The knowledge that someone may disagree with my decision or action doesn't dissuade me from moving forward.",
    rule: 'IntegrityOfPurpose'
  },
  {
    id: 27,
    text: "I can easily voice dissenting perspectives, opinions, and points of view in a group when I feel it's needed.",
    rule: 'IntegrityOfPurpose'
  },
  {
    id: 28,
    text: "I am willing to question or disagree with authority figures when I believe they are in the wrong.",
    rule: 'IntegrityOfPurpose'
  }
]; 