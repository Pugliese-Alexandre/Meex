package meex.service;

import meex.model.CategorieFournisseur;
import meex.repository.CategorieFournisseurRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategorieFournisseurService {

    private final CategorieFournisseurRepository repository;

    public CategorieFournisseurService(CategorieFournisseurRepository repository) {
        this.repository = repository;
    }

    public List<CategorieFournisseur> getAllCategories() {
        return repository.findAll();
    }

    public Optional<CategorieFournisseur> getById(Long id) {
        return repository.findById(id);
    }

    public CategorieFournisseur create(CategorieFournisseur categorie) {
        return repository.save(categorie);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public CategorieFournisseur update(Long id, CategorieFournisseur updated) {
        updated.setId(id);
        return repository.save(updated);
    }
}
