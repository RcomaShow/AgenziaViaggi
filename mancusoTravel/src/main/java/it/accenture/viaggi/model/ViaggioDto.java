package it.accenture.viaggi.model;

import java.time.LocalDate;
import lombok.Data;


@Data
public class ViaggioDto {
	private String luogo;
	private LocalDate dataDiPartenza;
	private LocalDate dataDiRitorno;
	private String formula;
	private double costo;
	private int postiDisponibili;
	
}
