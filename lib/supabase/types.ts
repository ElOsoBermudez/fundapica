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
  titulo_ca: string | null;
  contenido_ca: string | null;
  categoria_id: string | null;
  imagen_url: string | null;
  created_at: string;
};

export type TipoCurso = "personas" | "empresas" | "ambos";
export type TipoCategoriaCurso = "personas" | "empresas";

export type CategoriaCurso = {
  id: string;
  nombre: string;
  tipo: TipoCategoriaCurso;
  created_at: string;
};

export type Curso = {
  id: string;
  titulo: string;
  descripcion: string | null;
  contenido: string | null;
  titulo_ca: string | null;
  descripcion_ca: string | null;
  contenido_ca: string | null;
  tipo: TipoCurso | null;
  categoria_id: string | null;
  imagen_url: string | null;
  pdf_url: string | null;
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
          titulo_ca?: string | null;
          contenido_ca?: string | null;
          categoria_id?: string | null;
          imagen_url?: string | null;
        };
        Update: {
          titulo?: string;
          contenido?: string | null;
          titulo_ca?: string | null;
          contenido_ca?: string | null;
          categoria_id?: string | null;
          imagen_url?: string | null;
        };
        Relationships: [];
      };
      categorias_cursos: {
        Row: CategoriaCurso;
        Insert: { nombre: string; tipo: TipoCategoriaCurso };
        Update: { nombre?: string; tipo?: TipoCategoriaCurso };
        Relationships: [];
      };
      cursos: {
        Row: Curso;
        Insert: {
          titulo: string;
          descripcion?: string | null;
          contenido?: string | null;
          titulo_ca?: string | null;
          descripcion_ca?: string | null;
          contenido_ca?: string | null;
          tipo?: TipoCurso | null;
          categoria_id?: string | null;
          imagen_url?: string | null;
          pdf_url?: string | null;
        };
        Update: {
          titulo?: string;
          descripcion?: string | null;
          contenido?: string | null;
          titulo_ca?: string | null;
          descripcion_ca?: string | null;
          contenido_ca?: string | null;
          tipo?: TipoCurso | null;
          categoria_id?: string | null;
          imagen_url?: string | null;
          pdf_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "cursos_categoria_id_fkey";
            columns: ["categoria_id"];
            referencedRelation: "categorias_cursos";
            referencedColumns: ["id"];
          }
        ];
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
