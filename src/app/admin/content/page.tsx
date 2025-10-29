import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import ContentEditor from '@/components/ContentEditor';

async function isAuthorized() {
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get('adminAuth')?.value;
  if (!adminAuth) return false;
  
  try {
    const decoded = Buffer.from(adminAuth, 'base64').toString('utf-8');
    const [username, password] = decoded.split(':');
    return username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

export default async function AdminContentPage() {
  const authorized = await isAuthorized();
  if (!authorized) {
    return redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <div className="flex gap-4">
            <a 
              href="/admin/analytics" 
              className="px-4 py-2 text-blue-600 hover:underline"
            >
              Analytics
            </a>
            <a 
              href="/admin/entrants" 
              className="px-4 py-2 text-blue-600 hover:underline"
            >
              Entrants
            </a>
            <a 
              href="/admin/content" 
              className="px-4 py-2 text-indigo-600 font-bold underline"
            >
              Content
            </a>
          </div>
        </div>
        <ContentEditor />
      </div>
    </div>
  );
}
