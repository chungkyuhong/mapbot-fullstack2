import type { StateCreator } from 'zustand';

export interface WalletSlice {
  muPoints: number;
  setMuPoints: (p: number) => void;
  addPoints: (amount: number) => void;
  deductPoints: (amount: number) => void;
}

export const createWalletSlice: StateCreator<WalletSlice> = (set) => ({
  muPoints: 500,
  setMuPoints: (muPoints) => set({ muPoints }),
  addPoints: (amount) => set((state) => ({ muPoints: state.muPoints + amount })),
  deductPoints: (amount) => set((state) => ({ muPoints: Math.max(0, state.muPoints - amount) })),
});
