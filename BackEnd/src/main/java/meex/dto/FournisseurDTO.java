package meex.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FournisseurDTO {
    private Long id;
    private String nom;
    private String adresse;
    private String telephone;
    private String email;
    private String personneReference;
    private Double marge;
}

