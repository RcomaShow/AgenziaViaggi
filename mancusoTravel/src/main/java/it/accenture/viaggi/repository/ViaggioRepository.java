package it.accenture.viaggi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.accenture.viaggi.model.Viaggio;

public interface ViaggioRepository extends JpaRepository<Viaggio, Integer>{

}
