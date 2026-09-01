import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommandeService } from '../../../services/commande.service';
import { Commande } from '../../../models/commande.model';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog'; 


import { ClientService } from '../../../services/client.service';
import { ArticleService } from '../../../services/article.service';

// CUSTOM COMPONENTS
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss'],
  standalone: true,
  imports: [CommonModule,CustomButtonComponent, TableModule, DialogModule, ButtonModule, FormsModule, InputTextModule, DropdownModule, TagModule],
})
export class CommandeComponent implements OnInit {
  commandes: Commande[] = [];

  searchTerm: string = '';
  selectedStatut: string = '';
statuts = [
  { label: 'En attente', value: 'EN_ATTENTE' },
  { label: 'En cours', value: 'EN_COURS' },
  { label: 'Validée', value: 'VALIDÉE' }
];

  constructor(
  private commandeService: CommandeService,
  private clientService: ClientService,
  private articleService: ArticleService
  ) {}

 get filteredCommandes(): Commande[] {
  return this.commandes.filter(cmd => {
    const matchesStatut = this.selectedStatut ? cmd.statut === this.selectedStatut : true;
    const lowerSearch = this.searchTerm.toLowerCase();

    const matchesSearch =
      cmd.nomClient?.toLowerCase().includes(lowerSearch) || 
      cmd.id?.toString().includes(lowerSearch);             

    return matchesStatut && matchesSearch;
  });
}

ngOnInit(): void {
  this.loadCommandes();
  this.loadClients();   
  this.loadArticles();  
}

loadCommandes(): void {
  this.commandeService.getCommandes().subscribe({
    next: data => this.commandes = data,
    error: err => console.error('Erreur chargement commandes :', err)
  });
}

loadClients(): void {
  this.clientService.getClients().subscribe({
    next: data => {
      // Ajoute un champ 'nomComplet' pour l'affichage dans le dropdown
      this.clients = data.map(client => ({
        ...client,
        nomComplet: `${client.prenom} ${client.nom}`
      }));
    },
    error: err => console.error('Erreur chargement clients', err)
  });
}

loadArticles(): void {
  this.articleService.getArticles().subscribe({
    next: data => {
      this.articles = data.map(art => ({
        ...art,
        nom: `${art.reference} - ${art.description}`
      }));
    },
    error: err => console.error('Erreur chargement articles', err)
  });
}

  genererFacture(cmd: Commande): void {
    this.commandeService.createFacture(cmd.id).subscribe({
      next: factureId => {
        cmd.factureId = factureId;  
        this.voirFacture(cmd);
      },
      error: err => {
        console.error('Erreur génération facture :', err);
      }
    });
  }

  voirFacture(cmd: Commande): void {
this.commandeService.downloadFacturePdf(cmd.factureId!).subscribe({
      next: blob => {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      },
      error: err => {
        console.error('Erreur ouverture facture :', err);
      }
    });
  }

  getSeverity(statut: string): 'info' | 'warn' | 'success' {
    switch (statut) {
      case 'EN_ATTENTE':
        return 'warn';
      case 'EN_COURS':
        return 'info';
      case 'VALIDÉE':
        return 'success';
      default:
        return 'info';
    }
  }

  visibleAdd: boolean = false;

nouvelleCommande: {
  clientId: number | null;
  date: string;
  articles: { articleId: number | null; quantite: number }[];
} = {
  clientId: null,
date: new Date().toISOString().substring(0, 10), // 'YYYY-MM-DD'
  articles: []
};


clients: any[] = []; 
articles: any[] = [];

ajouterArticle(): void {
  this.nouvelleCommande.articles.push({ articleId: null, quantite: 1 });
}

creerCommande(): void {
  if (this.nouvelleCommande.clientId === null) {
    console.error('Client non sélectionné');
    return;
  }

  const articlesValides = this.nouvelleCommande.articles.filter(
    art => art.articleId !== null
  ) as { articleId: number; quantite: number }[];

  if (articlesValides.length === 0) {
    console.error('Aucun article valide sélectionné');
    return;
  }

  const dto = {
    clientId: this.nouvelleCommande.clientId!,
    date: this.nouvelleCommande.date || new Date().toISOString().substring(0, 10),
    articles: articlesValides
  };

  this.commandeService.createCommande(dto).subscribe({
    next: () => {
      this.loadCommandes();
      this.visibleAdd = false;
      this.nouvelleCommande = {
        clientId: null,
        date: new Date().toISOString().substring(0, 10),
        articles: []
      };
    },
    error: err => console.error('Erreur création commande', err)
  });
}

get totalCommandes(): number {
  return this.filteredCommandes?.reduce((acc, c) => acc + (c.totalCommande || 0), 0) ?? 0;
}

visibleEdit: boolean = false;
commandeEnCours!: Commande;

editerCommande(cmd: Commande): void {
    this.commandeEnCours = { ...cmd }; 
  this.visibleEdit = true;
  console.log('Édition de la commande :', cmd);
  // TODO : afficher une modale avec les infos de la commande
}

archiverCommande(cmd: Commande): void {
  console.log('Archivage de la commande :', cmd);
  // TODO : appel au backend pour archiver
}

sauvegarderCommande(): void {
  console.log('Commande à sauvegarder :', this.commandeEnCours);

  // Appel au backend pour mettre à jour la commande
  this.commandeService.updateCommande(this.commandeEnCours).subscribe({
    next: () => {
      this.loadCommandes();       // recharge les données
      this.visibleEdit = false;   // ferme la modale
    },
    error: err => console.error('Erreur mise à jour commande', err)
  });
}

  formatStatut(statut: string): string {
    switch (statut) {
      case 'EN_ATTENTE':
        return 'En attente';
      case 'EN_COURS':
        return 'En cours';
      case 'VALIDÉE':
        return 'Validée';
      default:
        return statut;
    }
  }
}


