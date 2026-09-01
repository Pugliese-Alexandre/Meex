// Permet d'injecter ce service dans toute l'application
import { Injectable } from '@angular/core';

// Permet de faire des requêtes HTTP
import { HttpClient } from '@angular/common/http';

// Permet de travailler avec des flux de données asynchrones
import { Observable } from 'rxjs';

// Fourniture du service à l'ensemble de l'application
@Injectable({ providedIn: 'root' })
export class DashboardService {
  // URL de base pour les endpoints du tableau de bord
  private baseUrl = '/api/dashboard';

  constructor(private http: HttpClient) {}

  /**
   * Récupère les bénéfices mensuels pour une année donnée
   * @param year Année ciblée
   */
  getMonthlyProfits(year: number): Observable<any> {
    return this.http.get(`/api/dashboard/profits?year=${year}`);
  }

  /**
   * Récupère les données de ventes pour une année donnée
   * @param year Année ciblée
   */
  getSalesData(year: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/sales?year=${year}`);
  }

  /**
   * Récupère la répartition des statuts de factures pour une année donnée
   * @param year Année ciblée
   */
  getInvoiceStatus(year: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoices/status?year=${year}`);
  }
}
