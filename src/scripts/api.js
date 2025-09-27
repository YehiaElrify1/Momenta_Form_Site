const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzQsHreGQ2frjG14SP4QcPcq3gyqyvNx7w-XLexMEE1xDIJupQugUL8jaJrC25H5uA/exec';

export async function submitData(payload) {
  const body = new URLSearchParams(payload);

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body,
    });

    if (response.type === 'opaque') {
      return { ok: true };
    }

    const data = await response.json().catch(() => ({ ok: true }));
    return data;
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

export { SCRIPT_URL };
