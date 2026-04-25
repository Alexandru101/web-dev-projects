import { createBrowserClient } from '@supabase/ssr';
import { SupabaseUser, Profile } from './types';

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const createUserProfile = async (user: SupabaseUser): Promise<Profile | null> => {
  const username = user.email?.split('@')[0] ?? "";
  
  const { data: newProfile, error: insertError } = await supabase
  .from("profiles")
  .insert({
    id: user.id,
    darkTheme: true,
    image: null,
    username: username,
  }).select().single();

  if (insertError) {
    alert("Failed to insert/create database column: " + insertError.message);
    return null;
  }

  return newProfile as Profile;  
};
