import { Database } from "@/lib/supabase/database.types";

export type iUser = Database['public']['Tables']['users']['Row']