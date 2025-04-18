document.addEventListener('DOMContentLoaded', function () {
    const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
    if (loggedUser && loggedUser.ruolo === 'utente') {
        window.location.href = '/';
    }
});

(async function caricaTabellaViaggi() {
    try {
        const response = await fetch('http://localhost:8080/viaggi');

        if (!response.ok) {
            throw new Error('Errore nella risposta della rete');
        }

        const viaggi = await response.json();
        console.log(viaggi);

        // Crea la tabella
        const table = document.createElement('table');
        table.id = 'viaggiTable';
        table.className = 'table table-striped table-bordered table-hover bg-white shadow-sm p-3 rounded';

        // Header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const keys = Object.keys(viaggi[0]);
        keys.forEach(key => {
            const th = document.createElement('th');
            th.textContent = formatHeader(key);
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Body
        const tbody = document.createElement('tbody');
        viaggi.forEach(viaggio => {
            const row = document.createElement('tr');
            keys.forEach(key => {
                const td = document.createElement('td');
                td.textContent = viaggio[key];
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        // Inserisci la tabella
        const container = document.getElementById('visualizzaViaggio');
        container.innerHTML = '';
        container.appendChild(table);

    } catch (error) {
        console.error('Errore durante la fetch:', error);
        document.getElementById('visualizzaViaggio').textContent = 'Errore durante la fetch: ' + error.message;
    }

    // Funzione per formattare le intestazioni
    function formatHeader(key) {
        const withSpaces = key.replace(/([A-Z])/g, ' $1'); // Aggiunge spazio prima di ogni maiuscola
        return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1); // Prima lettera maiuscola
    }
})();
