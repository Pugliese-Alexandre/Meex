package meex.controller;

import meex.dto.ArticleDTO;
import meex.dto.CommandeRequestDTO;
import meex.dto.CommandeResponseDTO;

import meex.model.Article;
import meex.model.Client;
import meex.model.Commande;
import meex.enums.StatutCommande;
import meex.model.CommandeArticle;

import meex.repository.ArticleRepository;
import meex.repository.ClientRepository;
import meex.repository.CommandeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commandes")
@CrossOrigin(origins = "http://localhost:4200")
public class CommandeController {

    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @GetMapping
    public List<CommandeResponseDTO> getAllCommandes() {
        List<Commande> commandes = commandeRepository.findAll();

        return commandes.stream().map(commande -> {
            List<ArticleDTO> articlesDTO = commande.getLignesCommande().stream()
                    .map(ligne -> new ArticleDTO(
                            ligne.getArticle().getReference(),
                            ligne.getArticle().getPrixVente()))
                    .toList();

            double total = commande.getLignesCommande().stream()
                    .mapToDouble(ligne -> ligne.getArticle().getPrixVente() * ligne.getQuantite())
                    .sum();

            return new CommandeResponseDTO(
                    commande.getId(),
                    commande.getDate(),
                    commande.getClient().getNom(),
                    articlesDTO,
                    total,
                    commande.getStatut() != null ? commande.getStatut().toString() : null,
                    commande.getFacture() != null ? commande.getFacture().getId() : null
            );
        }).toList();
    }

    @GetMapping("/{id}")
    public CommandeResponseDTO getCommandeById(@PathVariable Long id) {
        Commande commande = commandeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commande non trouvée"));

        List<ArticleDTO> articlesDTO = commande.getLignesCommande().stream()
                .map(ligne -> new ArticleDTO(
                        ligne.getArticle().getReference(),
                        ligne.getArticle().getPrixVente()))
                .toList();

        double total = commande.getLignesCommande().stream()
                .mapToDouble(ligne -> ligne.getArticle().getPrixVente() * ligne.getQuantite())
                .sum();

        return new CommandeResponseDTO(
                commande.getId(),
                commande.getDate(),
                commande.getClient().getNom(),
                articlesDTO,
                total,
                commande.getStatut() != null ? commande.getStatut().toString() : null,
                commande.getFacture() != null ? commande.getFacture().getId() : null
        );
    }

    @PostMapping
    public CommandeResponseDTO createCommande(@RequestBody CommandeRequestDTO dto) {
        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Client non trouvé"));

        Commande commande = new Commande();
        commande.setDate(dto.getDate());
        commande.setClient(client);
        commande.setStatut(StatutCommande.EN_ATTENTE);

        // Crée les lignes AVANT de sauvegarder la commande
        List<CommandeArticle> lignes = dto.getArticles().stream()
                .map(articleDTO -> {
                    Article article = articleRepository.findById(articleDTO.getArticleId())
                            .orElseThrow(() -> new RuntimeException("Article non trouvé"));
                    CommandeArticle ligne = new CommandeArticle();
                    ligne.setArticle(article);
                    ligne.setQuantite(articleDTO.getQuantite());
                    ligne.setCommande(commande);
                    return ligne;
                }).toList();

        commande.setLignesCommande(lignes);

        // Sauvegarde TOUT (commande + lignes) en une seule fois
        Commande savedCommande = commandeRepository.save(commande);

        double total = savedCommande.getLignesCommande().stream()
                .mapToDouble(ligne -> ligne.getArticle().getPrixVente() * ligne.getQuantite())
                .sum();

        List<ArticleDTO> articlesDTO = savedCommande.getLignesCommande().stream()
                .map(ligne -> new ArticleDTO(
                        ligne.getArticle().getReference(),
                        ligne.getArticle().getPrixVente()))
                .toList();

        return new CommandeResponseDTO(
                savedCommande.getId(),
                savedCommande.getDate(),
                savedCommande.getClient().getNom(),
                articlesDTO,
                total,
                savedCommande.getStatut().toString(),
                null
        );
    }

    @PutMapping("/{id}")
    public CommandeResponseDTO updateCommande(@PathVariable Long id, @RequestBody CommandeRequestDTO dto) {
        Commande existingCommande = commandeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commande non trouvée"));

        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Client non trouvé"));

        existingCommande.setDate(dto.getDate());
        existingCommande.setClient(client);

        // Supprime proprement les anciennes lignes (important pour Hibernate)
        existingCommande.getLignesCommande().clear();

        // Ajoute les nouvelles lignes avec la relation établie
        List<CommandeArticle> nouvellesLignes = dto.getArticles().stream()
                .map(articleDTO -> {
                    Article article = articleRepository.findById(articleDTO.getArticleId())
                            .orElseThrow(() -> new RuntimeException("Article non trouvé"));

                    CommandeArticle ca = new CommandeArticle();
                    ca.setCommande(existingCommande);
                    ca.setArticle(article);
                    ca.setQuantite(articleDTO.getQuantite());

                    return ca;
                })
                .toList();

        existingCommande.getLignesCommande().addAll(nouvellesLignes);

        Commande updatedCommande = commandeRepository.save(existingCommande);

        List<ArticleDTO> articlesDTO = updatedCommande.getLignesCommande().stream()
                .map(ligne -> new ArticleDTO(
                        ligne.getArticle().getReference(),
                        ligne.getArticle().getPrixVente()))
                .toList();

        double total = updatedCommande.getLignesCommande().stream()
                .mapToDouble(ligne -> ligne.getArticle().getPrixVente() * ligne.getQuantite())
                .sum();

        return new CommandeResponseDTO(
                updatedCommande.getId(),
                updatedCommande.getDate(),
                updatedCommande.getClient().getNom(),
                articlesDTO,
                total,
                updatedCommande.getStatut().toString(),
                updatedCommande.getFacture() != null ? updatedCommande.getFacture().getId() : null
        );
    }

    @DeleteMapping("/{id}")
    public void deleteCommande(@PathVariable Long id) {
        Commande commande = commandeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commande non trouvée"));
        commandeRepository.delete(commande);
    }
}


