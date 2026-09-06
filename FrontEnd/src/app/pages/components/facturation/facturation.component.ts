// Import des modules Angular nécessaires
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import des modules PrimeNG pour la table, les boutons, les dialogues, etc.
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';

// Permet de sauvegarder un fichier côté client
import { saveAs } from 'file-saver';

// Bouton personnalisé
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';

// Modèles de données
import { FactureResponse } from '../../../models/facture-response.model';
import { Facture } from '../../../models/facture.model';

// Service de gestion des factures
import { FactureService } from '../../../services/facture.service';
import { Observable } from 'rxjs';

// Déclaration du composant avec les modules importés
@Component({
  selector: 'app-facturation',
  templateUrl: './facturation.component.html',
  styleUrls: ['./facturation.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CustomButtonComponent,
    DialogModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    TagModule
  ]
})
export class FacturationComponent implements OnInit {
  // Liste de toutes les factures
  factures: FactureResponse[] = [];

  // Modèle pour la création d’une nouvelle facture
  newFacture: Partial<Facture> = {};

  // Champs pour les filtres
  searchTerm = '';
  selectedStatut = '';

  // Contrôle de la modale
  visibleAdd: boolean = false;

  // Statuts disponibles pour le filtre
  statuts: string[] = ['EN_ATTENTE', 'PAYÉE', 'EN_RETARD'];

  // Liste des références produits (champ texte séparé par virgules)
  refsCsv = '';

  constructor(private factureService: FactureService) {}

  ngOnInit(): void {
    this.loadFactures();
  }

  // Récupère toutes les factures depuis le backend
  private loadFactures(): void {
    this.factureService.getFactures().subscribe({
      next: data => {
        console.log('🔍 Données reçues :', data);
        this.factures = data;
      },
      error: err => console.error('Erreur chargement factures :', err)
    });
  }

  // Renvoie les factures filtrées selon la recherche et le statut
  get filteredFactures(): FactureResponse[] {
    return this.factures.filter(f => {
      const s = this.searchTerm.toLowerCase();

      const matchesSearch =
        f.nomClient.toLowerCase().includes(s) ||
        f.prenomClient.toLowerCase().includes(s) ||
        f.referencesProduits.some(r => r.toLowerCase().includes(s));

      const matchesStatut = this.selectedStatut
        ? f.statutCommande === this.selectedStatut
        : true;

      return matchesSearch && matchesStatut;
    });
  }

  // Télécharge le PDF d'une facture
  onDownloadPdf(id: number) {
    this.factureService.downloadFacturePdf(id).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `facture-${id}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err: any) => {
        console.error('Erreur téléchargement PDF', err);
        alert(`Erreur lors du téléchargement de la facture ID ${id}.`);
      }
    });
  }

  // Ouvre le PDF dans un nouvel onglet pour impression
  onPrintPdf(id: number) {
    this.factureService.printFacturePdf(id).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      },
      error: (err: any) => console.error('Erreur impression PDF', err)
    });
  }

  // Envoie une facture par email
  onSendPdf(id: number) {
    this.factureService.sendFactureByEmail(id).subscribe({
      next: () => alert('Email envoyé avec succès !'),
      error: (err: any) => console.error('Erreur envoi email', err)
    });
  }

  // Crée une nouvelle facture à partir du formulaire
  onCreate(formValue: any): void {
    const f: Partial<Facture> = {
      ...this.newFacture,
      references: this.refsCsv
        .split(',')
        .map(r => r.trim())
        .filter(r => r.length > 0)
    };

    this.factureService.createFacture(f).subscribe({
      next: created => {
        this.factures.unshift(created);  // Ajoute la nouvelle facture en haut
        this.newFacture = {};            // Réinitialise le formulaire
        this.refsCsv = '';
      },
      error: (err: any) => console.error('Erreur création facture', err)
    });
  }

  // Renvoie la couleur du badge en fonction du statut
  getSeverity(statut: string): 'success' | 'warn' | 'danger' {
    switch (statut) {
      case 'PAYÉE':      return 'success';
      case 'EN_ATTENTE': return 'warn';
      case 'EN_RETARD':  return 'danger';
      default:           return 'warn';
    }
  }

  // Formate le statut pour affichage lisible
  formatStatut(statut: string): string {
    switch (statut) {
      case 'PAYÉE':      return 'Payée';
      case 'EN_ATTENTE': return 'En attente';
      case 'EN_RETARD':  return 'En retard';
      default:           return statut;
    }
  }
}
