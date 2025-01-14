// components/login.tsx

'use client'; // Add this directive at the top
import React, { useState } from 'react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
    if (data.error) {
      setError(data.error);
    } else {
      console.log("Login successful, user:", data.user); // Debug log
      if (data.user) {
        window.location.href = '/admin'; // Redirect to admin page on successful login
      } else {
        setError('Login failed');
      }
    }
  };
  

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign in
        </button>
      </form>
    </div>
  );
};
