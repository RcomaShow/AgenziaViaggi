const userLogged = JSON.parse(sessionStorage.getItem("loggedUser")); 
const userLogUsername = document.getElementById("userLogUsername");
const userLogRole = document.getElementById("userLogRole");
const areaRiservata = document.getElementById("areaRiservata");

userLogUsername.innerHTML = "User:&nbsp;" + userLogged.username;
userLogRole.innerHTML = "Role: &nbsp;" + userLogged.ruolo;


if(userLogged.ruolo == "admin"){
    
    const a = document.createElement("a");

    a.className = "dropdown-item text-white";
    a.href = "areariservata.html";
    a.textContent = "Area admin";

    areaRiservata.appendChild(a); 
}

function logout() {
    // Pulisce la variabile di sessione 'loggedUser' (Assicurati che il backend gestisca la sessione)
    sessionStorage.removeItem('loggedUser'); // Se usi sessionStorage
    // sessionStorage.clear(); // Se vuoi pulire tutto il sessionStorage

    // Puoi anche usare localStorage se stai utilizzando quel tipo di storage
    // localStorage.removeItem('loggedUser');
    // localStorage.clear();

    // Reindirizza l'utente alla home page
    window.location.href = '/';
}








