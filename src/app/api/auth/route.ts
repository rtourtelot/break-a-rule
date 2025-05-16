import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Set a base64-encoded username:password cookie
      const encoded = Buffer.from(`${username}:${password}`).toString('base64');
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Set-Cookie': `adminAuth=${encoded}; Path=/; HttpOnly; SameSite=Strict`
        }
      });
    }
    return new NextResponse('Unauthorized', { status: 401 });
  } catch (e) {
    return new NextResponse('Bad Request', { status: 400 });
  }
}

export function GET() {
  return new NextResponse('Method Not Allowed', { status: 405 });
}

export function PUT() {
  return new NextResponse('Method Not Allowed', { status: 405 });
}

export function DELETE() {
  return new NextResponse('Method Not Allowed', { status: 405 });
} 