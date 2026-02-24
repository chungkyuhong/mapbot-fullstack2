'use client';
// ============================================================
// Zustand Global Store — Slice Composition
// ============================================================
import { create } from 'zustand';
import { createRouteSlice, type RouteSlice } from './stores/routeStore';
import { createFleetSlice, type FleetSlice } from './stores/fleetStore';
import { createWalletSlice, type WalletSlice } from './stores/walletStore';
import { createUISlice, type UISlice } from './stores/uiStore';
import { createAuthSlice, type AuthSlice } from './stores/authStore';

// Combined store type (backward compatible with MapBotState)
export type MapBotStore = RouteSlice & FleetSlice & WalletSlice & UISlice & AuthSlice;

export const useMapBotStore = create<MapBotStore>()((...a) => ({
  ...createRouteSlice(...a),
  ...createFleetSlice(...a),
  ...createWalletSlice(...a),
  ...createUISlice(...a),
  ...createAuthSlice(...a),
}));
