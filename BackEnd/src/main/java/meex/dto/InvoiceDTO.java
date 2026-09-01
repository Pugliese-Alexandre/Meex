package meex.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class InvoiceDTO {

    private String number;
    private LocalDate dateEmission;
    private LocalDate dateEcheance;
    private String clientName;
    private String clientEmail;
    private List<ItemDTO> articles;
    private BigDecimal total;


    // Getters / setters
    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }

    public LocalDate getDateEmission() { return dateEmission; }
    public void setDateEmission(LocalDate dateEmission) { this.dateEmission = dateEmission; }

    public LocalDate getDateEcheance() { return dateEcheance; }
    public void setDateEcheance(LocalDate dateEcheance) { this.dateEcheance = dateEcheance; }

    public String getClientName() { return clientName; }
    public void setClientName(String clientName) { this.clientName = clientName; }

    public String getClientEmail() { return clientEmail; }
    public void setClientEmail(String clientEmail) { this.clientEmail = clientEmail; }

    public List<ItemDTO> getArticles() { return articles; }
    public void setArticles(List<ItemDTO> articles) { this.articles = articles; }

    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }

    public static class ItemDTO {
        private String reference;
        private int quantite;
        private BigDecimal prixUnitaire;

        public String getReference() { return reference; }
        public void setReference(String reference) { this.reference = reference; }

        public int getQuantite() { return quantite; }
        public void setQuantite(int quantite) { this.quantite = quantite; }

        public BigDecimal getPrixUnitaire() { return prixUnitaire; }
        public void setPrixUnitaire(BigDecimal prixUnitaire) { this.prixUnitaire = prixUnitaire; }
    }
}
