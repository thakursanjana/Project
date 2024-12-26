/*
  # Add referral system and daily rewards

  1. Updates
    - Add referral_code to profiles
    - Add referred_by to profiles
    - Add last_reward_claim to profiles
    - Add referral_bonus to profiles

  2. New Tables
    - referrals: Track referral relationships and bonuses
*/

-- Add new columns to profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE DEFAULT gen_random_uuid()::text,
ADD COLUMN IF NOT EXISTS referred_by UUID REFERENCES profiles(id),
ADD COLUMN IF NOT EXISTS last_reward_claim TIMESTAMPTZ DEFAULT now(),
ADD COLUMN IF NOT EXISTS referral_bonus DECIMAL DEFAULT 0;

-- Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES profiles(id) NOT NULL,
  referred_id UUID REFERENCES profiles(id) NOT NULL,
  bonus_amount DECIMAL DEFAULT 5, -- $5 bonus for each referral
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(referred_id)
);

-- Enable RLS
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Referrals policies
CREATE POLICY "Users can view own referrals"
  ON referrals FOR SELECT
  TO authenticated
  USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

CREATE POLICY "Users can insert referrals"
  ON referrals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = referred_id);