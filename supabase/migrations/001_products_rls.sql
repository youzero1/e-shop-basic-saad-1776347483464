-- Enable RLS on products table
alter table products enable row level security;

-- Allow anyone (anon) to read products
create policy "Public read access"
  on products
  for select
  to anon
  using (true);
