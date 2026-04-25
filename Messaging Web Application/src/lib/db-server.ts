import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const getServerSupabase = async () => {
  const storedCookies = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return storedCookies.getAll();
        },
        
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            storedCookies.set(name, value, options);
          });
        },
      },
    }
  );
};
