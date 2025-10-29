#!/usr/bin/env node

/**
 * Database Setup Script for Story Finder
 * 
 * This script helps verify that your Supabase database is set up correctly
 * and can optionally populate it with initial data.
 * 
 * Usage:
 * 1. Set your environment variables in .env.local
 * 2. Run: node scripts/setup-database.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials!');
  console.error('Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env.local file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabaseConnection() {
  console.log('🔍 Checking database connection...');
  
  try {
    const { data, error } = await supabase.from('rules').select('count').limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Database connection successful!');
    return true;
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    return false;
  }
}

async function checkTables() {
  console.log('🔍 Checking required tables...');
  
  const requiredTables = [
    'rules',
    'questions', 
    'feedback_messages',
    'landing_content',
    'quiz_results',
    'question_responses'
  ];
  
  const missingTables = [];
  
  for (const table of requiredTables) {
    try {
      const { data, error } = await supabase.from(table).select('count').limit(1);
      
      if (error) {
        missingTables.push(table);
        console.log(`❌ Table '${table}' is missing or inaccessible`);
      } else {
        console.log(`✅ Table '${table}' exists`);
      }
    } catch (err) {
      missingTables.push(table);
      console.log(`❌ Table '${table}' is missing or inaccessible`);
    }
  }
  
  if (missingTables.length > 0) {
    console.log('\n❌ Missing tables detected!');
    console.log('Please run the SQL schema script in your Supabase SQL Editor:');
    console.log('File: supabase-content-schema.sql');
    return false;
  }
  
  console.log('✅ All required tables exist!');
  return true;
}

async function checkInitialData() {
  console.log('🔍 Checking initial data...');
  
  try {
    // Check rules
    const { data: rules, error: rulesError } = await supabase
      .from('rules')
      .select('count');
    
    if (rulesError) throw rulesError;
    
    // Check questions
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('count');
    
    if (questionsError) throw questionsError;
    
    // Check feedback messages
    const { data: feedback, error: feedbackError } = await supabase
      .from('feedback_messages')
      .select('count');
    
    if (feedbackError) throw feedbackError;
    
    // Check landing content
    const { data: landing, error: landingError } = await supabase
      .from('landing_content')
      .select('count');
    
    if (landingError) throw landingError;
    
    console.log('✅ Initial data appears to be present!');
    console.log(`   - Rules: ${rules.length} records`);
    console.log(`   - Questions: ${questions.length} records`);
    console.log(`   - Feedback messages: ${feedback.length} records`);
    console.log(`   - Landing content: ${landing.length} records`);
    
    return true;
  } catch (err) {
    console.error('❌ Error checking initial data:', err.message);
    return false;
  }
}

async function testContentAPI() {
  console.log('🔍 Testing content API endpoints...');
  
  try {
    // Test rules endpoint
    const { data: rules, error: rulesError } = await supabase
      .from('rules')
      .select('*')
      .order('id');
    
    if (rulesError) throw rulesError;
    
    // Test questions endpoint
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('*')
      .eq('is_active', true)
      .order('rule_name, order_index');
    
    if (questionsError) throw questionsError;
    
    console.log('✅ Content API endpoints working!');
    console.log(`   - Retrieved ${rules.length} rules`);
    console.log(`   - Retrieved ${questions.length} active questions`);
    
    return true;
  } catch (err) {
    console.error('❌ Content API test failed:', err.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Story Finder Database Setup Check\n');
  
  const connectionOk = await checkDatabaseConnection();
  if (!connectionOk) {
    process.exit(1);
  }
  
  const tablesOk = await checkTables();
  if (!tablesOk) {
    process.exit(1);
  }
  
  const dataOk = await checkInitialData();
  if (!dataOk) {
    console.log('\n⚠️  Initial data may be missing. Run the SQL schema script if needed.');
  }
  
  const apiOk = await testContentAPI();
  if (!apiOk) {
    process.exit(1);
  }
  
  console.log('\n🎉 Database setup is complete and working!');
  console.log('Your Story Finder app should be ready to deploy.');
}

main().catch(console.error);
