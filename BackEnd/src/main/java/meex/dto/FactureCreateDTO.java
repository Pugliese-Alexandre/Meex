package meex.dto;

import java.time.LocalDate;

public class FactureCreateDTO {
    private Long clientId;
    private Long commandeId;
    private LocalDate dateFacture;
    private LocalDate dateEcheance;
    private Double montantHT;
    private Double montantTVA;
    private Double montantTTC;

    // Getters et Setters
    public Long getClientId() { return clientId; }
    public void setClientId(Long clientId) { this.clientId = clientId; }

    public Long getCommandeId() { return commandeId; }
    public void setCommandeId(Long commandeId) { this.commandeId = commandeId; }

    public LocalDate getDateFacture() { return dateFacture; }
    public void setDateFacture(LocalDate dateFacture) { this.dateFacture = dateFacture; }

    public LocalDate getDateEcheance() { return dateEcheance; }
    public void setDateEcheance(LocalDate dateEcheance) { this.dateEcheance = dateEcheance; }

    public Double getMontantHT() { return montantHT; }
    public void setMontantHT(Double montantHT) { this.montantHT = montantHT; }

    public Double getMontantTVA() { return montantTVA; }
    public void setMontantTVA(Double montantTVA) { this.montantTVA = montantTVA; }

    public Double getMontantTTC() { return montantTTC; }
    public void setMontantTTC(Double montantTTC) { this.montantTTC = montantTTC; }
}
