'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        setMsg('Login successful!');
        setTimeout(() => router.push('/admin/analytics'), 1000);
      } else if (res.status === 401) {
        setMsg('Invalid username or password.');
      } else {
        setMsg('Unexpected error.');
      }
    } catch {
      setMsg('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: '80px auto', padding: 24, border: '1px solid #eee', borderRadius: 8, background: '#fff', boxShadow: '0 2px 8px #eee' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Admin Login</h2>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="username" style={{ display: 'block', marginBottom: 4 }}>Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          disabled={loading}
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: 4 }}>Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={loading}
          style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
      </div>
      <button type="submit" disabled={loading} style={{ width: '100%', padding: 10, borderRadius: 4, background: '#2563eb', color: '#fff', border: 'none', fontWeight: 600 }}>
        {loading ? 'Logging in…' : 'Log In'}
      </button>
      {msg && <div style={{ marginTop: 16, color: msg === 'Login successful!' ? 'green' : 'red', textAlign: 'center' }}>{msg}</div>}
    </form>
  );
} 