// ============================================================
// MapBot — Form Validation Rules
// ============================================================

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateRequired(value: string | number | null | undefined, fieldName: string): ValidationResult {
  if (value === null || value === undefined || (typeof value === 'string' && !value.trim())) {
    return { valid: false, error: `${fieldName}을(를) 입력해주세요` };
  }
  return { valid: true };
}

export function validatePassengers(count: number): ValidationResult {
  if (count < 1) return { valid: false, error: '최소 1명 이상 입력해주세요' };
  if (count > 8) return { valid: false, error: '최대 8명까지 가능합니다' };
  if (!Number.isInteger(count)) return { valid: false, error: '정수로 입력해주세요' };
  return { valid: true };
}

export function validatePhone(phone: string): ValidationResult {
  if (!phone.trim()) return { valid: false, error: '연락처를 입력해주세요' };
  const cleaned = phone.replace(/[-\s]/g, '');
  if (!/^01[016789]\d{7,8}$/.test(cleaned)) {
    return { valid: false, error: '올바른 전화번호를 입력해주세요 (예: 010-0000-0000)' };
  }
  return { valid: true };
}

export function validateAge(age: string | number): ValidationResult {
  const n = typeof age === 'string' ? parseInt(age) : age;
  if (isNaN(n)) return { valid: false, error: '나이를 입력해주세요' };
  if (n < 15 || n > 100) return { valid: false, error: '15세~100세 사이로 입력해주세요' };
  return { valid: true };
}

export function validateBudget(budget: number): ValidationResult {
  if (budget < 0) return { valid: false, error: '0 이상의 금액을 입력해주세요' };
  if (budget > 100000000) return { valid: false, error: '1억 이하의 금액을 입력해주세요' };
  return { valid: true };
}

export function validateDistance(km: number): ValidationResult {
  if (km < 0.1) return { valid: false, error: '0.1km 이상 입력해주세요' };
  if (km > 1000) return { valid: false, error: '1,000km 이하로 입력해주세요' };
  return { valid: true };
}

export function validateDifferentLocations(origin: string, destination: string): ValidationResult {
  if (origin === destination) {
    return { valid: false, error: '출발지와 목적지가 동일합니다' };
  }
  return { valid: true };
}

/** Run multiple validators, return first error */
export function validateAll(...results: ValidationResult[]): ValidationResult {
  for (const r of results) {
    if (!r.valid) return r;
  }
  return { valid: true };
}
