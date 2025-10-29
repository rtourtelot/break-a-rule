import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('rule_name, order_index');

    if (error) {
      console.error('Error fetching questions:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in questions GET:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { rule_name, text, order_index, is_active = true } = body;

    const { data, error } = await supabase
      .from('questions')
      .insert([{ rule_name, text, order_index, is_active }])
      .select();

    if (error) {
      console.error('Error creating question:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error in questions POST:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, rule_name, text, order_index, is_active } = body;

    const { data, error } = await supabase
      .from('questions')
      .update({ rule_name, text, order_index, is_active, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating question:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error in questions PUT:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
