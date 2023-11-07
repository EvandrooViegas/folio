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
          email: string
          id: string
          plan: string
          pretended_plan: string | null
          profile_avatar: string
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          plan: string
          pretended_plan?: string | null
          profile_avatar: string
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          plan?: string
          pretended_plan?: string | null
          profile_avatar?: string
          updated_at?: string | null
          username?: string
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
