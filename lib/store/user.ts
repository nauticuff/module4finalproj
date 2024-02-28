import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface UserState {
  user: User | null;
  resetUser: () => void
}

export const useUser = create<UserState>()((set) => ({
  user: null,
  resetUser: () =>
    set(() => ({ user: null }))
}));
