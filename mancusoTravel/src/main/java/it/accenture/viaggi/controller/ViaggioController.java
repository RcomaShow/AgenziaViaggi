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

import it.accenture.viaggi.model.Viaggio;
import it.accenture.viaggi.model.ViaggioDto;
import it.accenture.viaggi.repository.ViaggioRepository;
import it.accenture.viaggi.service.ViaggioService;

@RestController
@RequestMapping("viaggi")
public class ViaggioController {

   
	@Autowired 
	private ViaggioService viaggioService;

	
	@PostMapping
	public ResponseEntity<String> creaViaggio(@RequestBody ViaggioDto viaggioDto) {
		return viaggioService.creaViaggio(viaggioDto);
	}
	
	@GetMapping
	public List<Viaggio> getViaggi(){
		return viaggioService.getViaggi();
	}
	
	@GetMapping("/{id}")
	public Viaggio getViaggioById(@PathVariable int id) {
		return viaggioService.getViaggioById(id);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Object> modificaViaggio(@PathVariable int id, @RequestBody ViaggioDto viaggioDto){
		return viaggioService.modificaViaggio(id, viaggioDto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> cancellaViaggio(@PathVariable int id) {
		return viaggioService.cancellaViaggio(id);
	}
}
