package it.accenture.viaggi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import it.accenture.viaggi.controller.PartecipazioneController;
import it.accenture.viaggi.model.Partecipazione;
import it.accenture.viaggi.model.PartecipazioneDto;
import it.accenture.viaggi.model.Utente;
import it.accenture.viaggi.model.Viaggio;
import it.accenture.viaggi.repository.PartecipazioneRepository;
import it.accenture.viaggi.repository.UtenteRepository;
import it.accenture.viaggi.repository.ViaggioRepository;

@Service
public class PartecipazioneService {


	@Autowired
	private ViaggioRepository viaggioRepository;
	@Autowired
	private PartecipazioneRepository partecipazioneRepository;
	@Autowired
	private UtenteRepository utenteRepository;

	public ResponseEntity<String> creaPartecipazione(PartecipazioneDto partecipazioneDto) {
		Viaggio viaggio = viaggioRepository.findById(partecipazioneDto.getViaggioId()).orElse(null);
		Utente utente = utenteRepository.findById(partecipazioneDto.getUtenteId()).orElse(null);
		
		if(viaggio != null || utente != null) {
			Partecipazione partecipazione = new Partecipazione();
			partecipazione.setViaggio(viaggio);
			partecipazione.setUtente(utente);
			partecipazione.setDataDiPrenotazione(partecipazioneDto.getDataDiPrenotazione());
			int id = partecipazioneRepository.save(partecipazione).getId();
			if(viaggio.getPostiDisponibili() > 0) {
				viaggio.setPostiDisponibili(viaggio.getPostiDisponibili() - 1);
				viaggioRepository.save(viaggio);
			}
			return new ResponseEntity<String>("Partecipazione con id: " + id, HttpStatus.OK);
		}
		return new ResponseEntity<String>("Viaggio non trovato o Utente non trovato", HttpStatus.NOT_FOUND);
	}
	
	public List<Partecipazione> getPartecipazioni() {
		return partecipazioneRepository.findAll();
	}
	
	public Partecipazione getPartecipazioneById(int id) {
		return partecipazioneRepository.findById(id).orElse(null);
	}
	
	public ResponseEntity<Partecipazione> modificaPartecipazione(int id, PartecipazioneDto partecipazioneDto) {
	Partecipazione partecipazioneMod = partecipazioneRepository.findById(id).orElse(null);
		
		if(partecipazioneMod != null ) {
			Viaggio viaggio = viaggioRepository.findById(partecipazioneDto.getViaggioId()).orElse(null);
			Utente utente = utenteRepository.findById(partecipazioneDto.getUtenteId()).orElse(null);
			if (viaggio != null || utente != null) {
				partecipazioneMod.setViaggio(viaggio);
				partecipazioneMod.setUtente(utente);
				partecipazioneRepository.save(partecipazioneMod);
				return new ResponseEntity<Partecipazione>(partecipazioneMod, HttpStatus.OK);
			}
			else {
				return new ResponseEntity<Partecipazione>(partecipazioneMod, HttpStatus.NOT_ACCEPTABLE);
			}
		}else {
			return new ResponseEntity<Partecipazione>(partecipazioneMod, HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<String> cancellaPartecipazione(int id) {
		Partecipazione partecipazione = partecipazioneRepository.findById(id).orElse(null);
		Viaggio viaggio = viaggioRepository.findById(partecipazione.getViaggio().getCodiceDiArchiviazione()).orElse(null);
		
		if (partecipazione != null) {
			partecipazioneRepository.delete(partecipazione);
			viaggio.setPostiDisponibili(viaggio.getPostiDisponibili() + 1);
			viaggioRepository.save(viaggio);
		}
		
		return new ResponseEntity<String>("Partecipazione cancellato", HttpStatus.OK);
	}
}
