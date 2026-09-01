package meex.controller;

import jakarta.persistence.EntityNotFoundException;
import meex.dto.FournisseurDTO;
import meex.model.Fournisseur;
import meex.service.FournisseurService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fournisseurs")
@CrossOrigin(origins = "*")  // ← autorise l'accès depuis Angular (CORS)
public class FournisseurController {

    private final FournisseurService fournisseurService;

    public FournisseurController(FournisseurService fournisseurService) {
        this.fournisseurService = fournisseurService;
    }

    // ✅ GET : Récupère tous les fournisseurs en format DTO (PAS D’ARTICLES → pas de boucle infinie)
    @GetMapping
    public List<FournisseurDTO> getAll() {
        return fournisseurService.getAllFournisseurs().stream()
                .map(this::mapToDTO)
                .toList();
    }

    // ✅ GET : Récupère un fournisseur par son ID (en entier, pas DTO ici)
    @GetMapping("/{id}")
    public ResponseEntity<Fournisseur> getById(@PathVariable Long id) {
        return fournisseurService.getFournisseurById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ POST : Crée un nouveau fournisseur
    @PostMapping
    public Fournisseur create(@RequestBody Fournisseur fournisseur) {
        return fournisseurService.createFournisseur(fournisseur);
    }

    // ✅ PUT : Met à jour un fournisseur existant (corrigé proprement)
    @PutMapping("/{id}")
    public ResponseEntity<Fournisseur> updateFournisseur(@PathVariable Long id, @RequestBody FournisseurDTO fournisseurDTO) {
        try {
            Fournisseur updatedFournisseur = fournisseurService.updateFournisseur(id, fournisseurDTO);
            return ResponseEntity.ok(updatedFournisseur);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ DELETE : Supprime un fournisseur par son ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        fournisseurService.deleteFournisseur(id);
        return ResponseEntity.noContent().build();
    }

    // 🟢 Ici la méthode de conversion vers le DTO
    private FournisseurDTO mapToDTO(Fournisseur fournisseur) {
        return new FournisseurDTO(
                fournisseur.getId(),
                fournisseur.getNom(),
                fournisseur.getAdresse(),
                fournisseur.getTelephone(),
                fournisseur.getEmail(),
                fournisseur.getPersonneReference(),
                fournisseur.getMarge()
        );
    }
}
