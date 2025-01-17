import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers'; // Import cookies from next/headers
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { session } = req.body;

  if (!session || !session.access_token || !session.refresh_token) {
    return res.status(400).json({ error: 'Session and tokens are required.' });
  }

  // Initialize Supabase server-side client with cookies from next/headers
  const supabase = createServerComponentClient({ cookies });

  // Manually set the session
  const { error } = await supabase.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ success: true });
}
