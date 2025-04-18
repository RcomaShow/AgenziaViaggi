const formInserimentoViaggio = document.getElementById("formInserimentoViaggio");
const nomeInput = document.getElementById("nome");
const cognomeInput = document.getElementById("cognome");
const indirizzoInput = document.getElementById("indirizzo");
const codiceFiscale = document.getElementById("codice_fiscale");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const ruoloSelect = document.getElementById("ruolo");
const messaggioInserimento = document.getElementById("messaggioInserimento");

formInserimentoViaggio.addEventListener("submit", async function (e) {
    e.preventDefault();

    messaggioInserimento.textContent = "";
    messaggioInserimento.className = "";

    const nuovoUtente = {
        nome: nomeInput.value,
        cognome: cognomeInput.value,
        indirizzo: indirizzoInput.value,
        codiceFiscale: codiceFiscale.value.trim(),
        username: usernameInput.value.trim(),
        password: passwordInput.value,
        ruolo: ruoloSelect.value
    };

    try {
        const responseUtenti = await fetch("http://localhost:8080/utenti");
        if (!responseUtenti.ok) {
            throw new Error("Errore nel recupero utenti esistenti");
        }

        const utentiEsistenti = await responseUtenti.json();

        const usernameEsiste = utentiEsistenti.some(u => u.username === nuovoUtente.username);
        const codiceFiscaleEsiste = utentiEsistenti.some(u => u.codiceFiscale === nuovoUtente.codiceFiscale);

        if (usernameEsiste || codiceFiscaleEsiste) {
            let messaggio = "Errore: ";
            if (usernameEsiste) messaggio += "username già esistente. ";
            if (codiceFiscaleEsiste) messaggio += "codice fiscale già registrato.";
            messaggioInserimento.textContent = messaggio;
            messaggioInserimento.className = "alert alert-warning mt-3";
            return;
        }

        // Se è tutto ok, invio POST
        const responsePost = await fetch("http://localhost:8080/utenti", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuovoUtente)
        });

        const result = await responsePost.text();

        if (!responsePost.ok) {
            throw new Error(result || "Errore durante l'invio dei dati");
        }

		messaggioInserimento.textContent = "Utente inserito con successo!";
		messaggioInserimento.className = "alert alert-success mt-3";
		

        formInserimentoViaggio.reset();
		setTimeout(() => {
		    window.location.href = "/";
		}, 2000);

    } catch (error) {
        console.error("Errore:", error);
        messaggioInserimento.textContent = error.message || "Errore imprevisto.";
        messaggioInserimento.className = "alert alert-danger mt-3";
    }
});
