import type { StateCreator } from 'zustand';
import type { Vehicle, DispatchResult, HeatmapPoint } from '@/types';

export interface FleetSlice {
  vehicles: Vehicle[];
  dispatchResult: DispatchResult | null;
  heatmapData: HeatmapPoint[];
  setVehicles: (v: Vehicle[]) => void;
  setDispatchResult: (d: DispatchResult | null) => void;
  setHeatmapData: (h: HeatmapPoint[]) => void;
}

export const createFleetSlice: StateCreator<FleetSlice> = (set) => ({
  vehicles: [],
  dispatchResult: null,
  heatmapData: [],
  setVehicles: (vehicles) => set({ vehicles }),
  setDispatchResult: (dispatchResult) => set({ dispatchResult }),
  setHeatmapData: (heatmapData) => set({ heatmapData }),
});
