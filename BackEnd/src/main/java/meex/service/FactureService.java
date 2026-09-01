package meex.service;

import meex.model.Facture;
import meex.model.Client;
import meex.model.Commande;
import meex.dto.FactureResponseDTO;
import meex.repository.FactureRepository;
import meex.repository.ClientRepository;
import meex.repository.CommandeRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.math.BigDecimal;

@Service
public class FactureService {

    private final FactureRepository factureRepository;
    private final ClientRepository clientRepository;
    private final CommandeRepository commandeRepository;

    public FactureService(FactureRepository factureRepository,
                          ClientRepository clientRepository,
                          CommandeRepository commandeRepository) {
        this.factureRepository = factureRepository;
        this.clientRepository = clientRepository;
        this.commandeRepository = commandeRepository;
    }

    public Facture save(Facture facture) {
        // Récupérer le client existant
        Long clientId = facture.getClient().getId();
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client non trouvé avec id " + clientId));

        // Récupérer la commande existante
        Long commandeId = facture.getCommande().getId();
        Commande commande = commandeRepository.findById(commandeId)
                .orElseThrow(() -> new RuntimeException("Commande non trouvée avec id " + commandeId));

        // Réassigner les entités récupérées
        facture.setClient(client);
        facture.setCommande(commande);

        return factureRepository.save(facture);
    }

    public List<FactureResponseDTO> getAllFactures() {
        return factureRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public void supprimerFacture(Long id) {
        if (!factureRepository.existsById(id)) {
            throw new RuntimeException("Facture non trouvée avec l'id : " + id);
        }
        factureRepository.deleteById(id);
    }

    public FactureResponseDTO toResponseDTO(Facture facture) {
        Client client = facture.getClient();
        Commande commande = facture.getCommande();

        return new FactureResponseDTO(
                facture.getId(),
                client != null ? client.getNom() : "Inconnu",
                client != null ? client.getPrenom() : "",
                facture.getMontantTTC(),
                commande != null ? commande.getQuantiteTotale() : 0,
                commande != null ? commande.getStatut().name() : "Inconnu",
                commande != null ? commande.getArticlesRefs() : List.of(),
                facture.getDateFacture(),
                facture.getDateEcheance()
        );
    }
}
