package it.accenture.viaggi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import it.accenture.viaggi.model.Utente;
import it.accenture.viaggi.model.UtenteDto;
import it.accenture.viaggi.repository.UtenteRepository;

@Service
public class UtenteService {
	@Autowired
	private UtenteRepository utenteRepository;
	
	
	public ResponseEntity<String> creaUtente(UtenteDto utenteDto) {
		
		if(utenteDto != null) {
			Utente utente = new Utente();
			utente.setNome(utenteDto.getNome());
			utente.setCognome(utenteDto.getCognome());
			utente.setIndirizzo(utenteDto.getIndirizzo());
			utente.setCodiceFiscale(utenteDto.getCodiceFiscale());
			utente.setUsername(utenteDto.getUsername());
			utente.setPassword(utenteDto.getPassword());
			utente.setRuolo(utenteDto.getRuolo());
			int id = utenteRepository.save(utente).getId();
			return new ResponseEntity<String>("Utente creato con id: " + id, HttpStatus.CREATED);
		}
		
		return new ResponseEntity<String>("Utente non creato ", HttpStatus.NOT_FOUND);
	}
	
	public List<Utente> getUtenti() {
		return utenteRepository.findAll();
	}
	
	public Utente getUtenteById(int id) {
		return utenteRepository.findById(id).orElse(null);
	}
	
	public ResponseEntity<Utente> modificaUtente(int id, UtenteDto utenteDto) {
		Utente utenteMod = utenteRepository.findById(id).orElse(null);
		
		if(utenteMod != null ) {
				utenteMod.setNome(utenteDto.getNome());
				utenteMod.setCognome(utenteDto.getCognome());
				utenteMod.setIndirizzo(utenteDto.getIndirizzo());
				utenteMod.setCodiceFiscale(utenteDto.getCodiceFiscale());
				utenteMod.setUsername(utenteDto.getUsername());
				utenteMod.setPassword(utenteDto.getPassword());
				utenteMod.setRuolo(utenteDto.getRuolo());
				utenteRepository.save(utenteMod);
				return new ResponseEntity<Utente>(utenteMod, HttpStatus.OK);
		}else {
			return new ResponseEntity<Utente>(utenteMod, HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<String> cancellaUtente(int id) {
		utenteRepository.deleteById(id);
		return new ResponseEntity<String>("Utente cancellato", HttpStatus.OK);
	}
}
