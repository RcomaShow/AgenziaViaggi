package it.accenture.viaggi.model;

import java.time.LocalDate;

import lombok.Data;

@Data
public class PartecipazioneDto {
	private int viaggioId;
	private int utenteId;
	private LocalDate dataDiPrenotazione;
}
