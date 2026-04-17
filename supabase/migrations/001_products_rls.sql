-- Enable RLS on products table
alter table if exists products enable row level security;

-- Allow anyone (anon) to read products
drop policy if exists "anon can read products" on products;
create policy "anon can read products"
  on products
  for select
  to anon
  using (true);
