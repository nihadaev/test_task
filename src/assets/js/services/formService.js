import { validateEmail, validatePassword, showError, clearError } from "../helpers/formHelpers.js";
import { togglePopup } from "../helpers/popupHelpers.js";
const confirmPopup = document.querySelector('.confirm-popup')
const signUpPopup = document.querySelector('.signUp-popup');


// Функция авторизации
export const tryLogin = async (email, password) => {
    const credentials = btoa(`${email}:${password}`);

    try {
        const response = await fetch('https://api.dating.com/identity', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        });

        if (response.ok) {
            const token = response.headers.get('X-Token');
            if (token) {
                // Сохраняем токен в localStorage
                localStorage.setItem('authToken', token);
                togglePopup(false, signUpPopup);
                window.location.href = `https://www.dating.com/people/#token=${token}`;
                return true; // Успешная авторизация с редиректом
            }
        }
    } catch (error) {
        console.error('Ошибка авторизации:', error);
    }

    return false; // Авторизация не удалась
};

// Функция регистрации
export const registerUser = async (formElements) => {
    const email = formElements.emailInput.value.trim();
    const password = formElements.passwordInput.value.trim();

    let isValid = true;

    if (!validateEmail(email)) {
        showError(formElements.emailInput, formElements.emailError, 'Please enter a valid e-mail');
        isValid = false;
    } else {
        clearError(formElements.emailInput, formElements.emailError);
    }

    if (!validatePassword(password)) {
        showError(formElements.passwordInput, formElements.passwordError, 'Password must be at least 8 characters long');
        isValid = false;
    } else {
        clearError(formElements.passwordInput, formElements.passwordError);
    }

    if (!isValid) return;

    const isAuthenticated = await tryLogin(email, password);

    if (isAuthenticated) return; // Если авторизация успешна, регистрацию не делаем

    // Если авторизация не удалась — пробуем зарегистрировать
    try {
        const response = await fetch('https://api.dating.com/identity', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Ошибка регистрации');
        }

        
        // Пытаемся авторизовать пользователя сразу после регистрации
        const token = response.headers.get('X-Token');
        if (token) {
            togglePopup(true, confirmPopup);
            // Сохраняем токен в localStorage
            localStorage.setItem('authToken', token);
            window.location.href = `https://www.dating.com/people/#token=${token}`;
        } else {
            togglePopup(false, signUpPopup);
            togglePopup(true, confirmPopup);
        }
    } catch (error) {
        console.error('Ошибка:', error.message);
        alert(error.message);
    }
};