//package meex.model;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//
//@Entity
//public class Article {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String reference;
//    private String description;
//    private double prixVente;
//    private int stock;
//    private boolean archive = false;
//
//    public Article() {
//        // Constructeur vide requis par JPA
//    }
//
//    // Getters et Setters
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getReference() {
//        return reference;
//    }
//
//    public void setReference(String reference) {
//        this.reference = reference;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public double getPrixVente() {
//        return prixVente;
//    }
//
//    public void setPrixVente(double prixVente) {
//        this.prixVente = prixVente;
//    }
//
//    public int getStock() {
//        return stock;
//    }
//
//    public void setStock(int stock) {
//        this.stock = stock;
//    }
//
//    public boolean isArchive() {
//        return archive;
//    }
//
//    public void setArchive(boolean archive) {
//        this.archive = archive;
//    }
//}
