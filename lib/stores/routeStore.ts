import type { StateCreator } from 'zustand';
import type { RouteOption, RouteSearchParams } from '@/types';

export interface RouteSlice {
  routeOptions: RouteOption[];
  selectedRoute: RouteOption | null;
  searchParams: Partial<RouteSearchParams>;
  setRouteOptions: (r: RouteOption[]) => void;
  setSelectedRoute: (r: RouteOption | null) => void;
  updateSearchParam: (key: string, value: unknown) => void;
}

export const createRouteSlice: StateCreator<RouteSlice> = (set) => ({
  routeOptions: [],
  selectedRoute: null,
  searchParams: {},
  setRouteOptions: (routeOptions) => set({ routeOptions }),
  setSelectedRoute: (selectedRoute) => set({ selectedRoute }),
  updateSearchParam: (key, value) =>
    set((state) => ({ searchParams: { ...state.searchParams, [key]: value } })),
});
