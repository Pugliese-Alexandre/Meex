package meex.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;
import lombok.Data;

@Data
@Entity
public class Fournisseur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String adresse;
    private String telephone;
    private String email;

    @Column(name = "personne_reference")
    private String personneReference;

    private Double marge;

    @OneToMany(mappedBy = "fournisseur")
    @JsonIgnore // 🟢 Evite la boucle infinie !
    private List<Article> articles;

}
