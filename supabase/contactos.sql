CREATE TABLE IF NOT EXISTS contactos (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre     TEXT NOT NULL,
  email      TEXT NOT NULL,
  telefono   TEXT,
  mensaje    TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Solo admins pueden leer los contactos desde el backoffice
ALTER TABLE contactos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read contactos"
  ON contactos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );

-- Cualquiera puede insertar (formulario público)
CREATE POLICY "Anyone can insert contactos"
  ON contactos FOR INSERT
  WITH CHECK (true);
