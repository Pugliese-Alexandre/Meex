import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { AccueilComponent } from './app/pages/components/accueil/accueil.component';
import { ConnectionComponent } from './app/pages/components/connection/connection.component'; 
import { InscriptionComponent } from './app/pages/components/inscription/inscription.component'; 
import { DashboardComponent } from './app/pages/components/dashboard/dashboard.component'
import { GestionClientsComponent } from './app/pages/components/gestion-clients/gestion-clients.component';
import { CatalogueProduitsComponent } from './app/pages/components/catalogue-produits/catalogue-produits.component';
import { FacturationComponent } from './app/pages/components/facturation/facturation.component';
import { CommandeComponent } from './app/pages/components/commande/commande.component';
import { FournisseursComponent } from './app/pages/components/fournisseurs/fournisseurs.component'; 
import { ArchiveComponent } from './app/pages/components/archive/archive.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: 'accueil', component: AccueilComponent },
      { path: 'connection', component: ConnectionComponent },
      { path: 'inscription', component: InscriptionComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'clients', component: GestionClientsComponent },
      { path: 'catalogue', component: CatalogueProduitsComponent },
      { path: 'fournisseurs', component: FournisseursComponent },
      { path: 'facturation', loadComponent: () => import('./app/pages/components/facturation/facturation.component').then(m => m.FacturationComponent)},
      { path: 'commandes', loadComponent: () => import('./app/pages/components/commande/commande.component').then(m => m.CommandeComponent) },
      { path: 'Archive', component: ArchiveComponent },
      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
    ]
  }
];
