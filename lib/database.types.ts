// Database types for the Empirical-Open Supabase schema.
// Hand-authored to match empirical-open-backend migrations
// (20260810120000_initial_schema.sql). Regenerate with
// `npm run types:gen` in the backend repo to refresh after
// future schema changes.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type UserRole = 'admin' | 'editor' | 'user'
export type AvatarColor = 'jade' | 'gold' | 'rust'
export type JournalStatus = 'active' | 'archived'
export type CfpStatus = 'open' | 'closed' | 'draft'
export type RequestStatus = 'pending' | 'approved' | 'rejected'

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          affiliation: string
          role: UserRole
          avatar_color: AvatarColor
          verified: boolean
          created_at: string
        }
        Insert: {
          id: string
          name?: string
          affiliation?: string
          role?: UserRole
          avatar_color?: AvatarColor
          verified?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          affiliation?: string
          role?: UserRole
          avatar_color?: AvatarColor
          verified?: boolean
          created_at?: string
        }
        Relationships: []
      }
      journals: {
        Row: {
          id: string
          name: string
          initials: string
          discipline: string
          founded_year: number | null
          institution: string
          description: string
          editor_in_chief: string
          editorial_board: Json
          frequency: string
          indexing: string[]
          status: JournalStatus
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          initials?: string
          discipline: string
          founded_year?: number | null
          institution?: string
          description?: string
          editor_in_chief?: string
          editorial_board?: Json
          frequency?: string
          indexing?: string[]
          status?: JournalStatus
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['journals']['Insert']>
        Relationships: []
      }
      articles: {
        Row: {
          id: string
          journal_id: string
          title: string
          authors: string
          abstract: string
          publication_date: string | null
          discipline: string
          views: number
          citations: number
          created_at: string
        }
        Insert: {
          id?: string
          journal_id: string
          title: string
          authors?: string
          abstract?: string
          publication_date?: string | null
          discipline: string
          views?: number
          citations?: number
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['articles']['Insert']>
        Relationships: [
          {
            foreignKeyName: 'articles_journal_id_fkey'
            columns: ['journal_id']
            isOneToOne: false
            referencedRelation: 'journals'
            referencedColumns: ['id']
          },
        ]
      }
      calls_for_papers: {
        Row: {
          id: string
          journal_id: string
          title: string
          scope: string
          full_description: string
          closes_date: string
          disciplines: string[]
          guidelines: Json
          ojs_link: string
          contact_email: string
          submissions_count: number
          status: CfpStatus
          created_at: string
        }
        Insert: {
          id?: string
          journal_id: string
          title: string
          scope?: string
          full_description?: string
          closes_date: string
          disciplines?: string[]
          guidelines?: Json
          ojs_link?: string
          contact_email?: string
          submissions_count?: number
          status?: CfpStatus
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['calls_for_papers']['Insert']>
        Relationships: [
          {
            foreignKeyName: 'calls_for_papers_journal_id_fkey'
            columns: ['journal_id']
            isOneToOne: false
            referencedRelation: 'journals'
            referencedColumns: ['id']
          },
        ]
      }
      comments: {
        Row: {
          id: string
          article_id: string
          parent_id: string | null
          author_id: string | null
          author_name: string
          author_affiliation: string
          author_initials: string
          author_color: AvatarColor
          verified: boolean
          body: string
          likes_count: number
          created_at: string
        }
        Insert: {
          id?: string
          article_id: string
          parent_id?: string | null
          author_id?: string | null
          author_name: string
          author_affiliation?: string
          author_initials?: string
          author_color?: AvatarColor
          verified?: boolean
          body: string
          likes_count?: number
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['comments']['Insert']>
        Relationships: [
          {
            foreignKeyName: 'comments_article_id_fkey'
            columns: ['article_id']
            isOneToOne: false
            referencedRelation: 'articles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'comments_parent_id_fkey'
            columns: ['parent_id']
            isOneToOne: false
            referencedRelation: 'comments'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'comments_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      comment_likes: {
        Row: { comment_id: string; user_id: string; created_at: string }
        Insert: { comment_id: string; user_id: string; created_at?: string }
        Update: { comment_id?: string; user_id?: string; created_at?: string }
        Relationships: [
          {
            foreignKeyName: 'comment_likes_comment_id_fkey'
            columns: ['comment_id']
            isOneToOne: false
            referencedRelation: 'comments'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'comment_likes_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      saved_articles: {
        Row: { user_id: string; article_id: string; created_at: string }
        Insert: { user_id: string; article_id: string; created_at?: string }
        Update: { user_id?: string; article_id?: string; created_at?: string }
        Relationships: [
          {
            foreignKeyName: 'saved_articles_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'saved_articles_article_id_fkey'
            columns: ['article_id']
            isOneToOne: false
            referencedRelation: 'articles'
            referencedColumns: ['id']
          },
        ]
      }
      announcements: {
        Row: {
          id: string
          title: string
          body: string
          source: string
          published_at: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          body?: string
          source?: string
          published_at?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['announcements']['Insert']>
        Relationships: []
      }
      integration_requests: {
        Row: {
          id: string
          journal_name: string
          issn: string
          website_url: string
          institution: string
          contact_name: string
          contact_email: string
          status: RequestStatus
          admin_note: string
          reviewed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          journal_name: string
          issn?: string
          website_url: string
          institution?: string
          contact_name?: string
          contact_email: string
          status?: RequestStatus
          admin_note?: string
          reviewed_at?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['integration_requests']['Insert']>
        Relationships: []
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject?: string
          message: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['contact_messages']['Insert']>
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: {
      increment_article_views: {
        Args: { p_article_id: string }
        Returns: undefined
      }
      is_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
    }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']
