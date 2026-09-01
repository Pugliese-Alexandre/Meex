package meex.controller;

import meex.dto.ArticleDTO;
import meex.dto.FournisseurDTO;
import meex.dto.FournisseurIdDTO;
import meex.model.Article;
import meex.model.Fournisseur;
import meex.repository.ArticleRepository;
import meex.repository.FournisseurRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/articles")
@CrossOrigin(origins = "http://localhost:4200")
public class ArticleController {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private FournisseurRepository fournisseurRepository;

    // CREATE avec DTO
    @PostMapping
    public ResponseEntity<Article> createArticle(@RequestBody ArticleDTO articleDTO) {
        // Ton log de debug pour vérifier ce que tu reçois
        System.out.println("🟢 Fournisseur ID reçu : " +
                (articleDTO.getFournisseur() != null ? articleDTO.getFournisseur().getId() : "Aucun fournisseur reçu")
        );

        Article article = mapToEntity(articleDTO);
        Article savedArticle = articleRepository.save(article);
        return ResponseEntity.ok(savedArticle);
    }


    // READ ALL (GET)
    @GetMapping
    public List<ArticleDTO> getAllArticles() {
        return articleRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Mapping DTO → Entité (POST)
    private Article mapToEntity(ArticleDTO dto) {
        Article article = new Article();
        article.setReference(dto.getReference());
        article.setDescription(dto.getDescription());
        article.setPrixAchat(dto.getPrixAchat());
        article.setPrixVente(dto.getPrixVente());
        article.setStock(dto.getStock());
        article.setVendu(dto.getVendu());

        System.out.println(" Fournisseur ID reçu : " +
                (dto.getFournisseur() != null ? dto.getFournisseur().getId() : "Aucun fournisseur reçu"));

        if (dto.getFournisseur() != null && dto.getFournisseur().getId() != null) {
            Optional<Fournisseur> fournisseur = fournisseurRepository.findById(dto.getFournisseur().getId());
            fournisseur.ifPresent(article::setFournisseur);
        } else {
            System.err.println(" Aucun fournisseur trouvé !");
        }

        return article;
    }


    // Mapping Entité → DTO (GET)
    private ArticleDTO mapToDTO(Article article) {
        Fournisseur fournisseur = article.getFournisseur();
        FournisseurIdDTO fournisseurDTO = null;

        if (fournisseur != null) {
            fournisseurDTO = new FournisseurIdDTO(fournisseur.getId());
        }

        return new ArticleDTO(
                article.getId(),
                article.getReference(),
                article.getDescription(),
                article.getPrixAchat(),
                article.getPrixVente(),
                article.getStock(),
                article.getVendu(),
                fournisseurDTO                        
        );
    }
    // 🔵 UPDATE (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable Long id, @RequestBody ArticleDTO articleDTO) {
        Optional<Article> optionalArticle = articleRepository.findById(id);

        if (optionalArticle.isEmpty()) {
            return ResponseEntity.notFound().build(); // ← 404 si pas trouvé
        }

        Article article = optionalArticle.get();
        article.setReference(articleDTO.getReference());
        article.setDescription(articleDTO.getDescription());
        article.setPrixAchat(articleDTO.getPrixAchat());
        article.setPrixVente(articleDTO.getPrixVente());
        article.setStock(articleDTO.getStock());
        article.setVendu(articleDTO.getVendu());

        // Fournisseur : mise à jour uniquement si ID fourni
        if (articleDTO.getFournisseur() != null && articleDTO.getFournisseur().getId() != null) {
            Optional<Fournisseur> fournisseur = fournisseurRepository.findById(articleDTO.getFournisseur().getId());
            fournisseur.ifPresent(article::setFournisseur);
        }

        Article updatedArticle = articleRepository.save(article);
        return ResponseEntity.ok(updatedArticle);
    }

    // DELETE (Supprimer un article par ID)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteArticle(@PathVariable Long id) {
        try {
            if (!articleRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }

            articleRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace(); // Log dans ta console pour voir l'erreur précise
            return ResponseEntity.status(500).body("Erreur lors de la suppression : " + e.getMessage());
        }
    }
}