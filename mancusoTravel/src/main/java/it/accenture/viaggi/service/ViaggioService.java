package it.accenture.viaggi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import it.accenture.viaggi.model.Viaggio;
import it.accenture.viaggi.model.ViaggioDto;
import it.accenture.viaggi.repository.ViaggioRepository;

@Service
public class ViaggioService {

 
	@Autowired
	private ViaggioRepository viaggioRepository;

	
	public ResponseEntity<String> creaViaggio(ViaggioDto viaggioDto) {
		Viaggio viaggio = new Viaggio();
		if(viaggioDto != null) {
			viaggio.setLuogo(viaggioDto.getLuogo());
			viaggio.setDataDiPartenza(viaggioDto.getDataDiPartenza());
			viaggio.setDataDiRitorno(viaggioDto.getDataDiRitorno());
			viaggio.setFormula(viaggioDto.getFormula());
			viaggio.setCosto(viaggioDto.getCosto());
			viaggio.setPostiDisponibili(viaggioDto.getPostiDisponibili());
			
			int codice = viaggioRepository.save(viaggio).getCodiceDiArchiviazione();
			return new ResponseEntity<String>("Viaggio creato con codice: " + codice, HttpStatus.CREATED);
		}
		return new ResponseEntity<String>("Viaggio non creato", HttpStatus.NOT_ACCEPTABLE);
	}
	
	public List<Viaggio> getViaggi(){
		return viaggioRepository.findAll();
	}
	
	public Viaggio getViaggioById(int id) {
		return viaggioRepository.findById(id).orElse(null);
	}
	
	public ResponseEntity<Object> modificaViaggio(int id, ViaggioDto viaggioDto) {
		Viaggio viaggioMod = getViaggioById(id);
		
		if(viaggioMod != null) {
			viaggioMod.setLuogo(viaggioDto.getLuogo());
			viaggioMod.setDataDiPartenza(viaggioDto.getDataDiPartenza());
			viaggioMod.setDataDiRitorno(viaggioDto.getDataDiRitorno());
			viaggioMod.setFormula(viaggioDto.getFormula());
			viaggioMod.setCosto(viaggioDto.getCosto());
			viaggioMod.setPostiDisponibili(viaggioDto.getPostiDisponibili());
			
			return new ResponseEntity<>( viaggioRepository.save(viaggioMod), HttpStatus.OK);
		}
		return new ResponseEntity<>("Modifica non andata a buon fine", HttpStatus.NOT_MODIFIED);
	}
	
	public ResponseEntity<String> cancellaViaggio(int id) {
		viaggioRepository.deleteById(id);
		return new ResponseEntity<String>("Viaggio cancellato", HttpStatus.OK);
	}
}
