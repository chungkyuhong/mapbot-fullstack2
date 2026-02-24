import type { StateCreator } from 'zustand';

export interface UISlice {
  activeTab: string;
  isLoading: boolean;
  error: string | null;
  setActiveTab: (tab: string) => void;
  setLoading: (b: boolean) => void;
  setError: (e: string | null) => void;
}

export const createUISlice: StateCreator<UISlice> = (set) => ({
  activeTab: 'home',
  isLoading: false,
  error: null,
  setActiveTab: (activeTab) => set({ activeTab }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
});
