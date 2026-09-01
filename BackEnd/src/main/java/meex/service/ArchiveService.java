//package meex.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import meex.model.Article;
//import meex.repository.ArticleRepository;
//import meex.exception.ResourceNotFoundException;
//
//@Service
//public class ArchiveService {
//
//    @Autowired
//    private ArticleRepository articleRepository;
//
//    public void archiverArticle(Long id) {
//        Article article = articleRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Article non trouvé"));
//        article.setArchive(true);
//        articleRepository.save(article);
//    }
//}
