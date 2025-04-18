package it.accenture.viaggi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.accenture.viaggi.model.Utente;

public interface UtenteRepository extends JpaRepository<Utente, Integer> {

}
