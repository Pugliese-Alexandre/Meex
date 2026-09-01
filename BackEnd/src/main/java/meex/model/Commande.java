package meex.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import meex.enums.StatutCommande;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private StatutCommande statut;

    @ManyToOne
    @JoinColumn(name = "client_id")
    @JsonBackReference
    private Client client;

    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommandeArticle> lignesCommande = new ArrayList<>();

    @OneToOne(mappedBy = "commande", cascade = CascadeType.ALL)
    private Facture facture; //

    public int getQuantiteTotale() {
        if (lignesCommande == null) return 0;
        return lignesCommande.stream()
                .mapToInt(CommandeArticle::getQuantite)
                .sum();
    }

    public List<String> getArticlesRefs() {
        if (lignesCommande == null) return List.of();
        return lignesCommande.stream()
                .map(ca -> ca.getArticle().getReference()) // ou getNom() si tu préfères
                .toList(); // Java 16+, sinon .collect(Collectors.toList());
    }

    public void addLigneCommande(CommandeArticle ligne) {
        lignesCommande.add(ligne);
        ligne.setCommande(this);
    }

    public double getMontantTotal() {
        if (lignesCommande == null) return 0.0;
        return lignesCommande.stream()
                .mapToDouble(lc ->
                        lc.getArticle().getPrixVente().doubleValue() * lc.getQuantite()
                )
                .sum();
    }
}
