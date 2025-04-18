const formCancella = document.getElementById("formCancellaViaggio");
const inputIdCancella = document.getElementById("idViaggioCancella");
const msgCancellazione = document.getElementById("msgCancellazione");

formCancella.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = inputIdCancella.value.trim();

    if (!id || isNaN(id)) {
        msgCancellazione.textContent = "Inserisci un ID valido.";
        msgCancellazione.style.color = "red";
        return;
    }

    const restapi = `http://localhost:8080/viaggi/${id}`;

    try {
        const response = await fetch(restapi, {
            method: "DELETE"
        });

        if (response.ok) {
            msgCancellazione.textContent = `Viaggio con ID ${id} cancellato con successo.`;
            msgCancellazione.style.color = "green";
        } else {
            msgCancellazione.textContent = `Errore durante la cancellazione: ${response.status}`;
            msgCancellazione.style.color = "red";
        }
    } catch (error) {
        console.error("Errore nella richiesta DELETE:", error);
        msgCancellazione.textContent = "Errore di connessione o server non disponibile.";
        msgCancellazione.style.color = "red";
    }
});
