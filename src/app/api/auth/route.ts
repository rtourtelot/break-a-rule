import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET(request: Request) {
  const headersList = await headers();
  const authorization = headersList.get('authorization');

  if (!authorization) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Access"'
      }
    });
  }

  // Basic auth format: "Basic base64(username:password)"
  const [scheme, credentials] = authorization.split(' ');
  if (scheme !== 'Basic') {
    return new NextResponse('Invalid authentication scheme', { status: 400 });
  }

  const decodedCredentials = Buffer.from(credentials, 'base64').toString();
  const [username, password] = decodedCredentials.split(':');

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // Instead of redirecting, return a success response
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Set-Cookie': `adminAuth=${Buffer.from(`${username}:${password}`).toString('base64')}; Path=/; HttpOnly; SameSite=Strict`
      }
    });
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin Access"'
    }
  });
} 