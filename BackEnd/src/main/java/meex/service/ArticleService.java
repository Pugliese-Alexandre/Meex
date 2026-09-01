package meex.service;

import meex.dto.ArticleDTO;
import meex.dto.FournisseurIdDTO;
import meex.model.Article;
import meex.model.Fournisseur;
import meex.repository.ArticleRepository;
import meex.repository.FournisseurRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final FournisseurRepository fournisseurRepository;

    public ArticleService(ArticleRepository articleRepository, FournisseurRepository fournisseurRepository) {
        this.articleRepository = articleRepository;
        this.fournisseurRepository = fournisseurRepository;
    }

    // ✅ CREATE
    public Article createArticle(ArticleDTO articleDTO) {
        Article article = mapToEntity(articleDTO);
        return articleRepository.save(article);
    }

    // ✅ READ ALL
    public List<ArticleDTO> getAllArticles() {
        return articleRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // 🟡 Mapping DTO → ENTITÉ (pour POST)
    private Article mapToEntity(ArticleDTO dto) {
        Article article = new Article();
        article.setReference(dto.getReference());
        article.setDescription(dto.getDescription());
        article.setPrixAchat(dto.getPrixAchat());
        article.setPrixVente(dto.getPrixVente());
        article.setStock(dto.getStock());
        article.setVendu(dto.getVendu() != null ? dto.getVendu() : 0);


        if (dto.getFournisseur() != null && dto.getFournisseur().getId() != null) {
            Optional<Fournisseur> fournisseur = fournisseurRepository.findById(dto.getFournisseur().getId());
            fournisseur.ifPresent(article::setFournisseur);
        }
        return article;
    }

    // 🟢 Mapping ENTITÉ → DTO (pour GET)
    private ArticleDTO mapToDTO(Article article) {
        Fournisseur fournisseur = article.getFournisseur();
        FournisseurIdDTO fournisseurDTO = null;

        if (fournisseur != null) {
            fournisseurDTO = new FournisseurIdDTO(fournisseur.getId()); // ⚠️ Ici on utilise bien FournisseurIdDTO !
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
}
