const form = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

// ===== 1. Завантаження з localStorage =====
const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  try {
    formData = JSON.parse(savedData);

    form.elements.email.value = formData.email || '';
    form.elements.message.value = formData.message || '';
  } catch (e) {
    console.log('Error parsing storage data');
  }
}

// ===== 2. Input (делегування) =====
form.addEventListener('input', event => {
  const { name, value } = event.target;

  if (!name) return;

  formData[name] = value.trim(); // прибираємо пробіли

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// ===== 3. Submit =====
form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  // очищення
  formData = { email: '', message: '' };
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});
