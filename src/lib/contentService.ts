import { supabase } from './supabaseClient';

export type Rule = {
  id: number;
  name: string;
  display_name: string;
  quality: string;
  description: string;
};

export type Question = {
  id: number;
  rule_name: string;
  text: string;
  order_index: number;
  is_active: boolean;
};

export type FeedbackMessage = {
  id: number;
  rule_name: string;
  score_range: string;
  min_score: number;
  max_score: number;
  message: string;
};

export type LandingContent = {
  id: number;
  section: string;
  title: string;
  content: string;
  order_index: number;
  is_active: boolean;
};

// Cache for content to avoid repeated database calls
let contentCache: {
  rules: Rule[] | null;
  questions: Question[] | null;
  feedback: FeedbackMessage[] | null;
  landing: LandingContent[] | null;
  lastFetch: number;
} = {
  rules: null,
  questions: null,
  feedback: null,
  landing: null,
  lastFetch: 0
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getRules(): Promise<Rule[]> {
  if (contentCache.rules && Date.now() - contentCache.lastFetch < CACHE_DURATION) {
    return contentCache.rules;
  }

  const { data, error } = await supabase
    .from('rules')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error fetching rules:', error);
    throw new Error('Failed to fetch rules');
  }

  contentCache.rules = data;
  contentCache.lastFetch = Date.now();
  return data;
}

export async function getQuestions(): Promise<Question[]> {
  if (contentCache.questions && Date.now() - contentCache.lastFetch < CACHE_DURATION) {
    return contentCache.questions;
  }

  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('is_active', true)
    .order('rule_name, order_index');

  if (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Failed to fetch questions');
  }

  contentCache.questions = data;
  contentCache.lastFetch = Date.now();
  return data;
}

export async function getFeedbackMessages(): Promise<FeedbackMessage[]> {
  if (contentCache.feedback && Date.now() - contentCache.lastFetch < CACHE_DURATION) {
    return contentCache.feedback;
  }

  const { data, error } = await supabase
    .from('feedback_messages')
    .select('*')
    .order('rule_name, min_score');

  if (error) {
    console.error('Error fetching feedback messages:', error);
    throw new Error('Failed to fetch feedback messages');
  }

  contentCache.feedback = data;
  contentCache.lastFetch = Date.now();
  return data;
}

export async function getLandingContent(): Promise<LandingContent[]> {
  if (contentCache.landing && Date.now() - contentCache.lastFetch < CACHE_DURATION) {
    return contentCache.landing;
  }

  const { data, error } = await supabase
    .from('landing_content')
    .select('*')
    .eq('is_active', true)
    .order('order_index');

  if (error) {
    console.error('Error fetching landing content:', error);
    throw new Error('Failed to fetch landing content');
  }

  contentCache.landing = data;
  contentCache.lastFetch = Date.now();
  return data;
}

export function clearContentCache() {
  contentCache = {
    rules: null,
    questions: null,
    feedback: null,
    landing: null,
    lastFetch: 0
  };
}

// Helper function to get feedback message for a rule and score
export async function getFeedbackForRule(rule: string, score: number): Promise<string> {
  const feedbackMessages = await getFeedbackMessages();
  const ruleFeedback = feedbackMessages.filter(f => f.rule_name === rule);
  
  for (const feedback of ruleFeedback) {
    if (score >= feedback.min_score && score <= feedback.max_score) {
      return feedback.message.replace('{score}', Math.round(score).toString());
    }
  }
  
  // Fallback if no specific feedback found
  return `Your score for ${rule} is ${Math.round(score)}. This indicates your relationship with this rule.`;
}

// Helper function to get rule display name
export async function getRuleDisplayName(ruleName: string): Promise<string> {
  const rules = await getRules();
  const rule = rules.find(r => r.name === ruleName);
  return rule?.display_name || ruleName;
}
