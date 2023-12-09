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
      folios: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          private: boolean
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          private?: boolean
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          private?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "folios_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      gallery_nodes: {
        Row: {
          description: string | null
          id: string
          node_id: string
          title: string | null
          type: "gallery"
          url: string
        }
        Insert: {
          description?: string | null
          id?: string
          node_id: string
          title?: string | null
          type?: Database["public"]["Enums"]["node_types"]
          url?: string
        }
        Update: {
          description?: string | null
          id?: string
          node_id?: string
          title?: string | null
          type?: Database["public"]["Enums"]["node_types"]
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_nodes_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "nodes"
            referencedColumns: ["id"]
          }
        ]
      }
      nodes: {
        Row: {
          created_at: string
          folio_id: string
          id: string
          title: string
          type: Database["public"]["Enums"]["node_types"]
          user_id: string
        }
        Insert: {
          created_at?: string
          folio_id: string
          id?: string
          title: string
          type?: Database["public"]["Enums"]["node_types"]
          user_id: string
        }
        Update: {
          created_at?: string
          folio_id?: string
          id?: string
          title?: string
          type?: Database["public"]["Enums"]["node_types"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nodes_folio_id_fkey"
            columns: ["folio_id"]
            isOneToOne: false
            referencedRelation: "folios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nodes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      text_nodes: {
        Row: {
          created_at: string
          id: string
          node_id: string
          text: string
          type: "text"
        }
        Insert: {
          created_at?: string
          id?: string
          node_id: string
          text: string
          type?: Database["public"]["Enums"]["node_types"]
        }
        Update: {
          created_at?: string
          id?: string
          node_id?: string
          text?: string
          type?: Database["public"]["Enums"]["node_types"]
        }
        Relationships: [
          {
            foreignKeyName: "text_nodes_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "nodes"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          plan: string
          plan_end_date: string | null
          plan_payment_date: string | null
          pretended_plan: string | null
          profile_avatar: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          plan: string
          plan_end_date?: string | null
          plan_payment_date?: string | null
          pretended_plan?: string | null
          profile_avatar: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          plan?: string
          plan_end_date?: string | null
          plan_payment_date?: string | null
          pretended_plan?: string | null
          profile_avatar?: string
          updated_at?: string
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
      node_types: "gallery" | "text"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
