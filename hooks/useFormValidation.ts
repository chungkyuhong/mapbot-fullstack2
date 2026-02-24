'use client';
import { useState, useCallback } from 'react';
import type { ValidationResult } from '@/lib/validators';

type ValidatorFn = () => ValidationResult;

export function useFormValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setFieldError = useCallback((field: string, error: string | undefined) => {
    setErrors((prev) => {
      if (!error) {
        const next = { ...prev };
        delete next[field];
        return next;
      }
      return { ...prev, [field]: error };
    });
  }, []);

  const validateField = useCallback((field: string, validator: ValidatorFn): boolean => {
    const result = validator();
    setFieldError(field, result.error);
    return result.valid;
  }, [setFieldError]);

  const validateAll = useCallback((validators: Record<string, ValidatorFn>): boolean => {
    let allValid = true;
    const newErrors: Record<string, string> = {};
    for (const [field, validator] of Object.entries(validators)) {
      const result = validator();
      if (!result.valid && result.error) {
        newErrors[field] = result.error;
        allValid = false;
      }
    }
    setErrors(newErrors);
    return allValid;
  }, []);

  const clearErrors = useCallback(() => setErrors({}), []);

  return { errors, setFieldError, validateField, validateAll, clearErrors };
}
