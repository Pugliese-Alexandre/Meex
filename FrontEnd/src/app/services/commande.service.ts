// Permet l'injection du service
import { Injectable } from '@angular/core';

// Permet d'effectuer des requêtes HTTP
import { HttpClient } from '@angular/common/http';

// Permet de gérer les flux asynchrones
import { Observable } from 'rxjs';

// Modèle représentant une commande
import { Commande } from '../models/commande.model';

// Fournit le service à toute l'application
@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  // URL de base pour toutes les opérations liées aux commandes
  private apiUrl = 'http://localhost:8080/api/commandes';

  constructor(private http: HttpClient) {}

  /**
   * Crée une nouvelle commande.
   * @param dto Données nécessaires à la création : id client, date, liste d’articles.
   */
  createCommande(dto: {
    clientId: number;
    date: string; // au format ISO, ex. '2025-05-20'
    articles: { articleId: number; quantite: number }[];
  }): Observable<any> {
    return this.http.post<any>(this.apiUrl, dto);
  }

  /**
   * Récupère toutes les commandes enregistrées.
   */
  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.apiUrl);
  }

  /**
   * Crée une facture à partir d’une commande existante.
   * @param commandeId ID de la commande concernée
   */
  createFacture(commandeId: number): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/${commandeId}/facture`, {});
  }

  /**
   * Supprime une commande.
   * @param id ID de la commande à supprimer
   */
  deleteCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Met à jour les informations d’une commande existante.
   * @param commande L'objet commande complet avec l'ID
   */
  updateCommande(commande: Commande): Observable<any> {
    return this.http.put(`${this.apiUrl}/${commande.id}`, commande); 
  }

  /**
   * Télécharge le PDF d’une facture.
   * @param factureId ID de la facture à télécharger
   */
  downloadFacturePdf(factureId: number): Observable<Blob> {
    return this.http.get(`http://localhost:8080/api/factures/${factureId}/pdf`, {
      responseType: 'blob'
    });
  }
}
