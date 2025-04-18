package it.accenture.viaggi.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table (name = "utenti")
public class Utente {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private int id;
	
	private String nome;
	private String cognome;
	private String indirizzo;
	@Column(unique = true)
	private String codiceFiscale;
	@Column(unique = true)
	private String username;
	private String password;
	private String ruolo;

	@JsonIgnore
	@OneToMany(mappedBy = "utente", cascade = CascadeType.ALL)
	private List<Partecipazione> partecipazioni;
	
	@Override
	public String toString() {
		return "Utente [id=" + id + ", nome=" + nome + ", cognome=" + cognome + ", indirizzo=" + indirizzo
				+ ", codiceFiscale=" + codiceFiscale + ", username=" + username + ", password=" + password + ", ruolo="
				+ ruolo + "]";
	}
		
}
