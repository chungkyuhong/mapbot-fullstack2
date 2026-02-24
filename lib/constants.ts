// ============================================================
// MapBot — Constants & Configuration
// ============================================================
import {
  Home, Route, MapPin, Wallet, Sparkles,
  LayoutDashboard, Truck, ShieldCheck,
} from 'lucide-react';

// ── User Tab Definitions ────────────────────────────────────
export const USER_TABS = [
  { id: 'home', label: '홈', path: '/', icon: Home },
  { id: 'route', label: '이동', path: '/route', icon: Route },
  { id: 'tracking', label: '실시간', path: '/tracking', icon: MapPin },
  { id: 'wallet', label: '포인트', path: '/wallet', icon: Wallet },
  { id: 'laas', label: 'LaaS', path: '/laas', icon: Sparkles },
] as const;

// ── Admin Tab Definitions ───────────────────────────────────
export const ADMIN_TABS = [
  { id: 'dashboard', label: '대시보드', path: '/admin', icon: LayoutDashboard },
  { id: 'fleet', label: '차량관리', path: '/admin/fleet', icon: Truck },
  { id: 'policy', label: '정책', path: '/admin/policy', icon: ShieldCheck },
] as const;

// ── Pohang Locations ────────────────────────────────────────
export const POHANG_LOCATIONS: Record<string, { lat: number; lng: number; name: string }> = {
  pohang_station:  { lat: 36.0320, lng: 129.3650, name: '포항역' },
  pohang_airport:  { lat: 35.9877, lng: 129.4200, name: '포항공항' },
  pohang_city:     { lat: 36.0320, lng: 129.3600, name: '포항시청' },
  posco:           { lat: 36.0097, lng: 129.3543, name: '포스코 본사' },
  handong_univ:    { lat: 36.1039, lng: 129.3887, name: '한동대학교' },
  yeongil_beach:   { lat: 36.0628, lng: 129.3857, name: '영일대해수욕장' },
  jukdo_market:    { lat: 36.0245, lng: 129.3650, name: '죽도시장' },
  sungmo_hospital: { lat: 36.0189, lng: 129.3421, name: '포항성모병원' },
  seoul_station:   { lat: 37.5547, lng: 126.9707, name: '서울역' },
  incheon_airport: { lat: 37.4602, lng: 126.4407, name: '인천국제공항' },
};

// ── LaaS Domains ────────────────────────────────────────────
export const LAAS_DOMAINS = [
  { key: 'fashion', label: '패션', icon: 'Shirt' },
  { key: 'healthcare', label: '헬스케어', icon: 'HeartPulse' },
  { key: 'beauty', label: '뷰티', icon: 'Sparkles' },
  { key: 'investment', label: '투자', icon: 'TrendingUp' },
] as const;

// ── Purpose / Priority Options ──────────────────────────────
export const TRIP_PURPOSES = [
  { value: 'business', label: '비즈니스 출장' },
  { value: 'leisure', label: '여행·관광' },
  { value: 'medical', label: '의료·병원' },
  { value: 'event', label: '행사·공연' },
  { value: 'commute', label: '출퇴근' },
] as const;

export const ROUTE_PRIORITIES = [
  { value: 'fastest', label: '최단 시간' },
  { value: 'cheapest', label: '최저 비용' },
  { value: 'eco', label: '친환경' },
  { value: 'comfort', label: '편의성' },
] as const;

export const DRT_PRIORITIES = [
  { value: 'nearest', label: '최근접 차량' },
  { value: 'fastest', label: '최단 ETA' },
  { value: 'eco', label: '친환경 차량' },
  { value: 'premium', label: '프리미엄' },
] as const;

export const TRANSPORT_MODES = [
  { value: 'drt', label: 'DRT' },
  { value: 'taxi', label: '택시' },
  { value: 'bus', label: '버스' },
  { value: 'ktx', label: 'KTX' },
  { value: 'boat', label: '전기보트(보트랑)' },
] as const;

export const PRICING_TIERS = [
  { value: 'normal', label: '평상시' },
  { value: 'peak', label: '혼잡 (+20%)' },
  { value: 'night', label: '야간 (+15%)' },
  { value: 'off', label: '비수기 (-10%)' },
] as const;

export const PAYMENT_METHODS = [
  { value: 'card', label: '신용카드', icon: 'CreditCard' },
  { value: 'kakao', label: '카카오페이', icon: 'Smartphone' },
  { value: 'mu', label: 'MU Point 전액', icon: 'Star' },
  { value: 'corp', label: '법인카드', icon: 'Building2' },
] as const;

// ── Default Center (Pohang) ─────────────────────────────────
export const POHANG_CENTER = { lat: 36.0320, lng: 129.3650 };
