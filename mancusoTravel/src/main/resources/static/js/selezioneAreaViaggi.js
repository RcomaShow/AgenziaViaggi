document.addEventListener("DOMContentLoaded", function () {
    // Seleziona gli elementi del DOM
    const checkboxAggiungi = document.getElementById("radio1");
    const checkboxModifica = document.getElementById("radio2");
    const checkboxCancella = document.getElementById("radio3");
    const checkboxVisualizza = document.getElementById("checkbox4");

    const divInserimentoViaggio = document.getElementById("inserimentoViaggio");
    const divModificaViaggio = document.getElementById("divModficaViaggio");
    const divCancellaViaggio = document.getElementById("divCancellaViaggio");
    const divVisualizzaViaggio = document.getElementById("visualizzaViaggio");

    checkboxVisualizza.checked = true;

    // Funzione per nascondere tutte le sezioni
    function nascondiTutteLeSezioni() {
        [divInserimentoViaggio, divModificaViaggio, divCancellaViaggio, divVisualizzaViaggio].forEach(div => {
            div.classList.add("d-none");
            div.classList.remove("d-flex");
        });
    }

    // Funzione per mostrare le sezioni in base ai checkbox selezionati
    function mostraSezioni() {
        nascondiTutteLeSezioni();

        if (checkboxAggiungi.checked) {
            divInserimentoViaggio.classList.remove("d-none");
            divInserimentoViaggio.classList.add("d-flex");
        } else if (checkboxModifica.checked) {
            divModificaViaggio.classList.remove("d-none");
            divModificaViaggio.classList.add("d-flex");
        } else if (checkboxCancella.checked) {
            divCancellaViaggio.classList.remove("d-none");
            divCancellaViaggio.classList.add("d-flex");
        }

        if (checkboxVisualizza.checked) {
            divVisualizzaViaggio.classList.remove("d-none");
            divVisualizzaViaggio.classList.add("d-flex");
        }
    }

    // Funzione per far comportare i primi 3 checkbox come radio
    function gestisciCheckboxEsclusivi(selezionato) {
        if (selezionato !== checkboxAggiungi) checkboxAggiungi.checked = false;
        if (selezionato !== checkboxModifica) checkboxModifica.checked = false;
        if (selezionato !== checkboxCancella) checkboxCancella.checked = false;

        mostraSezioni();
    }

    // Eventi per farli comportare come radio
    checkboxAggiungi.addEventListener("change", () => gestisciCheckboxEsclusivi(checkboxAggiungi));
    checkboxModifica.addEventListener("change", () => gestisciCheckboxEsclusivi(checkboxModifica));
    checkboxCancella.addEventListener("change", () => gestisciCheckboxEsclusivi(checkboxCancella));
    checkboxVisualizza.addEventListener("change", mostraSezioni);

    // Inizializza lo stato della visibilità al caricamento della pagina
    mostraSezioni();
});
