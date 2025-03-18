document.addEventListener("DOMContentLoaded", function() {
    const quickLinksList = document.getElementById('quick-links-list');
    const addQuickLinkButton = document.getElementById('add-quick-link');

    function loadQuickLinks() {
        const quickLinks = JSON.parse(localStorage.getItem('quickLinks')) || [];
        quickLinksList.innerHTML = '';
        quickLinks.forEach((link, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="${link.url}" target="_blank">${link.title}</a>
                <i class="fas fa-trash-alt remove-quick-link" data-index="${index}"></i>
            `;
            quickLinksList.appendChild(li);
        });

        const removeButtons = document.querySelectorAll('.remove-quick-link');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                removeQuickLink(index);
            });
        });
    }

    function removeQuickLink(index) {
        let quickLinks = JSON.parse(localStorage.getItem('quickLinks')) || [];
        console.log('Quick links before remove:', quickLinks); // Ellenőrzés
        quickLinks.splice(index, 1);
        console.log('Quick links after remove:', quickLinks); // Ellenőrzés
        saveQuickLinks(quickLinks);
        loadQuickLinks();
    }

    function saveQuickLinks(quickLinks) {
        localStorage.setItem('quickLinks', JSON.stringify(quickLinks));
    }

    addQuickLinkButton.addEventListener('click', function () {
        const title = prompt('Websites Name :');
        let url = prompt('Websites URL :');
        if (title && url) {
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }
            const quickLinks = JSON.parse(localStorage.getItem('quickLinks')) || [];
            quickLinks.push({ title, url });
            saveQuickLinks(quickLinks);
            loadQuickLinks();
        }
    });

    loadQuickLinks();
});