// Функция валидации email
export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Функция валидации пароля
export const validatePassword = (password) => password.length >= 8;

// Функция отображения ошибок
export const showError = (input, errorElement, message) => {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    input.classList.add('invalid');
};

// Функция скрытия ошибок
export const clearError = (input, errorElement) => {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    input.classList.remove('invalid');
};