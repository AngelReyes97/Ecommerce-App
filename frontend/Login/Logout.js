
function logout() {
    // Clear any stored user data (if applicable)
    // For example, if you stored user data in localStorage or sessionStorage
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    sessionStorage.removeItem('contentLoaded', true);
    localStorage.removeItem('cartCount');
    

    // Redirect to the login page
    window.location.href = '../Login/loginPage.html';
}