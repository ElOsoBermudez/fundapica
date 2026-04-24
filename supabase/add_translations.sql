-- Añadir columnas de traducción al catalán en noticias
ALTER TABLE noticias
  ADD COLUMN IF NOT EXISTS titulo_ca TEXT,
  ADD COLUMN IF NOT EXISTS contenido_ca TEXT;

-- Añadir columnas de traducción al catalán en cursos
ALTER TABLE cursos
  ADD COLUMN IF NOT EXISTS titulo_ca TEXT,
  ADD COLUMN IF NOT EXISTS descripcion_ca TEXT,
  ADD COLUMN IF NOT EXISTS contenido_ca TEXT;
