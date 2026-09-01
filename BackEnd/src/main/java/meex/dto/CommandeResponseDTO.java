package meex.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommandeResponseDTO {
    private Long id;
    private LocalDate date;
    private String nomClient;
    private List<ArticleDTO> articles;
    private Double totalCommande;
    private String statut;
    private Long factureId;

}
