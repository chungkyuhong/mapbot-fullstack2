// ============================================================
// Firestore — Vehicle CRUD (with simulation fallback)
// ============================================================
import { db, isFirebaseConfigured } from '@/lib/firebase';
import type { Vehicle } from '@/types';

// Simulation pool
const SIMULATION_VEHICLES: Vehicle[] = [
  { id: 'DRT-001', type: '전기 미니밴', status: 'available', location: { lat: 36.032, lng: 129.365 }, locationName: '포항역 앞', driverName: '김기사', capacity: 6, currentPassengers: 0, etaMinutes: 0, batteryLevel: 92, isEV: true, rating: 4.9, heading: 45, speed: 0, lastUpdated: new Date() },
  { id: 'DRT-002', type: '전기 세단', status: 'busy', location: { lat: 36.009, lng: 129.354 }, locationName: 'POSCO 앞', driverName: '이기사', capacity: 4, currentPassengers: 2, etaMinutes: 8, batteryLevel: 78, isEV: true, rating: 4.8, heading: 180, speed: 35, lastUpdated: new Date() },
  { id: 'DRT-003', type: '미니버스', status: 'available', location: { lat: 36.062, lng: 129.385 }, locationName: '영일대 해수욕장', driverName: '박기사', capacity: 12, currentPassengers: 0, etaMinutes: 0, batteryLevel: undefined, isEV: false, rating: 4.7, heading: 90, speed: 0, lastUpdated: new Date() },
  { id: 'DRT-004', type: '프리미엄 세단', status: 'available', location: { lat: 36.024, lng: 129.365 }, locationName: '죽도시장', driverName: '최기사', capacity: 4, currentPassengers: 0, etaMinutes: 0, batteryLevel: undefined, isEV: false, rating: 4.95, heading: 270, speed: 0, lastUpdated: new Date() },
  { id: 'DRT-005', type: '전기 SUV', status: 'offline', location: { lat: 36.018, lng: 129.342 }, locationName: '포항성모병원', driverName: '정기사', capacity: 5, currentPassengers: 0, etaMinutes: 0, batteryLevel: 15, isEV: true, rating: 4.6, heading: 0, speed: 0, lastUpdated: new Date() },
  { id: 'DRT-006', type: '택시', status: 'busy', location: { lat: 35.987, lng: 129.420 }, locationName: '포항공항', driverName: '한기사', capacity: 4, currentPassengers: 1, etaMinutes: 12, batteryLevel: undefined, isEV: false, rating: 4.85, heading: 135, speed: 40, lastUpdated: new Date() },
];

export async function getVehicles(): Promise<Vehicle[]> {
  if (!isFirebaseConfigured || !db) {
    return SIMULATION_VEHICLES;
  }
  try {
    const { collection, getDocs } = await import('firebase/firestore');
    const snapshot = await getDocs(collection(db, 'vehicles'));
    if (snapshot.empty) return SIMULATION_VEHICLES;
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Vehicle));
  } catch {
    return SIMULATION_VEHICLES;
  }
}

export async function getAvailableVehicles(): Promise<Vehicle[]> {
  const vehicles = await getVehicles();
  return vehicles.filter((v) => v.status === 'available');
}
