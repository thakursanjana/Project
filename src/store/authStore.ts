import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Profile {
  id: string;
  phone: string;
  total_balance: number;
  available_balance: number;
  vip_level: number;
  last_daily_update: string;
  referral_code: string;
  referral_bonus: number;
}

interface AuthState {
  user: any | null;
  profile: Profile | null;
  setUser: (user: any) => void;
  setProfile: (profile: Profile) => void;
  signIn: (phone: string, password: string) => Promise<any>;
  signUp: (phone: string, password: string, referralCode?: string | null) => Promise<any>;
  signOut: () => Promise<void>;
  updateDailyReward: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  
  signIn: async (phone, password) => {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: `${phone}@picoin.app`,
      password,
    });
    
    if (authError) throw authError;

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    set({ user: authData.user, profile });
    return authData;
  },

  signUp: async (phone, password, referralCode = null) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: `${phone}@picoin.app`,
      password,
      phone,
    });
    
    if (authError) throw authError;

    // If there's a referral code, get the referrer's ID
    let referrerId = null;
    if (referralCode) {
      const { data: referrer } = await supabase
        .from('profiles')
        .select('id')
        .eq('referral_code', referralCode)
        .single();
      
      if (referrer) {
        referrerId = referrer.id;
      }
    }

    // Create profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user?.id,
          phone,
          referred_by: referrerId,
        },
      ])
      .select()
      .single();

    if (profileError) throw profileError;

    // If there's a referrer, create referral record and update referrer's bonus
    if (referrerId) {
      await supabase.from('referrals').insert([
        {
          referrer_id: referrerId,
          referred_id: authData.user?.id,
        },
      ]);

      await supabase.rpc('add_referral_bonus', {
        referrer_id: referrerId,
        bonus_amount: 5,
      });
    }

    set({ user: authData.user, profile });
    return authData;
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null });
  },

  updateDailyReward: async () => {
    const { profile } = get();
    if (!profile) return;

    const lastUpdate = new Date(profile.last_daily_update);
    const now = new Date();
    
    // Check if it's a new day
    if (lastUpdate.getDate() !== now.getDate() ||
        lastUpdate.getMonth() !== now.getMonth() ||
        lastUpdate.getFullYear() !== now.getFullYear()) {
      
      // Calculate reward based on VIP level
      const baseReward = profile.vip_level === 0 ? 0.1 : profile.vip_level;
      
      const { data: updatedProfile } = await supabase
        .from('profiles')
        .update({
          available_balance: profile.available_balance + baseReward,
          total_balance: profile.total_balance + baseReward,
          last_daily_update: now.toISOString(),
        })
        .eq('id', profile.id)
        .select()
        .single();

      if (updatedProfile) {
        set({ profile: updatedProfile });
      }
    }
  },
}));