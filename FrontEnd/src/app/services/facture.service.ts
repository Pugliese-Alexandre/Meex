// Import des décorateurs et modules nécessaires
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Import des modèles utilisés pour le typage
import { FactureResponse } from '../models/facture-response.model'; 
import { Facture } from '../models/facture.model'; 

// Service injectable dans toute l'application
@Injectable({ providedIn: 'root' })
export class FactureService {

  // URL de base pour les requêtes liées aux factures
  private apiUrl = '/api/factures'; 

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste des factures (GET)
   * @returns Observable contenant un tableau de réponses formatées (`FactureResponse[]`)
   */
  getFactures(): Observable<FactureResponse[]> {
    return this.http.get<FactureResponse[]>(`${this.apiUrl}`);
  }

  /**
   * Crée une nouvelle facture sans commande associée (POST)
   * @param f : Objet partiel de type `Facture`
   * @returns Observable avec la réponse formatée (`FactureResponse`)
   */
  createFacture(f: Partial<Facture>): Observable<FactureResponse> {
    return this.http.post<FactureResponse>(`${this.apiUrl}/factures`, f);
  }

  /**
   * Télécharge une facture PDF (GET)
   * @param id : Identifiant de la facture
   * @returns Observable contenant un `Blob` (fichier PDF)
   */
  downloadFacturePdf(id: number): Observable<Blob> {
    return this.http.get(`/api/invoices/${id}/download`, { responseType: 'blob' });
  }

  /**
   * Ouvre une facture PDF dans un nouvel onglet pour impression (GET)
   * @param id : Identifiant de la facture
   * @returns Observable contenant un `Blob` (fichier PDF)
   */
  printFacturePdf(id: number): Observable<Blob> {
    return this.http.get(`/api/invoices/${id}/print`, { responseType: 'blob' });
  }

  /**
   * Envoie une facture par e-mail (POST)
   * @param id : Identifiant de la facture
   * @returns Observable indiquant le succès ou l'échec
   */
  sendFactureByEmail(id: number): Observable<any> {
    return this.http.post(`/api/invoices/${id}/email`, {});
  }

  /**
   * Crée une facture directement à partir d'une commande (POST)
   * @param payload : Données de la commande (clientId, articles, etc.)
   * @returns Observable avec la réponse (type libre ici, à typer au besoin)
   */
  createFactureAvecCommande(payload: any): Observable<any> {
    return this.http.post<any>('/api/factures/avec-commande', payload);
  }
}
