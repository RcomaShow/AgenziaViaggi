package it.accenture.viaggi.model;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "partecipazioni")
public class Partecipazione {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private LocalDate dataDiPrenotazione;
	
	@ManyToOne
	@JoinColumn(name = "viaggi_fk")
	private Viaggio viaggio;

	@ManyToOne
	@JoinColumn(name = "utenti_fk")
	private Utente utente;
	
	
	@Override
	public String toString() {
		return "Partecipazione [id=" + id + ", viaggio=" + viaggio + "]";
	}
	
	
}
