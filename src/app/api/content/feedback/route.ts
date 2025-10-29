import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('feedback_messages')
      .select('*')
      .order('rule_name, min_score');

    if (error) {
      console.error('Error fetching feedback messages:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in feedback GET:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { rule_name, score_range, min_score, max_score, message } = body;

    const { data, error } = await supabase
      .from('feedback_messages')
      .insert([{ rule_name, score_range, min_score, max_score, message }])
      .select();

    if (error) {
      console.error('Error creating feedback message:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error in feedback POST:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, rule_name, score_range, min_score, max_score, message } = body;

    const { data, error } = await supabase
      .from('feedback_messages')
      .update({ rule_name, score_range, min_score, max_score, message, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating feedback message:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error in feedback PUT:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
