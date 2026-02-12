// Script pour charger les composants réutilisables (navbar et footer)
document.addEventListener('DOMContentLoaded', function() {
    // Charger la navbar
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        fetch('navbar.html')
            .then(response => response.text())
            .then(data => {
                navbarPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Erreur lors du chargement de la navbar:', error));
    }

    // Charger le footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Erreur lors du chargement du footer:', error));
    }
});

