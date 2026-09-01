// Fournit le décorateur Injectable pour rendre ce service accessible dans l'application
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface représentant un fournisseur
export interface Fournisseur {
  id: number;
  nom: string;
  adresse?: string;             
  telephone?: string;          
  email?: string;               
  personneReference?: string; 
  marge?: number;
}

// Ce service est injectable partout dans l'application (providedIn: 'root')
@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  // URL de base de l'API backend
  private apiUrl = 'http://localhost:8080/api/fournisseurs'; 

  constructor(private http: HttpClient) {}

  /**
   * Récupère tous les fournisseurs (GET)
   * @returns Observable d'un tableau de Fournisseur
   */
  getFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.apiUrl);
  }

  /**
   * Ajoute un nouveau fournisseur (POST)
   * @param fournisseur L'objet fournisseur à créer
   * @returns Observable du fournisseur créé
   */
  addFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(this.apiUrl, fournisseur);
  }

  /**
   * Met à jour un fournisseur existant (PUT)
   * @param id L'identifiant du fournisseur à modifier
   * @param fournisseur Les données mises à jour
   * @returns Observable du fournisseur mis à jour
   */
  updateFournisseur(id: number, fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.put<Fournisseur>(`${this.apiUrl}/${id}`, fournisseur);
  }

  /**
   * Supprime un fournisseur (DELETE)
   * @param id L'identifiant du fournisseur à supprimer
   * @returns Observable vide
   */
  deleteFournisseur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Récupère les fournisseurs archivés (GET avec query param)
   * @returns Observable d'un tableau de fournisseurs archivés
   */
  getFournisseursArchives(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.apiUrl}?archive=true`);
  }
}
