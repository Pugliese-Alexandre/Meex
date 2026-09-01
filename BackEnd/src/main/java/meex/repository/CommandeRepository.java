package meex.repository;

import meex.model.Commande;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommandeRepository extends JpaRepository<Commande, Long> {

        @EntityGraph(attributePaths = "articles")
    @Query("SELECT c FROM Commande c WHERE c.client.id = :clientId")
    List<Commande> findWithArticlesByClientId(@Param("clientId") Long clientId);
}
