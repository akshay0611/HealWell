import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

export const useAuth = () => {
  // Explicitly define the state type to be `User | null`
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
  
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
  
      setLoading(false);
    };
  
    fetchSession();
  
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
  
    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, []);
  

  // Return early if we're loading the session
  if (loading) {
    return null; // Optionally, return a loading spinner or some placeholder
  }

  return user; // Return the user object (or null if not authenticated)
};