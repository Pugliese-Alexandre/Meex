package meex.controller;

import meex.model.Client;
import meex.repository.ClientRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final ClientRepository clientRepository;

    public AuthController(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        Map<String, String> response = new HashMap<>();

        try {
            System.out.println("🔵 Authorization Header reçu : " + authHeader);

            // Vérifie si l'en-tête Authorization est présent
            if (authHeader == null || !authHeader.startsWith("Basic")) {
                response.put("error", "Authorization header manquant ou invalide");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            // Décode les identifiants (Base64)
            String base64Credentials = authHeader.substring("Basic ".length());
            String credentials = new String(Base64.getDecoder().decode(base64Credentials));
            String[] values = credentials.split(":", 2);

            if (values.length != 2) {
                response.put("error", "Format des identifiants incorrect");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            String email = values[0].trim();
            String motDePasse = values[1].trim();

            System.out.println("Email reçu : " + email);
            System.out.println("Mot de passe reçu : " + motDePasse);

            // Recherche du client en base de données
            Client client = clientRepository.findByEmail(email);
            if (client == null) {
                System.err.println("❌ Utilisateur non trouvé !");
                response.put("error", "Utilisateur non trouvé");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            // Vérification du mot de passe
            if (!client.getMotDePasse().equals(motDePasse)) {
                System.err.println("❌ Mot de passe incorrect !");
                response.put("error", "Mot de passe incorrect");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            System.out.println("✅ Connexion réussie pour : " + email);
            response.put("message", "Connexion réussie !");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", "Erreur interne du serveur : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
