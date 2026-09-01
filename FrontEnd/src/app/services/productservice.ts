import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//  Interface pour représenter un produit
export interface Product {
  id?: number; // optionnel pour la création
  reference: string;
  description: string;
  prixAchat?: number;
  prixVente: number;
  stock: number;
  vendu?: number;
  fournisseur?: { id: number }; // lien vers le fournisseur
  typeProduit?: string;
  inventoryStatus?: 'Disponible' | 'Quantité faible' | 'Indisponible'; // calculé côté front
}

// Interface réutilisable si besoin dans les formulaires liés au fournisseur
export interface Fournisseur {
  id: number;
  nom: string;
  adresse?: string; 
  telephone?: string;
  email?: string;
  personneReference?: string;
  marge?: number;
}

// Fournit le service à toute l'application (singleton global)
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // URL de base du backend pour les produits/articles
  private apiUrl = 'http://localhost:8080/api/articles'; 

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste des produits
   * @returns Observable d’un tableau de produits
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  /**
   * Ajoute un nouveau produit
   * @param product Données du produit à créer
   */
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  /**
   * Modifie un produit existant
   * @param product Données mises à jour (nécessite un ID)
   */
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }  

  /**
   * Supprime un produit par son ID
   * @param productId ID du produit à supprimer
   */
  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }
}
