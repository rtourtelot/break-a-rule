import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('landing_content')
      .select('*')
      .order('order_index');

    if (error) {
      console.error('Error fetching landing content:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in landing GET:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { section, title, content, order_index, is_active = true } = body;

    const { data, error } = await supabase
      .from('landing_content')
      .insert([{ section, title, content, order_index, is_active }])
      .select();

    if (error) {
      console.error('Error creating landing content:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error in landing POST:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, section, title, content, order_index, is_active } = body;

    const { data, error } = await supabase
      .from('landing_content')
      .update({ section, title, content, order_index, is_active, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating landing content:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error in landing PUT:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
