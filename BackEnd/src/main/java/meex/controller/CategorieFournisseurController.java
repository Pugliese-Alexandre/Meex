package meex.controller;

import meex.model.CategorieFournisseur;
import meex.repository.CategorieFournisseurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories-fournisseur")
public class CategorieFournisseurController {

    @Autowired
    private CategorieFournisseurRepository categorieFournisseurRepository;

    // GET - toutes les catégories
    @GetMapping
    public List<CategorieFournisseur> getAllCategories() {
        return categorieFournisseurRepository.findAll();
    }

    // GET - catégorie par ID
    @GetMapping("/{id}")
    public ResponseEntity<CategorieFournisseur> getById(@PathVariable Long id) {
        Optional<CategorieFournisseur> categorie = categorieFournisseurRepository.findById(id);
        return categorie.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST - créer une nouvelle catégorie
    @PostMapping
    public CategorieFournisseur create(@RequestBody CategorieFournisseur categorie) {
        return categorieFournisseurRepository.save(categorie);
    }

    // PUT - mettre à jour une catégorie existante
    @PutMapping("/{id}")
    public ResponseEntity<CategorieFournisseur> update(@PathVariable Long id, @RequestBody CategorieFournisseur updatedCategorie) {
        return categorieFournisseurRepository.findById(id)
                .map(categorie -> {
                    categorie.setNom(updatedCategorie.getNom());
                    categorie.setDescription(updatedCategorie.getDescription());
                    categorie.setCouleur(updatedCategorie.getCouleur());
                    return ResponseEntity.ok(categorieFournisseurRepository.save(categorie));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE - supprimer une catégorie par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (categorieFournisseurRepository.existsById(id)) {
            categorieFournisseurRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
