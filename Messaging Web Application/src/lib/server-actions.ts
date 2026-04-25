import { getServerSupabase } from "./db-server";

export async function getServerUserSession() {
    const supabase = await getServerSupabase();
    const { data: { user }, error} = await supabase.auth.getUser();
    if (error) console.error(`geUserSession (server) error: t${error}`);

    return user ?? null;
}
