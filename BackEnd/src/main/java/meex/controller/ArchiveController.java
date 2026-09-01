//package meex.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import meex.service.ArticleService;
//
//@RestController
//@RequestMapping("/api/archive")
//public class ArchiveController {
//
//    @Autowired
//    private ArticleService articleService;
//
//    @PutMapping("/articles/{id}/archiver")
//    public ResponseEntity<?> archiver(@PathVariable Long id) {
//        articleService.archiverArticle(id);
//        return ResponseEntity.ok().build();
//    }
//}
