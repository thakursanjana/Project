/*
  # Initial Schema Setup for PI Coin

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `phone` (text, unique)
      - `total_balance` (decimal)
      - `available_balance` (decimal)
      - `vip_level` (integer)
      - `last_daily_update` (timestamp)
      - `created_at` (timestamp)
    
    - `transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `type` (text: 'recharge', 'withdrawal', 'daily_reward', 'vip_purchase')
      - `amount` (decimal)
      - `status` (text: 'pending', 'completed', 'rejected')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  phone text UNIQUE NOT NULL,
  total_balance decimal DEFAULT 0,
  available_balance decimal DEFAULT 0,
  vip_level integer DEFAULT 0,
  last_daily_update timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  type text NOT NULL CHECK (type IN ('recharge', 'withdrawal', 'daily_reward', 'vip_purchase')),
  amount decimal NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'rejected')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Transactions policies
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);