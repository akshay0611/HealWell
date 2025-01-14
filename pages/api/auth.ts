// pages/api/auth.ts
import { supabase } from '@/lib/supabaseClient';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Set the token in cookies
    res.setHeader('Set-Cookie', `supabase-auth-token=${data.session?.access_token}; Path=/; HttpOnly; Secure; SameSite=Strict`);

    return res.status(200).json({ user: data?.user });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}