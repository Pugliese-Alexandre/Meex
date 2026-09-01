// IMPORTS ANGULAR
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';

// IMPORTS DE TES SERVICES
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client.model';

// IMPORTS PRIMENG
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { AvatarModule } from 'primeng/avatar';
import { EditorModule } from 'primeng/editor';

// IMPORT DE TON BOUTON PERSONNALISÉ
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';

// CONFIGURATION DU COMPOSANT
@Component({
  selector: 'app-gestion-clients',
  standalone: true,
  imports: [
    CommonModule,
    EditorModule,
    FormsModule,
    AvatarModule,
    CustomButtonComponent,
    TableModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    TagModule,
    InputTextModule,
    TextareaModule,
    CalendarModule
  ],
  providers: [MessageService],
  templateUrl: './gestion-clients.component.html',
  styleUrls: ['./gestion-clients.component.scss']
})
export class GestionClientsComponent implements OnInit {

  // Liste complète des clients
  clients: Client[] = [];

  // Client actuellement sélectionné (pour édition ou suppression)
  selectedClient: Client | null = null;

  // Liste des lettres de l'alphabet pour le filtre
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  selectedLetter: string | null = null;

  // Clients filtrés par lettre
  filteredClients: Client[] = [];

  // Nouveau client en cours de création
  newClient: Client = {
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    numeroMaison: '',
    codePostal: '',
    dateInscription: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    dateAnniversaire: null
  };

  // Visibilité des modales
  visibleAdd: boolean = false;
  visibleEdit: boolean = false;
  visibleDelete: boolean = false;
  visibleEmailDialog: boolean = false;

  // Champs pour l’envoi d’email
  selectedClientEmail: string = '';
  emailSubject: string = '';
  emailBody: string = '';

  constructor(
    private clientService: ClientService,
    private messageService: MessageService
  ) {}

  // Chargement initial des clients
  ngOnInit(): void {
    this.loadClients();
  }

  // Réinitialise le filtre alphabétique
  resetFilter(): void {
    this.selectedLetter = null;
    this.filteredClients = this.clients;
  }

  // Récupère les clients depuis l'API
  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.filteredClients = data;
      },
      error: () => this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de charger les clients.'
      })
    });
  }

  // Filtre les clients selon la lettre choisie
  filterByLetter(letter: string): void {
    this.selectedLetter = letter;
    this.filteredClients = this.clients.filter(c =>
      c.nom && c.nom.toUpperCase().startsWith(letter)
    );
  }

  // Ajoute un nouveau client via l’API
  ajouterClient(): void {
    if (this.newClient.dateAnniversaire) {
      this.newClient.dateAnniversaire = formatDate(
        this.newClient.dateAnniversaire,
        'yyyy-MM-dd',
        'en-US'
      );
    }

    this.clientService.addClient(this.newClient).subscribe({
      next: (clientAjoute) => {
        this.clients = [...this.clients, clientAjoute];
        this.visibleAdd = false;
        this.loadClients();
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Client ajouté.'
        });

        // Réinitialisation du formulaire
        this.newClient = {
          prenom: '',
          nom: '',
          email: '',
          telephone: '',
          adresse: '',
          numeroMaison: '',
          codePostal: '',
          dateAnniversaire: null,
          dateInscription: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
        };
      },
      error: () => this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible d\'ajouter le client.'
      })
    });
  }

  // Met à jour les informations du client sélectionné
  modifierClient(): void {
    if (this.selectedClient?.dateAnniversaire) {
      this.selectedClient.dateAnniversaire = formatDate(
        this.selectedClient.dateAnniversaire,
        'yyyy-MM-dd',
        'en-US'
      );
    }

    if (this.selectedClient) {
      this.clientService.updateClient(this.selectedClient).subscribe({
        next: () => {
          this.visibleEdit = false;
          this.loadClients();
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Client modifié.'
          });
        },
        error: () => this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de modifier le client.'
        })
      });
    }
  }

  // Supprime le client sélectionné
  supprimerClient(): void {
    if (this.selectedClient?.id) {
      this.clientService.deleteClient(this.selectedClient.id).subscribe({
        next: () => {
          this.visibleDelete = false;
          this.loadClients();
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Client supprimé.'
          });
        },
        error: () => this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de supprimer le client.'
        })
      });
    }
  }

  // Ouvre la fenêtre d'édition pour le client donné
  ouvrirEdition(client: Client): void {
    this.selectedClient = { ...client };
    this.visibleEdit = true;
  }

  // Ouvre la fenêtre de confirmation de suppression
  ouvrirSuppression(client: Client): void {
    this.selectedClient = client;
    this.visibleDelete = true;
  }

  // Prépare la fenêtre d'envoi d'email au client sélectionné
  ouvrirEmail(client: Client): void {
    this.selectedClientEmail = client.email;
    this.emailSubject = '';
    this.emailBody = '';
    this.visibleEmailDialog = true;
  }

  // Génère un lien mailto pour ouvrir le client email
  envoyerEmail(): void {
    const subject = encodeURIComponent(this.emailSubject);
    const body = encodeURIComponent(this.emailBody);
    const mailtoLink = `mailto:${this.selectedClientEmail}?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');

    this.visibleEmailDialog = false;
  }

}
