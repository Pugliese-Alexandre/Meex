package meex.dto;

public class ArticleCommandeDTO {
    private Long articleId;
    private int quantite;

    public ArticleCommandeDTO() {
    }

    public ArticleCommandeDTO(Long articleId, int quantite) {
        this.articleId = articleId;
        this.quantite = quantite;
    }

    public Long getArticleId() {
        return articleId;
    }

    public void setArticleId(Long articleId) {
        this.articleId = articleId;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }
}
