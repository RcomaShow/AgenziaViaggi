let cardIdCounter = 0;
const cardIdToDestinazioneMap = {};

function creaCard(destinazione) {
    const container = document.getElementById('destinazioni-container');
    if (!destinazione.luogo || !destinazione.dataDiPartenza) {
        console.error('Manca luogo o data di partenza:', destinazione);
        return;
    }

    const cardId = `viaggio-${cardIdCounter++}`;
    cardIdToDestinazioneMap[cardId] = destinazione;

    const col = document.createElement('div');
    col.classList.add('col-md-4', 'mb-4');

    const card = document.createElement('div');
    card.classList.add('destination-card', 'card', 'shadow-lg');
    card.id = cardId;
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
        { label: '👥 Posti disponibili', value: `<span class="badge ${destinazione.postiDisponibili > 0 ? 'bg-success' : 'bg-danger'}">${destinazione.postiDisponibili}</span>` }
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

    // CLICK: Apri form dettaglio
    card.addEventListener('click', () => {
        const dati = cardIdToDestinazioneMap[cardId];
        const oldForm = document.getElementById('formDettagli');
        if (oldForm) oldForm.remove();

        const formOverlay = document.createElement('div');
        formOverlay.id = 'formDettagli';
        formOverlay.classList.add('position-fixed', 'top-0', 'start-0', 'vw-100', 'vh-100', 'd-flex', 'align-items-center', 'justify-content-center');
        formOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        formOverlay.style.zIndex = '1050';

        const form = document.createElement('form');
        form.classList.add('bg-white', 'p-4', 'rounded', 'shadow-lg', 'w-100');
        form.style.maxWidth = '400px';

        form.innerHTML = `
            <h4 class="text-center mb-3">Dettagli Viaggio</h4>
            <div class="mb-2">
                <label class="form-label">Luogo:</label>
                <input type="text" class="form-control" name="luogo" value="${dati.luogo}" readonly>
            </div>
            <div class="mb-2">
                <label class="form-label">Partenza:</label>
                <input type="text" class="form-control" name="partenza" value="${dati.dataDiPartenza}" readonly>
            </div>
            <div class="mb-2">
                <label class="form-label">Ritorno:</label>
                <input type="text" class="form-control" name="ritorno" value="${dati.dataDiRitorno}" readonly>
            </div>
            <div class="mb-2">
                <label class="form-label">Formula:</label>
                <input type="text" class="form-control" name="formula" value="${dati.formula}" readonly>
            </div>
            <div class="mb-2">
                <label class="form-label">Costo:</label>
                <input type="number" class="form-control" name="costo" value="${dati.costo}" readonly>
            </div>
            <div class="mb-3">
                <label class="form-label">Posti disponibili:</label>
                <input type="number" class="form-control" name="posti" value="${dati.postiDisponibili}" readonly>
            </div>
            <div class="d-flex gap-2">
                <button type="submit" class="btn btn-success w-100">Prenota</button>
                <button type="button" id="chiudiForm" class="btn btn-danger w-100">Chiudi</button>
            </div>
        `;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const dati = cardIdToDestinazioneMap[cardId];
            const utenteId = JSON.parse(sessionStorage.getItem('loggedUser'));
            if (!utenteId) {
                alert("Utente non autenticato!");
                return;
            }

            const prenotazione = {
                viaggioId: dati.codiceDiArchiviazione,
                utenteId: utenteId.id,
                dataDiPrenotazione: new Date().toISOString().split('T')[0]
            };

            try {
                const response = await fetch("http://localhost:8080/partecipazioni", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(prenotazione)
                });

                if (!response.ok) throw new Error("Errore nella prenotazione");

				let msg = form.querySelector('.msg-prenotazione');
				if (!msg) {
				    msg = document.createElement('div');
				    msg.classList.add('msg-prenotazione', 'mt-3', 'w-100', 'text-center', 'fw-bold');
				    form.appendChild(msg);
				}
				msg.textContent = "✅ Prenotazione avvenuta con successo!";
				msg.classList.remove('text-danger');
				msg.classList.add('text-success');

				// 🔁 Refresh delle card (se necessario, dopo qualche secondo)
				setTimeout(() => {
				    formOverlay.remove();
				    destinazioneForm.dispatchEvent(new Event('submit'));
				}, 1500);

            } catch (err) {
                console.error(err);
				let msg = form.querySelector('.msg-prenotazione');
				if (!msg) {
				    msg = document.createElement('div');
				    msg.classList.add('msg-prenotazione', 'mt-3', 'w-100', 'text-center', 'fw-bold');
				    form.appendChild(msg);
				}
				msg.textContent = "❌ Errore durante la prenotazione.";
				msg.classList.remove('text-success');
				msg.classList.add('text-danger');
            }
        });

        form.querySelector('#chiudiForm').addEventListener('click', () => {
            formOverlay.remove();
        });

        formOverlay.appendChild(form);
        document.body.appendChild(formOverlay);
    });
}


async function fetchDestinazioni() {
    try {
        const response = await fetch('http://localhost:8080/viaggi');
        if (!response.ok) throw new Error('Errore nel fetch');
        const destinazioni = await response.json();
        destinazioni.forEach(destinazione => creaCard(destinazione));
    } catch (error) {
        console.error('Errore durante il fetch delle destinazioni:', error);
    }
}

async function fetchDestinazioni2() {
    try {
        const response = await fetch('http://localhost:8080/viaggi');
        if (!response.ok) throw new Error('Errore nel fetch');
        return await response.json();
    } catch (error) {
        console.error('Errore durante il fetch delle destinazioni:', error);
    }
}

const destinazioneForm = document.getElementById("formDestinazioni");
const luogoInput = document.getElementById("luogoInput");
const dataInput = document.getElementById("dataInput");
const formulaSelect = document.getElementById("formulaSelect");

destinazioneForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const destinationCard = document.getElementById("destinazioni-container");
    destinationCard.innerHTML = "";

    const luogoVal = luogoInput.value.trim();
    const dataVal = dataInput.value.trim();
    const formulaVal = formulaSelect.value;

    fetchDestinazioni2().then(destinazioni => {
        if (!destinazioni) return;

        destinazioni.forEach(destinazione => {
            const matchLuogo = luogoVal !== "" && destinazione.luogo === luogoVal;
            const matchData = dataVal !== "" && destinazione.dataDiPartenza === dataVal;
            const matchFormula = formulaVal !== "no" && destinazione.formula.toLowerCase() === formulaVal.toLowerCase();

            // Condizione 1: tutti vuoti
            if (luogoVal === "" && dataVal === "" && formulaVal === "no") {
                creaCard(destinazione);
            }
            // Condizione 2: solo luogo
            else if (luogoVal !== "" && dataVal === "" && formulaVal === "no" && matchLuogo) {
                creaCard(destinazione);
            }
            // Condizione 3: solo formula
            else if (luogoVal === "" && dataVal === "" && formulaVal !== "no" && matchFormula) {
                creaCard(destinazione);
            }
            // Condizione 4: solo data
            else if (luogoVal === "" && dataVal !== "" && formulaVal === "no" && matchData) {
                creaCard(destinazione);
            }
            // Condizione 5: tutti compilati
            else if (luogoVal !== "" && dataVal !== "" && formulaVal !== "no" && matchLuogo && matchData && matchFormula) {
                creaCard(destinazione);
            }
        });
    });
});


fetchDestinazioni();
