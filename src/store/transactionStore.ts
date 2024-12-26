import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';

interface TransactionStore {
  processing: boolean;
  recharge: (amount: number) => Promise<void>;
  withdraw: (amount: number) => Promise<void>;
  purchaseVIP: (level: number, price: number) => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  processing: false,

  recharge: async (amount: number) => {
    set({ processing: true });
    try {
      const { data, error } = await supabase.rpc('process_recharge', {
        amount,
      });
      if (error) throw error;
      useAuthStore.getState().setProfile(data);
    } finally {
      set({ processing: false });
    }
  },

  withdraw: async (amount: number) => {
    set({ processing: true });
    try {
      const { data, error } = await supabase.rpc('process_withdrawal', {
        amount,
      });
      if (error) throw error;
      useAuthStore.getState().setProfile(data);
    } finally {
      set({ processing: false });
    }
  },

  purchaseVIP: async (level: number, price: number) => {
    set({ processing: true });
    try {
      const { data, error } = await supabase.rpc('process_vip_purchase', {
        vip_level: level,
        price,
      });
      if (error) throw error;
      useAuthStore.getState().setProfile(data);
    } finally {
      set({ processing: false });
    }
  },
}));