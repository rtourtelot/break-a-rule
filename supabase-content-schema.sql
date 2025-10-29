-- Content Management Tables for Story Finder
-- Run these in your Supabase SQL editor

-- Rules table
CREATE TABLE IF NOT EXISTS rules (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  quality VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  rule_name VARCHAR(50) REFERENCES rules(name) ON DELETE CASCADE,
  text TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Feedback messages table
CREATE TABLE IF NOT EXISTS feedback_messages (
  id SERIAL PRIMARY KEY,
  rule_name VARCHAR(50) REFERENCES rules(name) ON DELETE CASCADE,
  score_range VARCHAR(20) NOT NULL, -- 'high', 'medium', 'low'
  min_score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Landing page content table
CREATE TABLE IF NOT EXISTS landing_content (
  id SERIAL PRIMARY KEY,
  section VARCHAR(50) UNIQUE NOT NULL, -- 'intro', 'bio', 'conclusion', etc.
  title VARCHAR(200),
  content TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Quiz results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id SERIAL PRIMARY KEY,
  device_id VARCHAR(255) NOT NULL,
  scores JSONB NOT NULL, -- Stores all rule scores as JSON
  created_at TIMESTAMP DEFAULT NOW()
);

-- Question responses table
CREATE TABLE IF NOT EXISTS question_responses (
  id SERIAL PRIMARY KEY,
  quiz_result_id INTEGER REFERENCES quiz_results(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL,
  rule_type VARCHAR(50) NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 10),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert initial rules data
INSERT INTO rules (name, display_name, quality, description) VALUES
('Authenticity', 'Rule 1 - Be Normal', 'Authenticity', 'The hidden rule that tempts us to fit in rather than sharing our true thoughts, feelings, and passions'),
('Courage', 'Rule 2 - Avoid Mistakes', 'Courage', 'The rule that keeps us from trying new things and embracing growth'),
('Vulnerability', 'Rule 3 - Be Independent', 'Vulnerability', 'The rule that prevents us from asking for help and building authentic relationships'),
('Diligence', 'Rule 4 - Stay Comfortable', 'Diligence', 'The rule that keeps us in our comfort zone instead of pushing boundaries'),
('Significance', 'Rule 5 - Pretend You Don''t Matter', 'Significance', 'The rule that makes us minimize our impact and avoid taking action'),
('AuthenticRelationship', 'Rule 6 - Stay in Control', 'Authentic Relationship', 'The rule that prevents us from building deep, meaningful connections'),
('IntegrityOfPurpose', 'Rule 7 - Be Popular', 'Integrity of Purpose', 'The rule that makes us compromise our values to fit in')
ON CONFLICT (name) DO NOTHING;

-- Insert initial questions data
INSERT INTO questions (rule_name, text, order_index) VALUES
('Authenticity', 'I am quite open about my strengths, weaknesses, and eccentricities and tend to share them rather than keeping them to myself.', 1),
('Authenticity', 'I spend more time talking about what I want than I complain about what isn''t right, and what I DON''T want.', 2),
('Authenticity', 'I am happy with the amount of time I get to spend doing things that I love.', 3),
('Authenticity', 'I seldom use alcohol or other substances as a way to relax and just be myself around others.', 4),
('Courage', 'I am willing to try something new before knowing if it will work.', 1),
('Courage', 'I consider myself a creative person.', 2),
('Courage', 'Some people are overwhelmed by a lack of structure, but that''s not me—freedom excites me.', 3),
('Courage', 'I notice when I am assuming the worst about a future outcome and actively practice imagining more positive outcomes.', 4),
('Vulnerability', 'It''s not hard for me to ask for help when I need it and I regularly do.', 1),
('Vulnerability', 'I readily accept offers of help or assistance, rather than saying things like "no thanks," "I''m fine," or "I can handle it."', 2),
('Vulnerability', 'I am very aware that the efforts of others contribute to my success.', 3),
('Vulnerability', 'I seek out expert opinions in areas where I don''t have much experience.', 4),
('Diligence', 'I exercise regularly, either with formal fitness activities or other physical recreational activities.', 1),
('Diligence', 'I am able to interrupt myself in a moment of comfort if I realize there is something that needs to be actively attended to.', 2),
('Diligence', 'The idea of breaking a sweat to get something done doesn''t dissuade me from taking action—in fact, I look forward to it.', 3),
('Diligence', 'I remind myself how good it will feel when I''m done as a way to get in motion with tasks, labor, and projects that I''m resisting in the moment.', 4),
('Significance', 'I notice small things that need attention in my environment and take necessary action.', 1),
('Significance', 'I regularly take time to myself for reflection, re-charging, or contemplation.', 2),
('Significance', 'I follow my instinct to take action, make a communication or move in a certain direction even when I don''t have a logical reason to do so.', 3),
('Significance', 'I make myself visible and available in a group setting rather than fading into the background, sitting at the edges, or attending virtual meetings with my camera off.', 4),
('AuthenticRelationship', 'I ask questions of others and show interest in their perspectives and experiences.', 1),
('AuthenticRelationship', 'I seek out the company of others and look for opportunities to share experiences of recreation or learning.', 2),
('AuthenticRelationship', 'I''m in the habit of offering praise, appreciation and acknowledgment to people I work with or that work for me.', 3),
('AuthenticRelationship', 'I tend to focus more on identifying shared interests and perspectives in conflict situations rather than having to be right or get my way.', 4),
('IntegrityOfPurpose', 'I''ll excuse myself from conversations, projects, activities and perspectives that do not resonate with my vision, even if means leaving in the middle sometimes.', 1),
('IntegrityOfPurpose', 'The knowledge that someone may disagree with my decision or action doesn''t dissuade me from moving forward.', 2),
('IntegrityOfPurpose', 'I can easily voice dissenting perspectives, opinions, and points of view in a group when I feel it''s needed.', 3),
('IntegrityOfPurpose', 'I am willing to question or disagree with authority figures when I believe they are in the wrong.', 4)
ON CONFLICT DO NOTHING;

-- Insert initial feedback messages
INSERT INTO feedback_messages (rule_name, score_range, min_score, max_score, message) VALUES
('Authenticity', 'high', 67, 100, 'Be Normal is the hidden rule in our culture that tempts us to fit in rather than sharing our true thoughts, feelings, and passions.\n\nBreaking the rule Be Normal leads to authentic expression, being seen and known by others, and accessing the strengths and characteristics that make us unique.\n\n**Your score for this rule is: {score}**\nThat means you have an exceptional capacity to break this rule by expressing yourself authentically.\n\n**The stories that can help:**\nSome of your most engaging stories will be origin stories, key moments of your experience that provided a strong model or motivation to show up authentically in your life.\n\n**Story Prompt:**\nDescribe a moment of brave or authentic personal expression that you''re most proud of, or a moment when you saw someone else—a parent, mentor, teacher, or public figure—model the courage of being authentic in a situation when they could have chosen to stay silent or blend in.'),
('Authenticity', 'medium', 34, 66, 'Be Normal is the hidden rule in our culture that tempts us to fit in rather than sharing our true thoughts, feelings, and passions.\n\nBreaking the rule Be Normal leads to authentic expression, being seen and known by others, and accessing the strengths and characteristics that make us unique.\n\n**Your score for this rule is: {score}**\nThat means you have a budding capacity to break this rule by expressing yourself authentically.\n\n**The stories that can help:**\nSome of your most engaging stories will illustrate times when you have broken free from the need to conform and risked showing who you really are.\n\n**Story Prompt:**\nDescribe a time when you caught yourself trying to fit in, and then realized that you needed to be yourself, express yourself, or show yourself with more honesty. Where were you and what was the circumstance when this happened? How did you feel before and after you stepped up more forthrightly?'),
('Authenticity', 'low', 0, 33, 'Be Normal is the hidden rule in our culture that tempts us to fit in rather than sharing our true thoughts, feelings, and passions.\n\nBreaking the rule Be Normal leads to authentic expression, being seen and known by others, and accessing the strengths and characteristics that make us unique.\n\n**Your score for this rule is: {score}**\nThat means you have a significant opportunity to break this rule by expressing yourself more authentically.\n\n**The stories that can help:**\nSome of your most engaging stories will be about times when you chose to be different, stand out, or express yourself in ways that felt risky or vulnerable.\n\n**Story Prompt:**\nDescribe a time when you wanted to express yourself authentically but held back. What was the situation? What did you want to say or do? What stopped you? How might you handle a similar situation differently now?')
ON CONFLICT DO NOTHING;

-- Insert initial landing page content
INSERT INTO landing_content (section, title, content, order_index) VALUES
('intro', 'Welcome to the Story Finder', 'Get ready to find the best stories you have to tell, by discovering the cultural rules you currently follow—and those that you break.', 1),
('bio', 'Hi, my name is Rick Lewis.', 'I''m a professional speaker, entertainer, published author, and writing coach. My entire vocational life has been focused on communication skills—and the skill of storytelling has far and away been the number one contributor to my success.', 2),
('story_worth', 'Living a story worth life', 'Living a story worth life is the first principle of great storytelling. The good news is, most of us have lived a story worthy life. The bad news is, we''re not yet skilled at retrieving those stories from our personal history.', 3),
('book', 'My book 7 Rules You Were Born to Break', 'My book 7 Rules You Were Born to Break was written as a useful framework for living our best lives in the future and also for discovering the most interesting stories that are hidden in our past.', 4),
('quiz_description', 'The Story Finder', 'The Story Finder will translate your score, identify the themes of the best stories you have to tell, and provide you with specific prompts that will help you find these stories. The 7 Rule model gets right to the heart of our shared humanness, and when you find those stories you''ll be able to communicate with authenticity, credibility, and clarity.', 5),
('quiz_structure', 'Quiz Structure', 'There are seven sections in this quiz—one for each rule—with four questions within each section. You''re just minutes away from some fascinating and useful information about your way of being in the world and the lens you can use to share your life experience.', 6),
('conclusion', 'I hope you enjoy the Story Finder.', 'I hope you enjoy the Story Finder.', 7)
ON CONFLICT (section) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_questions_rule_name ON questions(rule_name);
CREATE INDEX IF NOT EXISTS idx_questions_order ON questions(order_index);
CREATE INDEX IF NOT EXISTS idx_feedback_rule_name ON feedback_messages(rule_name);
CREATE INDEX IF NOT EXISTS idx_feedback_score_range ON feedback_messages(score_range);
CREATE INDEX IF NOT EXISTS idx_landing_content_order ON landing_content(order_index);
CREATE INDEX IF NOT EXISTS idx_quiz_results_device_id ON quiz_results(device_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_created_at ON quiz_results(created_at);
CREATE INDEX IF NOT EXISTS idx_question_responses_quiz_result_id ON question_responses(quiz_result_id);
CREATE INDEX IF NOT EXISTS idx_question_responses_rule_type ON question_responses(rule_type);
