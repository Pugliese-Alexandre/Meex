// Décorateur Angular pour marquer le service comme injectable
import { Injectable } from '@angular/core';

// Import des outils HTTP d'Angular
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Import de l'utilitaire pour les flux asynchrones
import { Observable } from 'rxjs';

// Modèle TypeScript représentant un article
import { Article } from '../models/article.model';

// Fournit le service à l’ensemble de l’application (injection racine)
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // URL de base de l’API pour les articles
  private apiUrl = 'http://localhost:8080/api/articles';

  // Injection du service HttpClient pour effectuer des requêtes HTTP
  constructor(private http: HttpClient) {}

  // Récupère la liste des articles (GET /api/articles)
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  // Envoie un nouvel article au backend (POST /api/articles)
  ajouterArticle(article: any): Observable<any> {
    // Configuration des en-têtes HTTP avec authentification Basic
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('root:root')
    });

    // btoa() encode le couple "username:password" en base64
    // Ici utilisé pour une authentification Basic avec root:root

    return this.http.post<any>(this.apiUrl, article, { headers });
  }
}
