package meex.service;

import jakarta.persistence.EntityNotFoundException;
import meex.dto.FournisseurDTO;
import meex.model.Fournisseur;
import meex.repository.FournisseurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FournisseurService {

    @Autowired
    private FournisseurRepository fournisseurRepository;

    // GET : récupérer tous les fournisseurs
    public List<Fournisseur> getAllFournisseurs() {
        return fournisseurRepository.findAll();
    }

    // GET : récupérer un fournisseur par ID
    public Optional<Fournisseur> getFournisseurById(Long id) {
        return fournisseurRepository.findById(id);
    }

    // POST : créer un fournisseur
    public Fournisseur createFournisseur(Fournisseur fournisseur) {
        return fournisseurRepository.save(fournisseur);
    }

    // ✅ PUT : mise à jour propre avec DTO !
    public Fournisseur updateFournisseur(Long id, FournisseurDTO fournisseurDTO) {
        Optional<Fournisseur> optionalFournisseur = fournisseurRepository.findById(id);
        if (optionalFournisseur.isEmpty()) {
            throw new EntityNotFoundException("Fournisseur non trouvé avec l'id " + id);
        }

        Fournisseur fournisseur = optionalFournisseur.get();
        fournisseur.setNom(fournisseurDTO.getNom());
        fournisseur.setAdresse(fournisseurDTO.getAdresse());
        fournisseur.setTelephone(fournisseurDTO.getTelephone());
        fournisseur.setEmail(fournisseurDTO.getEmail());
        fournisseur.setPersonneReference(fournisseurDTO.getPersonneReference());
        fournisseur.setMarge(fournisseurDTO.getMarge());

        return fournisseurRepository.save(fournisseur);
    }

    // DELETE : supprimer un fournisseur
    public void deleteFournisseur(Long id) {
        if (!fournisseurRepository.existsById(id)) {
            throw new EntityNotFoundException("Fournisseur non trouvé avec l'id " + id);
        }
        fournisseurRepository.deleteById(id);
    }
}
