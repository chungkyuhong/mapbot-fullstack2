// ============================================================
// API — Booking CRUD
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { createBooking, getBookingsByUser, updateBookingStatus } from '@/lib/firestore/bookings';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, routeOption, dispatchResult, amount, muPointsUsed = 0,
      muPointsEarned = 0, paymentMethod = 'card', phone, notes } = body;

    if (!userId) {
      return NextResponse.json({ success: false, error: 'userId 필수' }, { status: 400 });
    }
    if (!type || !['transit', 'drt', 'lodging'].includes(type)) {
      return NextResponse.json({ success: false, error: '유효하지 않은 예약 유형' }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json({ success: false, error: '연락처 필수' }, { status: 400 });
    }

    const booking = await createBooking({
      userId,
      type,
      status: 'confirmed',
      routeOption,
      dispatchResult,
      amount: amount ?? 0,
      muPointsUsed,
      muPointsEarned,
      paymentMethod,
      phone,
      notes,
    });

    return NextResponse.json({
      success: true,
      data: booking,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: '예약 생성 실패', timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ success: false, error: 'userId 필수' }, { status: 400 });
    }

    const bookings = await getBookingsByUser(userId);
    return NextResponse.json({
      success: true,
      data: bookings,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: '예약 조회 실패', timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { bookingId, status } = await request.json();
    if (!bookingId || !status) {
      return NextResponse.json({ success: false, error: 'bookingId, status 필수' }, { status: 400 });
    }
    await updateBookingStatus(bookingId, status);
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: '예약 상태 업데이트 실패', timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
