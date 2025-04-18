const divModifica = document.getElementById("divModficaViaggio");
const formGetViaggio = document.getElementById("formGetModificaViaggio");
const inputId = document.getElementById("idViaggioMod");
let flagEventoModifica = false;

formGetViaggio.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (flagEventoModifica) {
        return;
    }

    flagEventoModifica = true;
    const id = inputId.value.trim();
    console.log(id);

	const messaggio = document.getElementById("messaggioModifica");

	if (!id || isNaN(id)) {
	    messaggio.textContent = "Inserisci un ID valido.";
	    messaggio.className = "alert alert-warning mt-3";
	    return;
	}

    const restapi = `http://localhost:8080/viaggi/${Number(id)}`;

    try {
        const response = await fetch(restapi);
        if (!response.ok) {
            throw new Error(`Errore nella risposta: ${response.status}`);
        }

        const viaggio = await response.json();

        const form = document.createElement("form");
        form.id = "formModificaViaggio_" + id;
        form.classList.add("mt-4", "border", "p-4", "rounded", "bg-light");

        const creaInput = (labelText, name, value, type = "text") => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("mb-3");

            const label = document.createElement("label");
            label.textContent = labelText;
            label.htmlFor = name;
            label.classList.add("form-label");

            const input = document.createElement("input");
            input.type = type;
            input.name = name;
            input.id = name;
            input.value = value;
            input.classList.add("form-control");

            wrapper.appendChild(label);
            wrapper.appendChild(input);

            return wrapper;
        };

        const creaSelect = (labelText, name, selectedValue) => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("mb-3");

            const label = document.createElement("label");
            label.textContent = labelText;
            label.htmlFor = name;
            label.classList.add("form-label");

            const select = document.createElement("select");
            select.name = name;
            select.id = name;
            select.classList.add("form-select");

            const options = ["Pensione completa", "Mezza pensione", "B&b"];
            options.forEach(option => {
                const opt = document.createElement("option");
                opt.value = option;
                opt.textContent = option;
                if (option === selectedValue) {
                    opt.selected = true;
                }
                select.appendChild(opt);
            });

            wrapper.appendChild(label);
            wrapper.appendChild(select);

            return wrapper;
        };

        form.appendChild(creaInput("Codice di Archiviazione:", "codiceDiArchiviazione", viaggio.codiceDiArchiviazione || ""));
        form.appendChild(creaInput("Luogo:", "luogo", viaggio.luogo || ""));
        form.appendChild(creaInput("Data di Partenza:", "dataDiPartenza", viaggio.dataDiPartenza || "", "date"));
        form.appendChild(creaInput("Data di Ritorno:", "dataDiRitorno", viaggio.dataDiRitorno || "", "date"));
        form.appendChild(creaInput("Costo (€):", "costo", viaggio.costo || "", "number"));
        form.appendChild(creaSelect("Formula:", "formula", viaggio.formula || ""));
        form.appendChild(creaInput("Posti Disponibili:", "postiDisponibili", viaggio.postiDisponibili || "", "number"));

        const submitBtn = document.createElement("button");
        submitBtn.type = "submit";
        submitBtn.textContent = "Salva Modifiche";
        submitBtn.classList.add("btn", "btn-primary", "mt-3");
        form.appendChild(submitBtn);

        divModifica.appendChild(form);

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            data.id = id;

            const putRestapi = `http://localhost:8080/viaggi/${id}`;
            try {
                const putResponse = await fetch(putRestapi, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!putResponse.ok) {
                    throw new Error(`Errore nella risposta PUT: ${putResponse.status}`);
                }

                const updatedViaggio = await putResponse.json();
				const messaggio = document.getElementById("messaggioModifica");
				messaggio.textContent = "Dati aggiornati con successo!";
				messaggio.className = "alert alert-success mt-3";

				flagEventoModifica = false;
				form.remove();
            } catch (error) {
				console.error("Errore durante la PUT:", error);
				const messaggio = document.getElementById("messaggioModifica");
				messaggio.textContent = "Errore durante l'aggiornamento dei dati.";
				messaggio.className = "alert alert-danger mt-3";
            }
        });

    } catch (error) {
		const messaggio = document.getElementById("messaggioModifica");
		messaggio.textContent = "Errore durante il recupero del viaggio.";
		messaggio.className = "alert alert-danger mt-3";
    }
});