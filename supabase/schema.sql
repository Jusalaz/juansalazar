-- Ejecuta este script UNA VEZ en Supabase Dashboard -> SQL Editor -> New query
-- Crea las tablas de contenido, las políticas de acceso público de solo lectura
-- para lo publicado, y los buckets de storage para imágenes y recursos descargables.

create extension if not exists pgcrypto;

-- ---------- POSTS (blog: finanzas, IA y emprendimiento) ----------
do $$ begin
  create type post_category as enum ('finanzas', 'ia', 'emprendimiento');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content text not null,
  category post_category not null default 'finanzas',
  cover_image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Seguro de re-ejecutar si la tabla ya existía sin esta columna.
alter table public.posts add column if not exists category post_category not null default 'finanzas';

-- ---------- BOOKS (reseñas de libros) ----------
create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  author text not null,
  cover_image_url text,
  review text not null,
  rating smallint check (rating between 1 and 5),
  link_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- RESOURCES (Excel, HTML, cursos descargables) ----------
do $$ begin
  create type resource_type as enum ('excel', 'html', 'curso');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  type resource_type not null,
  file_url text not null,
  file_name text not null,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- PROMPTS (para copiar y usar en herramientas de IA) ----------
create table if not exists public.prompts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  content text not null,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- Row Level Security ----------
-- El panel admin escribe con la service_role key (que ignora RLS).
-- Estas políticas solo habilitan lectura pública de lo publicado.
alter table public.posts enable row level security;
alter table public.books enable row level security;
alter table public.resources enable row level security;
alter table public.prompts enable row level security;

drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts" on public.posts
  for select using (published = true);

drop policy if exists "Public can read published books" on public.books;
create policy "Public can read published books" on public.books
  for select using (published = true);

drop policy if exists "Public can read published resources" on public.resources;
create policy "Public can read published resources" on public.resources
  for select using (published = true);

drop policy if exists "Public can read published prompts" on public.prompts;
create policy "Public can read published prompts" on public.prompts
  for select using (published = true);

-- ---------- Storage buckets ----------
insert into storage.buckets (id, name, public)
  values ('media', 'media', true)
  on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
  values ('resources', 'resources', true)
  on conflict (id) do nothing;

drop policy if exists "Public read media" on storage.objects;
create policy "Public read media" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "Public read resources" on storage.objects;
create policy "Public read resources" on storage.objects
  for select using (bucket_id = 'resources');
