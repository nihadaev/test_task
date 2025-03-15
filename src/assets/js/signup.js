import { togglePopup } from "./helpers/popupHelpers.js";
import { validateEmail, validatePassword, clearError } from "./helpers/formHelpers.js";
import { registerUser } from "./services/formService.js";

const signUpPopup = document.querySelector('.signUp-popup');

const formElements = {
    closeSignUp: document.querySelector('.close-signUp'),
    emailInput: document.querySelector('#email'),
    passwordInput: document.querySelector('#password'),
    submitBtn: document.querySelector('.submit'),
    emailError: document.querySelector('.email-error'),
    passwordError: document.querySelector('.password-error')
};

// Валидация на вводе
formElements.emailInput.addEventListener('input', () => {
    const email = formElements.emailInput.value.trim();
    if (validateEmail(email)) {
        clearError(formElements.emailInput, formElements.emailError);
    }
});

formElements.passwordInput.addEventListener('input', () => {
    const password = formElements.passwordInput.value.trim();
    if (validatePassword(password)) {
        clearError(formElements.passwordInput, formElements.passwordError);
    }
});


formElements.closeSignUp.addEventListener('click', () => {
    clearError(formElements.emailInput, formElements.emailError);
    clearError(formElements.passwordInput, formElements.passwordError);
    togglePopup(false, signUpPopup);
});

document.addEventListener('keydown', ({ key }) => {
    if (key === 'Escape') togglePopup(false, signUpPopup);
    clearError(formElements.emailInput, formElements.emailError);
    clearError(formElements.passwordInput, formElements.passwordError);
});

// Обработчик отправки формы
formElements.submitBtn.addEventListener('click', () => registerUser(formElements));
