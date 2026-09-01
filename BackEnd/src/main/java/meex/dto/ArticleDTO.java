package meex.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import meex.dto.FournisseurIdDTO;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleDTO {
    private Long id;
    private String reference;
    private String description;
    private Double prixAchat;
    private Double prixVente;
    private Integer stock;
    private Integer vendu;
    private FournisseurIdDTO fournisseur;  // ← ⚠️ Ici on utilise seulement l'id du fournisseur !

    // ✅ Pour les cas où tu veux seulement afficher la référence et le prix (ex : Commande)
    public ArticleDTO(String reference, Double prixVente) {
        this.reference = reference;
        this.prixVente = prixVente;
    }
}
