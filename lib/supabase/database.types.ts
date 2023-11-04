export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          created_at: string
          email: Json 
          id: string
          plan: string 
          profile_avatar: string
          updated_at: string 
        }
        Insert: {
          created_at?: string
          email?: Json | null
          id?: string
          plan?: string | null
          profile_avatar?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          email?: Json | null
          id?: string
          plan?: string | null
          profile_avatar?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
