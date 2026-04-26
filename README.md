# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

## Supabase setup

Create a `.env.local` file using `.env.local.example` and set:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Then run the SQL files in your Supabase project (SQL Editor), in this order:

```sql
-- 1) profiles and admin helper function
supabase/profiles.sql

-- 2) optional translation columns
supabase/add_translations.sql

-- 3) RLS policies for backoffice write access
supabase/backoffice_policies.sql

-- 4) promote the backoffice account to admin
supabase/grant_admin.sql
```

##BACKOFFICE
javier.ferrer@ifp.es
cjb7Hj2EVY9

Backoffice
dashboard
noticias
cursos
fotos y videos
