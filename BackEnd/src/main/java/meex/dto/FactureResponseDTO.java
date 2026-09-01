package meex.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class FactureResponseDTO {
    private Long id;
    private String nomClient;
    private String prenomClient;
    private BigDecimal montantTotal;
    private int quantiteTotale;
    private String statutCommande;
    private List<String> referencesProduits;
    private LocalDate dateEmission;
    private LocalDate dateEcheance;

    // Constructeur vide
    public FactureResponseDTO() {}

    // Constructeur complet
    public FactureResponseDTO(Long id, String nomClient, String prenomClient,
                              BigDecimal montantTotal, int quantiteTotale,
                              String statutCommande, List<String> referencesProduits,
                              LocalDate dateEmission, LocalDate dateEcheance) {
        this.id = id;
        this.nomClient = nomClient;
        this.prenomClient = prenomClient;
        this.montantTotal = montantTotal;
        this.quantiteTotale = quantiteTotale;
        this.statutCommande = statutCommande;
        this.referencesProduits = referencesProduits;
        this.dateEmission = dateEmission;
        this.dateEcheance = dateEcheance;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNomClient() { return nomClient; }
    public void setNomClient(String nomClient) { this.nomClient = nomClient; }

    public String getPrenomClient() { return prenomClient; }
    public void setPrenomClient(String prenomClient) { this.prenomClient = prenomClient; }

    public BigDecimal getMontantTotal() { return montantTotal; }
    public void setMontantTotal(BigDecimal montantTotal) { this.montantTotal = montantTotal; }

    public int getQuantiteTotale() { return quantiteTotale; }
    public void setQuantiteTotale(int quantiteTotale) { this.quantiteTotale = quantiteTotale; }

    public String getStatutCommande() { return statutCommande; }
    public void setStatutCommande(String statutCommande) { this.statutCommande = statutCommande; }

    public List<String> getReferencesProduits() { return referencesProduits; }
    public void setReferencesProduits(List<String> referencesProduits) { this.referencesProduits = referencesProduits; }

    public LocalDate getDateEmission() { return dateEmission; }
    public void setDateEmission(LocalDate dateEmission) { this.dateEmission = dateEmission; }

    public LocalDate getDateEcheance() { return dateEcheance; }
    public void setDateEcheance(LocalDate dateEcheance) { this.dateEcheance = dateEcheance; }
}
