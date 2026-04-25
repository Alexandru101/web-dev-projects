import { supabase } from "./db-client";

export async function getClientUserSession() {
    const { data: { user }, error} = await supabase.auth.getUser();
    if (error) console.error(`getClientUserSession (Client) error: ${error}`);

    return user ?? null;
};
