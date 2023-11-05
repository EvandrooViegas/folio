import { Database } from "@/lib/supabase/database.types";

export type Plan = "default" | "premium" | "premium+"
export type iUser = Database['public']['Tables']['users']['Row']

export type iNewUser = {
    username: string,
    email: string,
    profile_avatar: string,
    plan: Plan
}