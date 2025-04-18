document.querySelectorAll('input[name="destinazioni[]"]').forEach(radio => {
    radio.addEventListener('change', function () {
        // Rimuove la classe da tutte le card
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('card-selezionata');
        });

        // Aggiunge la classe solo alla card selezionata
        const card = this.closest('.card');
        if (card) {
            card.classList.add('card-selezionata');
        }
    });
});