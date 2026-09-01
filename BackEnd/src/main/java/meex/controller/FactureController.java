package meex.controller;

import meex.dto.FactureCreateDTO;
import meex.dto.FactureResponseDTO;
import meex.model.Facture;
import meex.model.Client;
import meex.model.Commande;
import meex.service.FactureService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/factures")

public class FactureController {




    private final FactureService factureService;

    public FactureController(FactureService factureService) {
        this.factureService = factureService;
    }

    @PostMapping
    public ResponseEntity<FactureResponseDTO> createFacture(@RequestBody FactureCreateDTO dto) {
        Facture facture = new Facture();
        facture.setDateFacture(dto.getDateFacture());
        facture.setDateEcheance(dto.getDateEcheance());
        facture.setMontantHT(BigDecimal.valueOf(dto.getMontantHT()));
        facture.setMontantTVA(BigDecimal.valueOf(dto.getMontantTVA()));
        facture.setMontantTTC(BigDecimal.valueOf(dto.getMontantTTC()));

        Client client = new Client();
        client.setId(dto.getClientId());
        facture.setClient(client);

        Commande commande = new Commande();
        commande.setId(dto.getCommandeId());
        facture.setCommande(commande);

        Facture saved = factureService.save(facture);
        FactureResponseDTO response = factureService.toResponseDTO(saved);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerFacture(@PathVariable Long id) {
        factureService.supprimerFacture(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public List<FactureResponseDTO> getAllFactures() {
        return factureService.getAllFactures();
    }
}
