import { Database } from "@/lib/supabase/database.types";

export type Plan = "default" | "premium" | "premium+"
export type iUser = Database['public']['Tables']['users']['Row']

export type iNewUser = Omit<Omit<Omit<iUser, "created_at">, "updated_at">, "id">
