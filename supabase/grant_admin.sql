-- Promote an existing authenticated user to admin.
-- Replace the email below with the backoffice account you want to authorize.

update public.profiles
set role = 'admin'
where email = 'javier.ferrer@ifp.es';

select id, email, role
from public.profiles
where email = 'javier.ferrer@ifp.es';
