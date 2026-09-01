// Import des modules nécessaires pour les appels HTTP et la gestion d'état
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

// Fournit le service à l'échelle de l'application
@Injectable({ providedIn: 'root' })
export class AuthService {
  // URL de l'API pour la connexion
  private apiUrl = 'http://localhost:8080/api/auth/login';

  // Stocke l'état de connexion de l'utilisateur dans un BehaviorSubject
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  // Observable pour suivre l'état de connexion dans les composants
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  // Méthode pour l'inscription d'un utilisateur
  register(data: { nom: string; email: string; motDePasse: string }): Observable<any> {
    return this.http.post('http://localhost:8080/api/clients', data);
  }

  // Méthode de connexion via Basic Auth avec email et mot de passe
  login(email: string, motDePasse: string): Observable<any> {
    const authHeader = 'Basic ' + btoa(`${email.trim()}:${motDePasse.trim()}`);
    const headers = new HttpHeaders().set('Authorization', authHeader);

    console.log('Authorization header envoyé :', authHeader);

    // Requête POST sans corps, uniquement avec le header d'authentification
    return this.http.post(this.apiUrl, null, { headers });
  }

  // Stocke les informations de session dans le localStorage
  setLogin(token: string, email: string, id: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('userId', id);

    // Met à jour l'état de connexion
    this.loggedIn.next(true);
  }

  // Supprime les données de session lors de la déconnexion
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    this.loggedIn.next(false);
  }

  // Vérifie si un token est présent en localStorage
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Renvoie la valeur actuelle de l'état de connexion
  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  // Retourne l'adresse email de l'utilisateur connecté
  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  // Retourne l'ID de l'utilisateur connecté
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
