import { Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CatalogueProduitsComponent } from './components/catalogue-produits/catalogue-produits.component';
import { GestionClientsComponent } from './components/gestion-clients/gestion-clients.component';
import { FacturationComponent } from './components/facturation/facturation.component';
import { FournisseursComponent } from './components/fournisseurs/fournisseurs.component';
import { ArchiveComponent } from './components/archive/archive.component';

export default [
    { path: '**', redirectTo: '/notfound' },
    { path: 'Accueil', component: AccueilComponent },
    { path: 'Connection', component: ConnectionComponent },
    { path: 'Inscription', component: InscriptionComponent },
    { path: 'Dashboard', component: DashboardComponent },
    { path: 'Gestion des clients', component: GestionClientsComponent },
    { path: 'Catalogue de produits', component: CatalogueProduitsComponent },
    { path: 'Facturation', component: FacturationComponent },
    { path: 'Commandes', loadComponent: () => import('./components/commande/commande.component').then(m => m.CommandeComponent)},
    { path: 'Gestion Fournisseur', component: FournisseursComponent },
    { path: 'Archive', component: ArchiveComponent },
] as Routes;
