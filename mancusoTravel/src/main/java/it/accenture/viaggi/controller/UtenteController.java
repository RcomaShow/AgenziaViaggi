package it.accenture.viaggi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.accenture.viaggi.model.Utente;
import it.accenture.viaggi.model.UtenteDto;
import it.accenture.viaggi.service.UtenteService;
@RestController
@RequestMapping("utenti")
public class UtenteController {


	@Autowired 
	private UtenteService utenteService;


	@PostMapping
	public ResponseEntity<String> creaUtente(@RequestBody UtenteDto utenteDto) {
		return utenteService.creaUtente(utenteDto);
	}
	
	@GetMapping
	public List<Utente> getViaggi(){
		return utenteService.getUtenti();
	}
	
	@GetMapping("/{id}")
	public Utente getUtenteById(@PathVariable int id) {
		return utenteService.getUtenteById(id);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Utente> modificaUtente(@PathVariable int id, @RequestBody UtenteDto utenteDto){
		return utenteService.modificaUtente(id, utenteDto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> cancellaUtente(@PathVariable int id) {
		return utenteService.cancellaUtente(id);
	}
}
