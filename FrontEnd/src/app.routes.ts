import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { AccueilComponent } from './app/pages/components/accueil/accueil.component';
import { DashboardComponent } from './app/pages/components/dashboard/dashboard.component';
import { GestionClientsComponent } from './app/pages/components/gestion-clients/gestion-clients.component';
import { CatalogueProduitsComponent } from './app/pages/components/catalogue-produits/catalogue-produits.component';
import { FournisseursComponent } from './app/pages/components/fournisseurs/fournisseurs.component';
import { ArchiveComponent } from './app/pages/components/archive/archive.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: 'accueil', component: AccueilComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'clients', component: GestionClientsComponent },
      { path: 'catalogue', component: CatalogueProduitsComponent },
      { path: 'fournisseurs', component: FournisseursComponent },

      {
        path: 'facturation',
        loadComponent: () =>
          import('./app/pages/components/facturation/facturation.component')
            .then(m => m.FacturationComponent)
      },

      {
        path: 'commandes',
        loadComponent: () =>
          import('./app/pages/components/commande/commande.component')
            .then(m => m.CommandeComponent)
      },

      { path: 'Archive', component: ArchiveComponent },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
