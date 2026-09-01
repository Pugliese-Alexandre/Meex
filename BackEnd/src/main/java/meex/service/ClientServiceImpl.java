package meex.service;

import meex.model.Client;
import meex.dto.ClientDTO;
import meex.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.time.LocalDate;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @Override
    public Client getClientById(Long id) {
        return clientRepository.findById(id).orElse(null);
    }

    @Override
    public Client createClient(Client client) {
        String email = client.getEmail().trim();
        String motDePasse = client.getMotDePasse().trim();

        if (clientRepository.findByEmail(email) != null) {
            throw new RuntimeException("Cet email est déjà utilisé !");
        }

        client.setEmail(email);
        client.setMotDePasse(motDePasse);

        return clientRepository.save(client);
    }

    @Override
    public Client createClientFromDTO(ClientDTO clientDTO) {
        String email = clientDTO.getEmail().trim();

        if (clientRepository.findByEmail(email) != null) {
            throw new RuntimeException("Cet email est déjà utilisé !");
        }

        LocalDate date = clientDTO.getDateInscription();
        if (date == null) {
            date = LocalDate.now();
        }

        Client client = Client.builder()
                .nom(clientDTO.getNom().trim())
                .prenom(clientDTO.getPrenom().trim())
                .email(email)
                .telephone(clientDTO.getTelephone().trim())
                .adresse(clientDTO.getAdresse().trim())
                .numeroMaison(clientDTO.getNumeroMaison() != null ? clientDTO.getNumeroMaison().trim() : null)
                .codePostal(clientDTO.getCodePostal() != null ? clientDTO.getCodePostal().trim() : null)
                .motDePasse("123456")
                .dateAnniversaire(clientDTO.getDateAnniversaire())
                .dateInscription(date)
                .build();

        return clientRepository.save(client);
    }

    @Override
    public Client updateClient(Long id, Client client) {
        Client existing = clientRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setNom(client.getNom());
            existing.setEmail(client.getEmail());
            existing.setMotDePasse(client.getMotDePasse());
            existing.setDateAnniversaire(client.getDateAnniversaire());
            return clientRepository.save(existing);
        }
        return null;
    }

    @Override
    public Client updateClientFromDTO(Long id, ClientDTO clientDTO) {
        Client existing = clientRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setNom(clientDTO.getNom().trim());
            existing.setDateAnniversaire(clientDTO.getDateAnniversaire());
            existing.setEmail(clientDTO.getEmail().trim());
            // mot de passe non mis à jour ici volontairement
            return clientRepository.save(existing);
        }
        return null;
    }

    @Override
    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }
}
