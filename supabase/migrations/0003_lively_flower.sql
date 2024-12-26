/*
  # Add transaction functionality

  1. Functions
    - process_recharge: Handles recharge transactions
    - process_withdrawal: Handles withdrawal transactions
    - process_vip_purchase: Handles VIP level purchases
    - update_referral_bonus: Updates referral bonus based on VIP purchase
*/

-- Function to process recharge
CREATE OR REPLACE FUNCTION process_recharge(
  user_id UUID,
  amount DECIMAL
) RETURNS profiles AS $$
DECLARE
  updated_profile profiles;
BEGIN
  -- Create transaction record
  INSERT INTO transactions (user_id, type, amount, status)
  VALUES (user_id, 'recharge', amount, 'completed');

  -- Update user balance
  UPDATE profiles
  SET available_balance = available_balance + amount
  WHERE id = user_id
  RETURNING * INTO updated_profile;

  RETURN updated_profile;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to process withdrawal
CREATE OR REPLACE FUNCTION process_withdrawal(
  user_id UUID,
  amount DECIMAL
) RETURNS profiles AS $$
DECLARE
  updated_profile profiles;
BEGIN
  -- Check if user has sufficient balance
  IF NOT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = user_id AND available_balance >= amount
  ) THEN
    RAISE EXCEPTION 'Insufficient balance';
  END IF;

  -- Create transaction record
  INSERT INTO transactions (user_id, type, amount, status)
  VALUES (user_id, 'withdrawal', amount, 'pending');

  -- Update user balance
  UPDATE profiles
  SET available_balance = available_balance - amount
  WHERE id = user_id
  RETURNING * INTO updated_profile;

  RETURN updated_profile;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to process VIP purchase
CREATE OR REPLACE FUNCTION process_vip_purchase(
  user_id UUID,
  vip_level INTEGER,
  price DECIMAL
) RETURNS profiles AS $$
DECLARE
  updated_profile profiles;
  referrer_id UUID;
  bonus_amount DECIMAL;
BEGIN
  -- Check if user has sufficient balance
  IF NOT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = user_id AND available_balance >= price
  ) THEN
    RAISE EXCEPTION 'Insufficient balance';
  END IF;

  -- Get referrer ID
  SELECT referred_by INTO referrer_id
  FROM profiles
  WHERE id = user_id;

  -- Calculate referral bonus based on VIP level
  bonus_amount := vip_level * 5;

  -- Update referrer's bonus if exists
  IF referrer_id IS NOT NULL THEN
    UPDATE profiles
    SET referral_bonus = referral_bonus + bonus_amount,
        available_balance = available_balance + bonus_amount,
        total_balance = total_balance + bonus_amount
    WHERE id = referrer_id;
  END IF;

  -- Create transaction record
  INSERT INTO transactions (user_id, type, amount, status)
  VALUES (user_id, 'vip_purchase', price, 'completed');

  -- Update user profile
  UPDATE profiles
  SET available_balance = available_balance - price,
      vip_level = vip_level
  WHERE id = user_id
  RETURNING * INTO updated_profile;

  RETURN updated_profile;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;