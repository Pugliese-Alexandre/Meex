package meex.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
public class CategorieFournisseur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String description;
    private String couleur;

    @OneToMany(mappedBy = "categorie")
    private List<Article> articles;

    // Les getters et setters sont générés automatiquement par Lombok (@Data)
}
