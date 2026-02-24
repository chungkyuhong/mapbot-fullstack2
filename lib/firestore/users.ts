// ============================================================
// Firestore — User/Points Management (with simulation fallback)
// ============================================================
import { db, isFirebaseConfigured } from '@/lib/firebase';

interface PointsHistory {
  amount: number;
  type: 'earn' | 'spend';
  description: string;
  timestamp: string;
}

// In-memory state for simulation
const memoryState: Record<string, { points: number; history: PointsHistory[] }> = {};

function getOrCreate(userId: string) {
  if (!memoryState[userId]) {
    memoryState[userId] = { points: 500, history: [] };
  }
  return memoryState[userId];
}

export async function getUserPoints(userId: string): Promise<number> {
  if (!isFirebaseConfigured || !db) {
    return getOrCreate(userId).points;
  }
  try {
    const { doc, getDoc } = await import('firebase/firestore');
    const snap = await getDoc(doc(db, 'users', userId));
    return snap.exists() ? (snap.data().muPoints ?? 500) : 500;
  } catch {
    return getOrCreate(userId).points;
  }
}

export async function updateUserPoints(userId: string, delta: number, description: string): Promise<number> {
  if (!isFirebaseConfigured || !db) {
    const state = getOrCreate(userId);
    state.points = Math.max(0, state.points + delta);
    state.history.push({
      amount: Math.abs(delta),
      type: delta > 0 ? 'earn' : 'spend',
      description,
      timestamp: new Date().toISOString(),
    });
    return state.points;
  }
  try {
    const { doc, runTransaction } = await import('firebase/firestore');
    const userRef = doc(db, 'users', userId);
    const newPoints = await runTransaction(db, async (txn) => {
      const snap = await txn.get(userRef);
      const current = snap.exists() ? (snap.data().muPoints ?? 500) : 500;
      const updated = Math.max(0, current + delta);
      txn.set(userRef, {
        muPoints: updated,
        lastUpdated: new Date().toISOString(),
      }, { merge: true });
      return updated;
    });
    return newPoints;
  } catch {
    const state = getOrCreate(userId);
    state.points = Math.max(0, state.points + delta);
    return state.points;
  }
}

export async function getPointsHistory(userId: string): Promise<PointsHistory[]> {
  if (!isFirebaseConfigured || !db) {
    return getOrCreate(userId).history;
  }
  try {
    const { doc, getDoc } = await import('firebase/firestore');
    const snap = await getDoc(doc(db, 'users', userId));
    return snap.exists() ? (snap.data().pointsHistory ?? []) : [];
  } catch {
    return getOrCreate(userId).history;
  }
}
