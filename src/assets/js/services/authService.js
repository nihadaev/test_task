// Функция для автоматического перенаправления при загрузке страницы
export const redirectIfAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        window.location.href = `https://www.dating.com/people/#token=${token}`;
    }
};