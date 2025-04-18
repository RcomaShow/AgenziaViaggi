//funziona aggiorna
async function caricaTabellaViaggi() {
    try {
        const response = await fetch('http://localhost:8080/viaggi');

        if (!response.ok) {
            throw new Error('Errore nella risposta della rete');
        }

        const viaggi = await response.json();
        console.log(viaggi);

        // Costruisci la tabella Bootstrap e assegna un id
        const table = document.createElement('table');
        table.id = 'viaggiTable'; // Assegna l'id alla tabella
        table.className = 'table table-striped table-bordered table-hover';

        // Crea l'header della tabella con le chiavi del primo oggetto
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const keys = Object.keys(viaggi[0]);
        keys.forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
		
        // Crea il body della tabella
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

        // Inserisci la tabella nell'elemento con id visualizzaViaggio
        const container = document.getElementById('visualizzaViaggio');
        container.innerHTML = ''; // Svuota l'elemento
        container.appendChild(table);

    } catch (error) {
        console.error('Errore durante la fetch:', error);
        document.getElementById('visualizzaViaggio').textContent = 'Errore durante la fetch: ' + error.message;
    }
}

//
const formInserimentoViaggio = document.getElementById("formInserimentoViaggio");
const luogoInput = document.getElementById("luogo");
const dataDiPartenzaInput = document.getElementById("data_partenza");
const dataDiRitornoInput = document.getElementById("data_ritorno");
const formulaInput = document.getElementById("formula");
const costoInput = document.getElementById("costo");
const postiDisponibilInput = document.getElementById("posti_disponibili");

    
    formInserimentoViaggio.addEventListener("submit", (event) => {
        event.preventDefault();
    
        const viaggio = {
            luogo: luogoInput.value.trim(),
            dataDiPartenza: dataDiPartenzaInput.value,
            dataDiRitorno: dataDiRitornoInput.value,
            formula: formulaInput.value,
            costo: parseFloat(costoInput.value),
            postiDisponibili: parseInt(postiDisponibilInput.value)
        };
        console.log(formulaInput.value);
        console.log(viaggio);
        
        fetch("http://localhost:8080/viaggi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },  
            body: JSON.stringify(viaggio)
        })
		.then(response => {
		    const messaggioStatus = document.getElementById("messaggioStatusInserimento");

		    if (!response.ok) {
		        messaggioStatus.innerHTML = `<div class="alert alert-danger">Errore: ${response.status} - ${response.statusText}</div>`;
		        throw new Error("Errore durante l'invio del viaggio.");
		    }

		    messaggioStatus.innerHTML = `<div class="alert alert-success">Viaggio inserito con successo! Status: ${response.status}</div>`;
		    return response.text();
		})
		.then(data => {
		    console.log("Viaggio inserito con successo:", data);
		    formInserimentoViaggio.reset();
		    document.getElementById("viaggiTable").remove();
		    caricaTabellaViaggi();
		})
		.catch(error => {
		    const messaggioStatus = document.getElementById("messaggioStatusInserimento");
		    messaggioStatus.innerHTML = `<div class="alert alert-danger">Errore: ${error.message}</div>`;
		    console.error("Errore:", error);
		});

       
    });

