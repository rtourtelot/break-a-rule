import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(req: NextRequest) {
  // Try to get deviceId from cookies
  const deviceId = req.cookies.get('deviceId')?.value;
  const userAgent = req.headers.get('user-agent') || undefined;
  const ipAddress = req.headers.get('x-forwarded-for') || req.ip || undefined;

  let latestResult = null;
  if (deviceId) {
    latestResult = await prisma.quizResult.findFirst({
      where: { deviceId },
      orderBy: { createdAt: 'desc' },
    });
  } else if (userAgent && ipAddress) {
    latestResult = await prisma.quizResult.findFirst({
      where: { userAgent, ipAddress },
      orderBy: { createdAt: 'desc' },
    });
  } else {
    latestResult = await prisma.quizResult.findFirst({
      orderBy: { createdAt: 'desc' },
    });
  }

  if (latestResult) {
    await prisma.quizResult.delete({ where: { id: latestResult.id } });
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, message: 'No result found' }, { status: 404 });
} 