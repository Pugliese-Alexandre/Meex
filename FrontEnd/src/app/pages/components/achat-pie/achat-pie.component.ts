// Importation des modules Angular et PrimeNG nécessaires
import { ChangeDetectorRef, Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Pour vérifier si on est côté navigateur
import { ChartModule } from 'primeng/chart';         // Module de graphiques PrimeNG
import { DropdownModule } from 'primeng/dropdown';   // Menu déroulant PrimeNG
import { FormsModule } from '@angular/forms';        // Pour la liaison [(ngModel)]

// Définition du composant Angular avec les modules importés en standalone
@Component({
  selector: 'app-achat-pie',
  standalone: true,
  imports: [ChartModule, DropdownModule, FormsModule],
  templateUrl: './achat-pie.component.html',
  styleUrls: ['./achat-pie.component.scss']
})
export class AchatPieComponent implements OnInit {
  data: any;     // Données du graphique
  options: any;  // Options de configuration du graphique

  // Liste des années disponibles dans le dropdown
  years = [
    { label: '2023', value: 2023 },
    { label: '2024', value: 2024 },
    { label: '2025', value: 2025 },
    { label: '2026', value: 2026 }
  ];

  selectedYear = this.years[2].value; // Année sélectionnée par défaut : 2025

  // Injection du token PLATFORM_ID pour détecter si on est côté navigateur
  platformId = inject(PLATFORM_ID);

  // Injection du ChangeDetectorRef pour forcer la détection des changements
  constructor(private cd: ChangeDetectorRef) {}

  // Initialisation du composant
  ngOnInit() {
    this.initChart(this.selectedYear); // Affiche le graphique pour l'année sélectionnée
  }

  // Appelée lorsqu'on change l'année via le menu déroulant
  onYearChange() {
    this.initChart(this.selectedYear);
  }

  // Initialise les données du graphique en fonction de l'année
  initChart(year: number) {
    // Vérifie si on est bien dans un environnement navigateur (utile si SSR)
    if (isPlatformBrowser(this.platformId)) {
      // Récupère les styles CSS du document pour appliquer le thème dynamiquement
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      // Données simulées pour chaque année (à remplacer par appel API réel plus tard)
      const mockData: Record<number, number[]> = {
        2023: [300, 400, 500],
        2024: [420, 380, 210],
        2025: [150, 600, 450],
        2026: [700, 200, 300]
      };

      // Récupération des données de l'année, ou valeurs nulles par défaut
      const dataset = mockData[year] ?? [0, 0, 0];

      // Configuration des données du graphique en camembert
      this.data = {
        labels: ['Or', 'Argent', 'Pierres précieuses'],
        datasets: [
          {
            data: dataset,
            backgroundColor: ['#f8ff00', '#c9c9c9', '#8dd3ef'],
            hoverBackgroundColor: ['#ffd100', '#9b9a9a', '#5db2d3']
          }
        ]
      };

      // Options d'affichage du graphique (légende avec style personnalisé)
      this.options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
      };

      // Force la mise à jour manuelle du DOM si les données ont changé
      this.cd.markForCheck();
    }
  }
}
