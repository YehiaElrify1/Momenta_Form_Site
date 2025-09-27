function isArabicThreeWords(value) {
  const cleaned = (value || '').trim().replace(/\s+/g, ' ');
  const parts = cleaned.split(' ');

  if (parts.length < 3) {
    return false;
  }

  const arabicCharPattern = /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+$/;
  return parts.slice(0, 3).every((segment) => arabicCharPattern.test(segment));
}

function toggleError(id, show = true) {
  const element = document.getElementById(id);
  if (element) {
    element.style.display = show ? 'block' : 'none';
  }
}

function setInvalid(field, invalid) {
  if (field) {
    field.setAttribute('aria-invalid', invalid ? 'true' : 'false');
  }
}

export function resetValidationState(fields) {
  const { fullName, level, nationalId, phone } = fields;

  toggleError('nameError', false);
  toggleError('levelError', false);
  toggleError('nidError', false);
  toggleError('phoneError', false);

  setInvalid(fullName, false);
  setInvalid(level, false);
  setInvalid(nationalId, false);
  setInvalid(phone, false);
}

export function validateFields(fields) {
  const { fullName, level, nationalId, phone } = fields;

  if (!fullName || !level || !nationalId || !phone) {
    return false;
  }
  let isValid = true;

  if (!isArabicThreeWords(fullName.value)) {
    toggleError('nameError', true);
    setInvalid(fullName, true);
    isValid = false;
  }

  if (!level.value) {
    toggleError('levelError', true);
    setInvalid(level, true);
    isValid = false;
  }

  if (!/^\d{14}$/.test(nationalId.value)) {
    toggleError('nidError', true);
    setInvalid(nationalId, true);
    isValid = false;
  }

  if (!/^01[0-2,5]\d{8}$/.test(phone.value)) {
    toggleError('phoneError', true);
    setInvalid(phone, true);
    isValid = false;
  }

  return isValid;
}

export function showToast(toast, toastInner, message, isError = false) {
  if (!toast || !toastInner) {
    return;
  }

  toast.classList.toggle('error', Boolean(isError));
  toastInner.textContent = message;
  toast.style.display = 'block';

  const root = typeof window !== 'undefined' ? window : globalThis;
  root.clearTimeout?.(showToast.timeoutId);
  showToast.timeoutId = root.setTimeout ? root.setTimeout(() => {
    toast.style.display = 'none';
  }, 3800) : undefined;
}

export function updateFooterYear(element) {
  if (element) {
    element.textContent = new Date().getFullYear();
  }
}
