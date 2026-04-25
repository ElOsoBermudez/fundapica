-- RLS policies for backoffice content management.
-- Run this script in Supabase SQL Editor after profiles.sql.

alter table public.categorias_cursos enable row level security;
alter table public.cursos enable row level security;

-- Public read access for frontend pages.
drop policy if exists "categorias_cursos_select_public" on public.categorias_cursos;
create policy "categorias_cursos_select_public"
on public.categorias_cursos
for select
to anon, authenticated
using (true);

drop policy if exists "cursos_select_public" on public.cursos;
create policy "cursos_select_public"
on public.cursos
for select
to anon, authenticated
using (true);

-- Admin-only write access from backoffice.
drop policy if exists "categorias_cursos_insert_admin" on public.categorias_cursos;
create policy "categorias_cursos_insert_admin"
on public.categorias_cursos
for insert
to authenticated
with check (public.is_admin(auth.uid()));

drop policy if exists "categorias_cursos_update_admin" on public.categorias_cursos;
create policy "categorias_cursos_update_admin"
on public.categorias_cursos
for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "categorias_cursos_delete_admin" on public.categorias_cursos;
create policy "categorias_cursos_delete_admin"
on public.categorias_cursos
for delete
to authenticated
using (public.is_admin(auth.uid()));

drop policy if exists "cursos_insert_admin" on public.cursos;
create policy "cursos_insert_admin"
on public.cursos
for insert
to authenticated
with check (public.is_admin(auth.uid()));

drop policy if exists "cursos_update_admin" on public.cursos;
create policy "cursos_update_admin"
on public.cursos
for update
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "cursos_delete_admin" on public.cursos;
create policy "cursos_delete_admin"
on public.cursos
for delete
to authenticated
using (public.is_admin(auth.uid()));
