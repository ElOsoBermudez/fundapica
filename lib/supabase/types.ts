export type AppRole = "admin" | "user";

export type Profile = {
  id: string;
  email: string;
  role: AppRole;
  created_at: string;
  updated_at: string;
};

export type Categoria = {
  id: string;
  nombre: string;
  created_at: string;
};

export type Noticia = {
  id: string;
  titulo: string;
  contenido: string | null;
  categoria_id: string | null;
  imagen_url: string | null;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      categorias: {
        Row: Categoria;
        Insert: { nombre: string };
        Update: { nombre?: string };
        Relationships: [];
      };
      noticias: {
        Row: Noticia;
        Insert: {
          titulo: string;
          contenido?: string | null;
          categoria_id?: string | null;
          imagen_url?: string | null;
        };
        Update: {
          titulo?: string;
          contenido?: string | null;
          categoria_id?: string | null;
          imagen_url?: string | null;
        };
        Relationships: [];
      };
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
