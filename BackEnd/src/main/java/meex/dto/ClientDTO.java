package meex.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientDTO {
    private Long id;
    private String prenom;
    private String nom;
    private String email;
    private String telephone;
    private String adresse;
    private String numeroMaison;
    private String codePostal;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateAnniversaire;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateInscription;

}
