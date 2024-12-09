// Funkce pro zobrazení hlavní stránky
function showMainPage() {
    document.getElementById('main-page').classList.remove('hidden');
    document.getElementById('settings-page').classList.add('hidden');
    displayFavoriteMovie();
}

// Funkce pro zobrazení nastavovací stránky
function showSettingsPage() {
    document.getElementById('main-page').classList.add('hidden');
    document.getElementById('settings-page').classList.remove('hidden');
}

// Funkce pro uložení filmu do sessionStorage
function saveMovie() {
    const movieInput = document.getElementById('movie-input').value;
    if (movieInput.trim() !== '') {
        sessionStorage.setItem('favoriteMovie', movieInput.trim());
        alert('Film byl uložen!');
        document.getElementById('movie-input').value = ''; // Vyčištění vstupního pole
        showMainPage();
    } else {
        alert('Zadejte prosím název filmu.');
    }
}

// Funkce pro zobrazení uloženého filmu
function displayFavoriteMovie() {
    const favoriteMovie = sessionStorage.getItem('favoriteMovie');
    const textElement = document.getElementById('favorite-movie-text');
    if (favoriteMovie) {
        textElement.textContent = `Nejoblíbenější film: ${favoriteMovie}`;
    } else {
        textElement.textContent = 'Žádný film nebyl nastaven.';
    }
}

// Registrace Service Workeru
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(registration => {
            console.log('Service Worker zaregistrován:', registration);
        })
        .catch(error => {
            console.log('Service Worker se nepodařilo zaregistrovat:', error);
        });
}

// Inicializace hlavní stránky při načtení
document.addEventListener('DOMContentLoaded', () => {
    displayFavoriteMovie();
});
