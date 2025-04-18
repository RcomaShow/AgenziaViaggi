const login = document.getElementById("login");
const username = document.getElementById("username");
const password = document.getElementById("password");

login.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:8080/utenti');
        if (!response.ok) {
            throw new Error('Errore nella risposta della rete');
        }
 
        const users = await response.json();

        // Trova l'utente con credenziali corrispondenti
        const user = users.find(user =>
            user.username === username.value &&
            user.password === password.value
        );

        if (user) {
            console.log("Utente presente:", user.username);

            // Salva i dati dell'utente nella sessione
            sessionStorage.setItem("loggedUser", JSON.stringify({
				id: user.id,
                username: user.username,
                ruolo: user.ruolo
            }));

            // Reindirizza l'utente alla pagina desiderata
            window.location.href = "home.html"; // <-- cambia con la tua pagina
        } else {
            console.log("Utente non presente");
            alert("Username o password errati.");
        }

    } catch (error) {
        console.error('Errore durante la fetch:', error);
    }
});
