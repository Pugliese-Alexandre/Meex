import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from './../../../services/article.service'
import { Article } from './../../../models/article.model';
import { FournisseurService } from './../../../services/fournisseur.service';
import { Fournisseur } from './../../../models/fournisseur.model';
// Ajoute les services pour Commande et Facture si besoin

import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule, TableModule, TabViewModule, CardModule],
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent {
  private articleService = inject(ArticleService);
  private fournisseurService = inject(FournisseurService);
  // injecte CommandeService et FactureService si tu les as

  articlesArchives: Article[] = [];
  fournisseursArchives: Fournisseur[] = [];
  commandesArchives: any[] = []; // à typer selon ton modèle
  facturesArchives: any[] = [];

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(data => this.articlesArchives = data);
    this.articleService.getArticles().subscribe((data: Article[]) => {
      this.articlesArchives = data;
    });
        
    
    // idem pour commandes et factures
  }
}
