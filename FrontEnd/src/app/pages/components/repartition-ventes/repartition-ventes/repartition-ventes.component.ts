// Vérifie si le code s'exécute dans le navigateur (utile en SSR)
import { isPlatformBrowser } from '@angular/common';

// Import de composants Angular de base et de la détection de changements
import { ChangeDetectorRef, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';

// Modules nécessaires pour le graphique, le formulaire et le menu déroulant
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

// Déclaration du composant Angular
@Component({
  selector: 'app-repartition-ventes',
  standalone: true,
  imports: [ChartModule, DropdownModule, FormsModule],
  templateUrl: './repartition-ventes.component.html',
  styleUrls: ['./repartition-ventes.component.scss']
})
export class RepartitionVentesComponent implements OnInit {
  // Données et options du graphique
  data: any;
  options: any;

  // Années disponibles dans le menu déroulant
  years = [
    { label: '2023', value: 2023 },
    { label: '2024', value: 2024 },
    { label: '2025', value: 2025 },
    { label: '2026', value: 2026 }
  ];

  // Année sélectionnée par défaut
  selectedYear = 2025;

  // Injection du token PLATFORM_ID pour détecter le contexte d'exécution (navigateur ou serveur)
  platformId = inject(PLATFORM_ID);

  // Injection de ChangeDetectorRef pour forcer la mise à jour de la vue
  constructor(private cd: ChangeDetectorRef) {}

  // Initialisation du graphique au chargement du composant
  ngOnInit() {
    this.initChart(this.selectedYear);
  }

  // Met à jour le graphique lorsqu'une nouvelle année est sélectionnée
  onYearChange() {
    this.initChart(this.selectedYear);
  }

  // Initialise le graphique en fonction de l'année
  initChart(year: number) {
    // Vérifie que l'on est bien dans un environnement navigateur
    if (isPlatformBrowser(this.platformId)) {
      // Récupère les couleurs CSS personnalisées définies dans le thème
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      // Libellés des catégories de produits
      const labels = [
        'Montre', 'Collier', 'Bague', 'Bracelet',
        'Boucle d\'oreille', 'Pendentif', 'Bouton de manchette', 'Divers'
      ];

      // Données simulées des ventes pour chaque année
      const ventesParAnnee: Record<number, number[]> = {
        2023: [120, 80, 150, 70, 40, 35, 15, 20],
        2024: [90, 100, 130, 60, 70, 50, 25, 30],
        2025: [140, 110, 160, 85, 55, 45, 10, 18],
        2026: [100, 120, 140, 75, 60, 40, 12, 28]
      };

      // Récupère les valeurs pour l'année choisie
      const values = ventesParAnnee[year] ?? [];

      // Données à afficher dans le graphique à barres horizontales
      this.data = {
        labels: labels,
        datasets: [
          {
            label: 'Ventes (unités)',
            backgroundColor: '#42A5F5',
            borderColor: '#42A5F5',
            data: values
          }
        ]
      };

      // Options de configuration du graphique
      this.options = {
        indexAxis: 'y', // Affiche les barres horizontalement
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor // Couleur du texte des légendes
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textMutedColor
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            ticks: {
              color: textMutedColor
            },
            grid: {
              color: surfaceBorder
            }
          }
        }
      };

      // Force Angular à détecter les changements si nécessaire
      this.cd.markForCheck();
    }
  }
}
