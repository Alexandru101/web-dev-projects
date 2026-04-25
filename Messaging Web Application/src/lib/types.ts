export type Profile = {
    id: string;
    darkTheme: boolean;
    image: string | null;
    username: string;
};

export type SupabaseUser = {
    id: string;
    email: string;
};
