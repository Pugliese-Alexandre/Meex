// Import de base Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import des modules PrimeNG nécessaires pour les graphiques et dropdown
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';

// HTTP et observable
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Service métier contenant les appels API du dashboard
import { DashboardService } from '../../../services/dashboard.service';

// Composants internes du dashboard (graphique en camembert et en barres horizontales)
import { AchatPieComponent } from '../achat-pie/achat-pie.component';
import { RepartitionVentesComponent } from '../repartition-ventes/repartition-ventes/repartition-ventes.component';

// Déclaration du composant
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ChartModule,
    DropdownModule,
    AchatPieComponent,
    RepartitionVentesComponent
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  // Données pour les graphiques
  invoiceData: any;      // Statuts de factures (pie)
  salesData: any;        // Données de ventes (pie)
  profitsData: any;      // Données de bénéfices (bar)
  profitsOptions: any;   // Options du graphique des bénéfices

  // Année sélectionnée par défaut : année actuelle
  selectedYear: number = new Date().getFullYear();

  // Liste déroulante des années disponibles
  years: { label: string; value: number }[] = [];

  constructor(private dashboardService: DashboardService) {}

  // Initialisation du composant
  ngOnInit() {
    this.generateYears();                  // Remplit le menu déroulant avec 4 années
    this.loadAllData(this.selectedYear);  // Charge toutes les données pour l'année actuelle
  }

  // Charge toutes les données (profits, ventes, factures) pour une année donnée
  loadAllData(year: number) {
    this.loadProfits(year);
    this.loadSales(year);
    this.loadInvoiceStatus(year);
  }

  // Génère la liste d'années dynamiquement autour de l'année actuelle
  generateYears() {
    const current = new Date().getFullYear();
    this.years = [
      { label: `${current - 2}`, value: current - 2 },
      { label: `${current - 1}`, value: current - 1 },
      { label: `${current}`, value: current },
      { label: `${current + 1}`, value: current + 1 }
    ];
  }

  // Récupère et formate les données de statuts de factures pour un graphique circulaire
  loadInvoiceStatus(year: number) {
    this.dashboardService.getInvoiceStatus(year).subscribe((res) => {
      this.invoiceData = {
        labels: res.labels,
        datasets: [{
          data: res.values,
          backgroundColor: ['#66BB6A', '#FFCA28', '#EF5350'],
          hoverBackgroundColor: ['#81C784', '#FFD54F', '#E57373']
        }]
      };
    });
  }

  // Récupère et structure les données de ventes pour un graphique circulaire
  loadSales(year: number) {
    this.dashboardService.getSalesData(year).subscribe((res) => {
      this.salesData = {
        labels: res.labels,
        datasets: [{
          data: res.values,
          backgroundColor: ['#42A5F5', '#FFA726', '#66BB6A'],
          hoverBackgroundColor: ['#64B5F6', '#FFB74D', '#81C784']
        }]
      };
    });
  }

  // Récupère les bénéfices mensuels et prépare un graphique en barres verticales
  loadProfits(year: number) {
    this.dashboardService.getMonthlyProfits(year).subscribe((res) => {
      this.profitsData = {
        labels: res.labels,
        datasets: [
          {
            label: 'Bénéfices (€)',
            data: res.values,
            backgroundColor: '#42A5F5'
          }
        ]
      };

      this.profitsOptions = {
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#495057'
            }
          },
          y: {
            ticks: {
              color: '#495057'
            }
          }
        }
      };
    });
  }
}
