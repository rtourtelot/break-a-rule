import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('rules')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching rules:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in rules GET:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, display_name, quality, description } = body;

    const { data, error } = await supabase
      .from('rules')
      .insert([{ name, display_name, quality, description }])
      .select();

    if (error) {
      console.error('Error creating rule:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error in rules POST:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, display_name, quality, description } = body;

    const { data, error } = await supabase
      .from('rules')
      .update({ name, display_name, quality, description, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating rule:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error in rules PUT:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
