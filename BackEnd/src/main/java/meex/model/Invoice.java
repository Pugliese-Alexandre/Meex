package meex.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "invoices")
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Numéro ou référence de la facture */
    @Column(nullable = false, unique = true)
    private String number;

    /** Date de la facture */
    @Column(nullable = false)
    private LocalDate date;

    /** Adresse e-mail du client */
    @Column(nullable = false)
    private String clientEmail;

    /** Montant total TTC */
    @Column(nullable = false)
    private BigDecimal totalTTC;

    // Constructeur par défaut
    public Invoice() {}

    // ——— Getters ———

    public Long getId() {
        return id;
    }

    public String getNumber() {
        return number;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getClientEmail() {
        return clientEmail;
    }

    public BigDecimal getTotalTTC() {
        return totalTTC;
    }

    // ——— Setters ———

    public void setId(Long id) {
        this.id = id;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setClientEmail(String clientEmail) {
        this.clientEmail = clientEmail;
    }

    public void setTotalTTC(BigDecimal totalTTC) {
        this.totalTTC = totalTTC;
    }
}
