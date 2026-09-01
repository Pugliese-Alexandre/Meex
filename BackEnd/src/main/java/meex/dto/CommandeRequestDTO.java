package meex.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class CommandeRequestDTO {
    private Long clientId;
    private LocalDate date;
    private List<ArticleCommandeDTO> articles; // articleId + quantite
}
