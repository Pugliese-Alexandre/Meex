    package meex.model;

    import jakarta.persistence.*;
    import java.math.BigDecimal;
    import java.time.LocalDate;

    @Entity
    public class Facture {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private LocalDate dateFacture;
        private LocalDate dateEcheance;

        private BigDecimal montantHT;
        private BigDecimal montantTVA;
        private BigDecimal montantTTC;

        @ManyToOne
        @JoinColumn(name = "client_id")
        private Client client;

        @OneToOne
        @JoinColumn(name = "commande_id")
        private Commande commande;

        // Getters et Setters

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public LocalDate getDateFacture() {
            return dateFacture;
        }

        public void setDateFacture(LocalDate dateFacture) {
            this.dateFacture = dateFacture;
        }

        public LocalDate getDateEcheance() {
            return dateEcheance;
        }

        public void setDateEcheance(LocalDate dateEcheance) {
            this.dateEcheance = dateEcheance;
        }

        public BigDecimal getMontantHT() {
            return montantHT;
        }

        public void setMontantHT(BigDecimal montantHT) {
            this.montantHT = montantHT;
        }

        public BigDecimal getMontantTVA() {
            return montantTVA;
        }

        public void setMontantTVA(BigDecimal montantTVA) {
            this.montantTVA = montantTVA;
        }

        public BigDecimal getMontantTTC() {
            return montantTTC;
        }

        public void setMontantTTC(BigDecimal montantTTC) {
            this.montantTTC = montantTTC;
        }

        public Client getClient() {
            return client;
        }

        public void setClient(Client client) {
            this.client = client;
        }

        public Commande getCommande() {
            return commande;
        }

        public void setCommande(Commande commande) {
            this.commande = commande;
        }
    }
