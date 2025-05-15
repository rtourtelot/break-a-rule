import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function DELETE(req: NextRequest) {
  const deviceId = req.cookies.get('deviceId')?.value;
  if (!deviceId) {
    return NextResponse.json({ error: 'No deviceId' }, { status: 400 });
  }
  // Get the latest result for this device
  const { data: latest, error: fetchError } = await supabase
    .from('quiz_results')
    .select('id')
    .eq('device_id', deviceId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  if (fetchError || !latest) {
    return NextResponse.json({ error: fetchError?.message || 'No result found' }, { status: 404 });
  }
  // Delete the latest result
  const { error: deleteError } = await supabase
    .from('quiz_results')
    .delete()
    .eq('id', latest.id);
  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
} 