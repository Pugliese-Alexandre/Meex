// Import de base Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import du service et modèle Fournisseur
import { FournisseurService, Fournisseur } from '../../../services/fournisseur.service';

// Import des modules PrimeNG nécessaires à l’interface
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// Composant personnalisé pour les boutons
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';

// Déclaration du composant avec ses métadonnées
@Component({
  selector: 'app-fournisseurs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    CustomButtonComponent
  ],
  providers: [MessageService],
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.scss']
})
export class FournisseursComponent implements OnInit {

  // Liste complète des fournisseurs
  fournisseurs: Fournisseur[] = [];

  // Fournisseur actuellement sélectionné (pour modification ou suppression)
  selectedFournisseur: Fournisseur | null = null;

  // Liste des lettres pour filtrer les fournisseurs par nom
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  selectedLetter: string | null = null;

  // Liste filtrée selon la lettre
  filteredFournisseur: Fournisseur[] = [];

  // Modèle utilisé pour ajouter un nouveau fournisseur
  newFournisseur: Fournisseur = {
    id: 0,
    nom: '',
    adresse: '',
    telephone: '',
    email: '',
    personneReference: '',
    marge: 0
  };

  // Variables pour gérer l’état des dialogues (modales)
  visibleAdd: boolean = false;
  visibleEdit: boolean = false;
  visibleDelete: boolean = false;

  constructor(
    private fournisseurService: FournisseurService,
    private messageService: MessageService
  ) {}

  // Chargement initial des fournisseurs
  ngOnInit(): void {
    this.loadFournisseurs();
  }

  // Réinitialise les filtres alphabétiques
  resetFilter(): void {
    this.selectedLetter = null;
    this.filteredFournisseur = [...this.fournisseurs];
  }

  // Charge tous les fournisseurs depuis le backend
  loadFournisseurs(): void {
    this.fournisseurService.getFournisseurs().subscribe({
      next: (data) => {
        this.fournisseurs = data;
        this.filteredFournisseur = data;
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les fournisseurs.' })
    });
  }

  // Filtrage des fournisseurs selon la première lettre du nom
  filterByLetter(letter: string): void {
    this.selectedLetter = letter;
    this.filteredFournisseur = this.fournisseurs.filter(c =>
      c.nom && c.nom.toUpperCase().startsWith(letter)
    );
  }

  // Envoie le formulaire pour ajouter un nouveau fournisseur
  ajouterFournisseur(): void {
    this.fournisseurService.addFournisseur(this.newFournisseur).subscribe({
      next: () => {
        this.visibleAdd = false;
        this.loadFournisseurs(); // recharge la liste
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Fournisseur ajouté' });
        this.resetNewFournisseur(); // reset le formulaire
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible d\'ajouter le fournisseur.' })
    });
  }

  // Ouvre le dialogue d’édition en clonant les données du fournisseur sélectionné
  ouvrirEdition(fournisseur: Fournisseur): void {
    this.selectedFournisseur = { ...fournisseur };
    this.visibleEdit = true;
  }

  // Enregistre les modifications d’un fournisseur
  modifierFournisseur(): void {
    if (this.selectedFournisseur && this.selectedFournisseur.id != null) {
      this.fournisseurService.updateFournisseur(this.selectedFournisseur.id, this.selectedFournisseur)
        .subscribe({
          next: () => {
            this.loadFournisseurs(); // recharge la liste
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Fournisseur modifié' });
            this.visibleEdit = false;
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour du fournisseur :', err);
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de modifier le fournisseur.' });
          }
        });
    }
  }

  // Ouvre la confirmation de suppression
  ouvrirSuppression(fournisseur: Fournisseur): void {
    this.selectedFournisseur = fournisseur;
    this.visibleDelete = true;
  }

  // Supprime un fournisseur
  supprimerFournisseur(): void {
    if (this.selectedFournisseur && this.selectedFournisseur.id != null) {
      this.fournisseurService.deleteFournisseur(this.selectedFournisseur.id)
        .subscribe({
          next: () => {
            this.loadFournisseurs(); // recharge après suppression
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Fournisseur supprimé' });
            this.visibleDelete = false;
          },
          error: (err) => {
            console.error('Erreur lors de la suppression du fournisseur :', err);
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de supprimer le fournisseur.' });
          }
        });
    }
  }

  // Réinitialise les champs du formulaire d’ajout
  resetNewFournisseur(): void {
    this.newFournisseur = {
      id: 0,
      nom: '',
      adresse: '',
      telephone: '',
      email: '',
      personneReference: '',
      marge: 0
    };
  }
}
