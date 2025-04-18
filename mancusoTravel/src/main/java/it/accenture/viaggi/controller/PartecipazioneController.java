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

import it.accenture.viaggi.model.Partecipazione;
import it.accenture.viaggi.model.PartecipazioneDto;
import it.accenture.viaggi.service.PartecipazioneService;

@RestController
@RequestMapping("partecipazioni")
public class PartecipazioneController {

	@Autowired 
	private PartecipazioneService partecipazioneService;


	@PostMapping
	public ResponseEntity<String> creaPartecipazione(@RequestBody PartecipazioneDto partecipazioneDto) {
		return partecipazioneService.creaPartecipazione(partecipazioneDto);
	}
	
	@GetMapping
	public List<Partecipazione> getViaggi(){
		return partecipazioneService.getPartecipazioni();
	}
	
	@GetMapping("/{id}")
	public Partecipazione getPartecipazioneById(@PathVariable int id) {
		return partecipazioneService.getPartecipazioneById(id);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Partecipazione> modificaPartecipazione(@PathVariable int id, @RequestBody PartecipazioneDto partecipazioneDto){
		return partecipazioneService.modificaPartecipazione(id, partecipazioneDto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> cancellaPartecipazione(@PathVariable int id) {
		return partecipazioneService.cancellaPartecipazione(id);
	}
}
