package meex.controller;

import meex.model.Client;
import meex.dto.ClientDTO;
import meex.service.ClientService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "http://localhost:4200")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping
    public List<ClientDTO> getAllClients() {
        return clientService.getAllClients()
                .stream()
                .map(client -> ClientDTO.builder()
                        .id(client.getId())
                        .prenom(client.getPrenom())
                        .nom(client.getNom())
                        .email(client.getEmail())
                        .telephone(client.getTelephone())
                        .adresse(client.getAdresse())
                        .dateInscription(client.getDateInscription())
                        .numeroMaison(client.getNumeroMaison())
                        .dateAnniversaire(client.getDateAnniversaire())
                        .codePostal(client.getCodePostal())
                        .build())
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Client getClientById(@PathVariable Long id) {
        return clientService.getClientById(id);
    }

    @PostMapping
    public Client createClient(@RequestBody ClientDTO clientDTO) {
        return clientService.createClientFromDTO(clientDTO);
    }

    @PutMapping("/{id}")
    public Client updateClient(@PathVariable Long id, @RequestBody ClientDTO clientDTO) {
        return clientService.updateClientFromDTO(id, clientDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
    }
}
