package it.accenture.viaggi.model;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table( name = "viaggi")
public class Viaggio {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int codiceDiArchiviazione;
	private String luogo;
	private LocalDate dataDiPartenza;//Da controllore
	private LocalDate dataDiRitorno;
	private String formula;
	private double costo;
	private int postiDisponibili;
	
	@JsonIgnore
	@OneToMany(mappedBy = "viaggio", cascade = CascadeType.ALL)
	private List<Partecipazione> partecipazioni;

	@Override
	public String toString() {
		return "Viaggio [codiceDiArchiviazione=" + codiceDiArchiviazione + ", luogo=" + luogo + ", dataDiPartenza="
				+ dataDiPartenza + ", dataDiRitorno=" + dataDiRitorno + ", formula=" + formula + ", costo=" + costo
				+ ", postiDisponibili=" + postiDisponibili + "]";
	}
	

}
