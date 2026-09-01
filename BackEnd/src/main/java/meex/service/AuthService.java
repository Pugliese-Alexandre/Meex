package meex.service;

import meex.model.Client;
import meex.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private ClientRepository clientRepository;

    public Client authenticate(String email, String motDePasse) {
        // On récupère le client par son email
        Client client = clientRepository.findByEmail(email);

        if (client == null) {
            return null; // Utilisateur non trouvé
        }

        // Si mot de passe stocké EN CLAIR :
        if (!client.getMotDePasse().equals(motDePasse)) {
            return null; // Mot de passe incorrect
        }

        // Si tout est bon, on retourne le client
        return client;
    }
}
