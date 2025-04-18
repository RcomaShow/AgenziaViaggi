let cardIdCounter = 0;
let viaggiMap = new Map(); // Mappa globale per tenere traccia dei viaggi


function creaCard(destinazione, partecipazione, container) {
    const cardId = partecipazione.id; // Usa l'ID della partecipazione come cardId

    // Aggiungi il viaggio alla mappa usando l'ID della partecipazione
    viaggiMap.set(cardId, destinazione); // cardId è l'ID della partecipazione, destinazione è l'oggetto viaggio

    const col = document.createElement('div');
    col.classList.add('col-md-4', 'mb-4');

    const card = document.createElement('div');
    card.classList.add('destination-card', 'card', 'shadow-lg');
    card.id = cardId;  // Imposta il cardId come ID della partecipazione
    card.style.cursor = 'pointer';
    card.style.height = '100%';

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header', 'text-white', 'text-center');
    cardHeader.style.height = '120px';
    cardHeader.style.display = 'flex';
    cardHeader.style.alignItems = 'center';
    cardHeader.style.justifyContent = 'center';
    cardHeader.innerHTML = `<h5 class="fw-bold bg-dark bg-opacity-50 px-3 py-1 rounded">${destinazione.luogo}</h5>`;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const infoList = document.createElement('ul');
    infoList.classList.add('list-group', 'list-group-flush', 'mb-3');

    const items = [
        { label: '📅 Partenza', value: destinazione.dataDiPartenza },
        { label: '🏖️ Ritorno', value: destinazione.dataDiRitorno },
        { label: '🛎️ Formula', value: `<span class="badge bg-primary">${destinazione.formula}</span>` },
        { label: '💶 Costo', value: `<span class="text-success fw-semibold">€ ${destinazione.costo}</span>` },
        { label: '👥 Posti disponibili', value: `<span class="badge ${destinazione.postiDisponibili > 0 ? 'bg-success' : 'bg-danger'}">${destinazione.postiDisponibili}</span>` },
        // Aggiungi una nuova voce per l'username dell'utente
        { label: '👤 Utente', value: partecipazione.utente.username } 
    ];

    items.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `<strong>${item.label}:</strong> ${item.value}`;
        infoList.appendChild(li);
    });

    cardBody.appendChild(infoList);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    col.appendChild(card);
    container.appendChild(col);

    // Aggiungi l'evento di click sulla card
    card.addEventListener('click', () => {
        // Salva l'ID della card selezionata
        selectedCardId = cardId; // Ora cardId è l'ID della partecipazione
        // Mostra l'overlay di conferma
        document.getElementById('overlay').style.display = 'flex';
    });
}


async function fetchPartecipazioniUtente() {
    const utente = JSON.parse(sessionStorage.getItem('loggedUser'));
    if (!utente) {
        alert('Utente non autenticato!');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/partecipazioni`);
        if (!response.ok) throw new Error("Errore nel recupero partecipazioni");

        const partecipazioni = await response.json();
        const container = document.getElementById('destinazioni-container');
        container.innerHTML = "";
        console.log("Partecipazioni ricevute:", partecipazioni);
        partecipazioni
            .forEach(partecipazione => {
                const viaggio = partecipazione.viaggio;
                if (utente.id === partecipazione.utente.id) {
                    // Passa anche l'oggetto partecipazione alla funzione creaCard
                    creaCard(viaggio, partecipazione, container);
                }
            });

    } catch (error) {
        console.error('Errore durante la fetch delle partecipazioni:', error);
    }
}



async function checkAdminAndFetchPartecipazioni() {
    const utente = JSON.parse(sessionStorage.getItem('loggedUser'));
    if (!utente) {
        alert('Utente non autenticato!');
        return;
    }

    // Controlla se l'utente è admin
    if (utente.ruolo && utente.ruolo === 'admin') {
        console.log('Utente admin trovato!');

        // Mostra la sezione admin
        document.getElementById('admin-section').style.display = 'block';

        // Recupera tutte le partecipazioni
        await fetchTutteLePartecipazioni();
    }
}


async function fetchTutteLePartecipazioni() {
    try {
        const response = await fetch('http://localhost:8080/partecipazioni');
        if (!response.ok) throw new Error('Errore nel recupero delle partecipazioni');

        const partecipazioni = await response.json();
        const container = document.getElementById('admin-participazioni-container');
        container.innerHTML = ""; // Pulisce il container prima di aggiungere le partecipazioni

        partecipazioni.forEach(partecipazione => {
            const viaggio = partecipazione.viaggio;
            if (viaggio && viaggio.luogo && viaggio.dataDiPartenza) {
                // Passa anche l'oggetto partecipazione alla funzione creaCard
                creaCard(viaggio, partecipazione, container); // Usa la stessa funzione di creazione della card
            }
        });
    } catch (error) {
        console.error('Errore durante la fetch delle partecipazioni:', error);
    }
}

let selectedCardId = null; // Variabile per tenere traccia dell'ID della card selezionata

// Gestione dell'overlay di cancellazione
document.getElementById('confirm-delete').addEventListener('click', async () => {
    if (!selectedCardId) return;

    const viaggioToDelete = viaggiMap.get(selectedCardId); // Recupera il viaggio dalla mappa
    console.log(viaggioToDelete);
    try {
        const response = await fetch(`http://localhost:8080/partecipazioni/${selectedCardId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Errore durante la cancellazione della partecipazione');
        }

        // Rimuovi la card dalla pagina
        const card = document.getElementById(selectedCardId);
        if (card) {
            card.remove();
        }

        // Rimuovi il viaggio dalla mappa
        viaggiMap.delete(selectedCardId);

        // Chiudi l'overlay
        document.getElementById('overlay').style.display = 'none';
        alert('Partecipazione cancellata con successo!');
    } catch (error) {
        console.error('Errore durante la cancellazione:', error);
        alert('Errore durante la cancellazione della partecipazione.');
    }
});

// Annulla l'azione di cancellazione
document.getElementById('cancel-delete').addEventListener('click', () => {
    document.getElementById('overlay').style.display = 'none';
});


window.onload = function() {
    checkAdminAndFetchPartecipazioni();
};

fetchPartecipazioniUtente();
