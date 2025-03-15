import { togglePopup } from "./helpers/popupHelpers.js";
import { redirectIfAuthenticated } from "./services/authService.js";

const signUpPopup = document.querySelector('.signUp-popup');
const signUpBtn = document.querySelector('.signUp-btn')


signUpBtn.addEventListener('click', () => togglePopup(true, signUpPopup));


// Автоматическая проверка и редирект при загрузке страницы
redirectIfAuthenticated();
