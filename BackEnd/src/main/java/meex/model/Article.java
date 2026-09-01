package meex.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reference;
    private int stock;
    private int vendu;
    private String description;
    private Double prixAchat;
    private Double prixVente;

    @ManyToOne
    @JoinColumn(name = "fournisseur_id")
    private Fournisseur fournisseur;

    @ManyToOne
    @JoinColumn(name = "categorie_id")
    private CategorieFournisseur categorie;
}
