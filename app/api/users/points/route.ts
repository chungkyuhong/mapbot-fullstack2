// ============================================================
// API — MU Points Management
// ============================================================
import { NextRequest, NextResponse } from 'next/server';
import { getUserPoints, updateUserPoints, getPointsHistory } from '@/lib/firestore/users';

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ success: false, error: 'userId 필수' }, { status: 400 });
    }

    const points = await getUserPoints(userId);
    const history = await getPointsHistory(userId);

    return NextResponse.json({
      success: true,
      data: { points, history },
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: '포인트 조회 실패', timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, delta, description } = await request.json();
    if (!userId) {
      return NextResponse.json({ success: false, error: 'userId 필수' }, { status: 400 });
    }
    if (typeof delta !== 'number') {
      return NextResponse.json({ success: false, error: 'delta(숫자) 필수' }, { status: 400 });
    }

    const newBalance = await updateUserPoints(userId, delta, description ?? '포인트 변동');

    return NextResponse.json({
      success: true,
      data: { points: newBalance },
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: '포인트 업데이트 실패', timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
