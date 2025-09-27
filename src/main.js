import './styles/main.css';
import homeTemplate from './pages/home.html?raw';
import {
  resetValidationState,
  validateFields,
  showToast,
  updateFooterYear,
} from './scripts/form-validation.js';
import { submitData } from './scripts/api.js';

const app = document.getElementById('app');

if (app) {
  app.innerHTML = homeTemplate;
}

if (typeof window !== 'undefined' && window.AOS?.init) {
  window.AOS.init({ once: true, duration: 640, easing: 'ease-out-cubic' });
}

const form = document.getElementById('signupForm');
const submitBtn = document.getElementById('submitBtn');
const toast = document.getElementById('toast');
const toastInner = document.getElementById('toastInner');
const btnText = submitBtn?.querySelector('.btnText');

updateFooterYear(document.getElementById('year'));

if (form && submitBtn && btnText) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fullName = document.getElementById('fullName');
    const level = document.getElementById('level');
    const nationalId = document.getElementById('nationalId');
    const phone = document.getElementById('phone');

    if (!fullName || !level || !nationalId || !phone) {
      return;
    }

    const fields = { fullName, level, nationalId, phone };

    resetValidationState(fields);

    const isValid = validateFields(fields);

    if (!isValid) {
      showToast(toast, toastInner, 'تأكد من صحة الحقول المظللة باللون الأحمر', true);
      return;
    }

    submitBtn.disabled = true;
    btnText.innerHTML = '<span class="spinner"></span> جارٍ الإرسال...';

    const payload = {
      fullName: fullName.value.trim(),
      level: level.value,
      nationalId: nationalId.value.trim(),
      phone: phone.value.trim(),
      ua: navigator.userAgent,
      ref: document.referrer || window.location.href,
    };

    const result = await submitData(payload);

    if (result && result.ok) {
      form.reset();
      showToast(toast, toastInner, 'تم استلام طلبك بنجاح! سنوافيك بالتفاصيل قريبًا ✅');
    } else {
      showToast(toast, toastInner, 'تعذر الإرسال حالياً. حاول مرة أخرى لاحقًا.', true);
    }

    submitBtn.disabled = false;
    btnText.textContent = 'إرسال الطلب';
  });
}
