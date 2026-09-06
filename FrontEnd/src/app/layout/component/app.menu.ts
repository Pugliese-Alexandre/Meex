import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitem, RouterModule],
  template: `
    <ul class="layout-menu">
      <ng-container *ngFor="let item of model; let i = index">
        <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
        <li *ngIf="item.separator" class="menu-separator"></li>
      </ng-container>
    </ul> `
})
export class AppMenu implements OnInit {
  model: MenuItem[] = [];
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

ngOnInit() {
  this.setupMenu();
}

setupMenu() {
  this.model = [
{
  label: 'Meex',
  items: [
    { label: 'Accueil', icon: 'pi pi-fw pi-home', routerLink: ['/accueil'] }
  ]
},

    {
      label: 'Meex Admin',
      items: [
        { label: 'Dashboard', icon: 'pi pi-fw pi-crown', routerLink: ['/dashboard'] },
        { label: 'Catalogue Produits', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/catalogue'] },
        { label: 'Gestion Clients', icon: 'pi pi-fw pi-trophy', routerLink: ['/clients'] },
        { label: 'Facturation', icon: 'pi pi-fw pi-euro', routerLink: ['/facturation'] },
        { label: 'Commandes', icon: 'pi pi-fw pi-send', routerLink: ['/commandes'] },
        { label: 'Fournisseurs', icon: 'pi pi-fw pi-car', routerLink: ['/fournisseurs'] }
      ]
    },

    {
      label: 'Meex Archive',
      items: [
        { label: 'Archive', icon: 'pi pi-fw pi-lock', routerLink: ['/Archive'] }
      ]
    }
  ];
}

  logout(): void {
    this.authService.logout();
  }
}
