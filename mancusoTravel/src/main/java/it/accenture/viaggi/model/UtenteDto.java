package it.accenture.viaggi.model;

import lombok.Data;

@Data
public class UtenteDto {
	private String nome;
	private String cognome;
	private String indirizzo;
	private String codiceFiscale;
	private String username;
	private String password;
	private String ruolo;

}
