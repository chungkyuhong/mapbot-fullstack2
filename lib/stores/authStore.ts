import type { StateCreator } from 'zustand';

export interface AuthSlice {
  userId: string | null;
  setUserId: (id: string | null) => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  userId: null,
  setUserId: (userId) => set({ userId }),
});
