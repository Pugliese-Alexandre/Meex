// Permet d'injecter ce service dans d'autres classes
import { Injectable } from '@angular/core';

// Permet d'effectuer des requêtes HTTP
import { HttpClient } from '@angular/common/http';

// Permet de gérer les flux de données asynchrones
import { Observable } from 'rxjs';

// Modèle représentant un client
import { Client } from '../models/client.model';

// Fournit ce service à l'ensemble de l'application (injection globale)
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  // URL de base pour les opérations sur les clients
  private url = '/api/clients';

  // Injection du service HttpClient
  constructor(private http: HttpClient) {}

  // Récupère la liste de tous les clients
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url);
  }

  // Ajoute un nouveau client
  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.url, client);
  }

  // Met à jour un client existant en fonction de son id
  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.url}/${client.id}`, client);
  }

  // Supprime un client en fonction de son id
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
