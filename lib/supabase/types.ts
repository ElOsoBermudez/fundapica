export type AppRole = "admin" | "user";

export type Profile = {
  id: string;
  email: string;
  role: AppRole;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          email: string;
          role?: AppRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string;
          role?: AppRole;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: {
          uid: string;
        };
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
