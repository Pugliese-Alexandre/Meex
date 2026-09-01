package meex.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "client", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String prenom;
    private String nom;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "mot_de_passe", nullable = false)
    private String motDePasse;

    @Column(name = "date_inscription")
    private LocalDate dateInscription;

    @Column(name = "numero_maison")
    private String numeroMaison;

    @Column(name = "code_postal")
    private String codePostal;

    @JsonFormat(pattern = "yyyy-MM-dd")  // important pour corriger le décalage
    @Column(name = "date_anniversaire")
    private LocalDate dateAnniversaire;

    @OneToMany(mappedBy = "client")
    @JsonManagedReference
    private List<Commande> commandes;
}
