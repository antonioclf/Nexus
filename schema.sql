-- Create Viaturas Table
create table if not exists public.viaturas (
  id uuid default gen_random_uuid() primary key,
  prefixo text not null,
  tipo text not null,
  placa text not null,
  odometro numeric not null,
  combustivel numeric not null,
  status text not null,
  modelo text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Ocorrencias Table
create table if not exists public.ocorrencias (
  id uuid default gen_random_uuid() primary key,
  natureza text not null,
  data text not null,
  horario_inicio text not null,
  horario_fim text not null,
  condutor text not null, -- Storing name directly for now to match interface
  comandante text not null, -- Storing name directly for now
  odometro_inicial numeric not null,
  odometro_final numeric not null,
  siad_status text not null,
  local text not null,
  reds_id text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Abastecimentos Table
create table if not exists public.abastecimentos (
  id uuid default gen_random_uuid() primary key,
  viatura_id uuid references public.viaturas(id) not null,
  data text not null,
  horario text not null,
  motorista text not null,
  odometro numeric not null,
  nota_fiscal text not null,
  quantidade numeric not null,
  preco_por_litro numeric not null,
  total numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.viaturas enable row level security;
alter table public.ocorrencias enable row level security;
alter table public.abastecimentos enable row level security;

-- Create Policies (Open for now, can be restricted later)
create policy "Enable read access for all users" on public.viaturas for select using (true);
create policy "Enable insert access for authenticated users" on public.viaturas for insert with check (auth.role() = 'authenticated');
create policy "Enable update access for authenticated users" on public.viaturas for update using (auth.role() = 'authenticated');

create policy "Enable read access for all users" on public.ocorrencias for select using (true);
create policy "Enable insert access for authenticated users" on public.ocorrencias for insert with check (auth.role() = 'authenticated');
create policy "Enable update access for authenticated users" on public.ocorrencias for update using (auth.role() = 'authenticated');

create policy "Enable read access for all users" on public.abastecimentos for select using (true);
create policy "Enable insert access for authenticated users" on public.abastecimentos for insert with check (auth.role() = 'authenticated');
