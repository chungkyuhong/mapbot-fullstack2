// ============================================================
// Firestore — Booking CRUD (with simulation fallback)
// ============================================================
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { generateId } from '@/lib/utils';
import type { Booking } from '@/types';

// In-memory store for simulation
const memoryBookings: Booking[] = [];

export async function createBooking(data: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> {
  const booking: Booking = {
    ...data,
    id: generateId('booking'),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (!isFirebaseConfigured || !db) {
    memoryBookings.push(booking);
    return booking;
  }

  try {
    const { collection, addDoc } = await import('firebase/firestore');
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...booking,
      createdAt: booking.createdAt.toISOString(),
      updatedAt: booking.updatedAt.toISOString(),
    });
    return { ...booking, id: docRef.id };
  } catch {
    memoryBookings.push(booking);
    return booking;
  }
}

export async function getBookingsByUser(userId: string): Promise<Booking[]> {
  if (!isFirebaseConfigured || !db) {
    return memoryBookings.filter((b) => b.userId === userId);
  }
  try {
    const { collection, query, where, getDocs, orderBy } = await import('firebase/firestore');
    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Booking));
  } catch {
    return memoryBookings.filter((b) => b.userId === userId);
  }
}

export async function updateBookingStatus(bookingId: string, status: Booking['status']): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    const idx = memoryBookings.findIndex((b) => b.id === bookingId);
    if (idx >= 0) { memoryBookings[idx].status = status; memoryBookings[idx].updatedAt = new Date(); }
    return;
  }
  try {
    const { doc, updateDoc } = await import('firebase/firestore');
    await updateDoc(doc(db, 'bookings', bookingId), { status, updatedAt: new Date().toISOString() });
  } catch {}
}
