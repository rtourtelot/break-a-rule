import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log('API /quiz/save received:', body);
  const { deviceId, scores, answers } = body;
  // Insert quiz result
  const { data: quizResultData, error: quizResultError } = await supabase
    .from('quiz_results')
    .insert([{ device_id: deviceId, scores }])
    .select();
  console.log('Supabase insert data:', quizResultData);
  console.log('Supabase insert error:', quizResultError);
  if (quizResultError) {
    console.error('Supabase insert error:', quizResultError);
    return NextResponse.json({ error: quizResultError.message }, { status: 500 });
  }
  // Insert per-question responses
  const quizResultId = quizResultData && quizResultData[0]?.id;
  let responsesInsertResult = null;
  if (quizResultId && answers) {
    // Import questions to get rule_type for each question
    const { questions } = await import('@/data/questions');
    const questionMap = Object.fromEntries(questions.map(q => [q.id, q.rule]));
    const responses = Object.entries(answers).map(([questionId, score]) => ({
      quiz_result_id: quizResultId,
      question_id: Number(questionId),
      rule_type: questionMap[Number(questionId)],
      score: Number(score)
    }));
    const { data: responsesData, error: responsesError } = await supabase
      .from('question_responses')
      .insert(responses);
    responsesInsertResult = { data: responsesData, error: responsesError };
    if (responsesError) {
      console.error('Supabase question_responses insert error:', responsesError);
      return NextResponse.json({ error: responsesError.message }, { status: 500 });
    }
  }
  return NextResponse.json({ success: true, quizResult: quizResultData, responses: responsesInsertResult });
} 