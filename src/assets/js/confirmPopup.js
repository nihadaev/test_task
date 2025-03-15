import { togglePopup } from "./helpers/popupHelpers.js";

const confirmPopup = document.querySelector('.confirm-popup')

const closePopup = document.querySelector('.close-confirm')

closePopup.addEventListener('click',() => togglePopup(false, confirmPopup))

document.addEventListener('keydown', ({ key }) => {
    if (key === 'Escape') togglePopup(false, confirmPopup);
});
