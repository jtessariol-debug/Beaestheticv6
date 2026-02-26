# Supabase Setup

## 1) Crear tabla `products`

Ejecuta este SQL en Supabase SQL Editor:

```sql
create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10,2) not null default 0,
  description text not null default '',
  image_url text not null default '',
  stock integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "authenticated_can_read_products"
on public.products
for select
to authenticated
using (true);

create policy "authenticated_can_insert_products"
on public.products
for insert
to authenticated
with check (true);

create policy "authenticated_can_update_products"
on public.products
for update
to authenticated
using (true)
with check (true);

create policy "authenticated_can_delete_products"
on public.products
for delete
to authenticated
using (true);
```

## 1.1) Crear tabla `site_content` (contenido de la pagina)

Ejecuta este SQL para guardar el contenido del dashboard de forma persistente:

```sql
create table if not exists public.site_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

create policy "public_can_read_site_content"
on public.site_content
for select
to public
using (true);

create policy "authenticated_can_insert_site_content"
on public.site_content
for insert
to authenticated
with check (true);

create policy "authenticated_can_update_site_content"
on public.site_content
for update
to authenticated
using (true)
with check (true);
```

## 2) Crear bucket de imagenes

En Storage crea el bucket `products` (Public bucket).

Luego ejecuta:

```sql
create policy "public_can_read_product_images"
on storage.objects
for select
to public
using (bucket_id = 'products');

create policy "authenticated_can_upload_product_images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'products');

create policy "authenticated_can_update_product_images"
on storage.objects
for update
to authenticated
using (bucket_id = 'products')
with check (bucket_id = 'products');

create policy "authenticated_can_delete_product_images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'products');
```

## 3) Variables de entorno

En `.env.local`:

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

## 4) Crear usuario admin

En Supabase Auth crea un usuario (email/password) desde el panel.

## 5) Uso de rutas

- Login admin: `/#login`
- Dashboard protegido: `/#admin`
