//  IMPORTS ANGULAR DE BASE
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

//  SERVICES
import { ProductService, Product } from '../../../services/productservice';
import { FournisseurService, Fournisseur } from '../../../services/fournisseur.service';

//  FORMULAIRES
import { FormsModule } from '@angular/forms';

//  MODULES PRIMENG
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';

//  SERVICES PRIMENG
import { MessageService } from 'primeng/api';

//  COMPOSANTS CUSTOM
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
//  DÉCLARATION DU COMPOSANT
@Component({
  selector: 'app-catalogue-produits',
  standalone: true,
  imports: [
    CustomButtonComponent,
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    TagModule
  ],
  providers: [MessageService],
  templateUrl: './catalogue-produits.component.html',
  styleUrls: ['./catalogue-produits.component.scss']
})
export class CatalogueProduitsComponent {
  //  PROPRIÉTÉS
  products: Product[] = [];                // Liste de tous les produits
  fournisseurs: Fournisseur[] = [];        // Liste des fournisseurs
  selectedFournisseurId?: number;          // ID du fournisseur sélectionné

  // Nouveau produit (utilisé pour l'ajout)
  newProduct: Product = {
    reference: '',
    description: '',
    prixVente: 0,
    stock: 0,
    inventoryStatus: 'Disponible'
  };

  selectedProduct: Product | null = null;  // Produit sélectionné pour édition ou suppression

  // Types de produits pour les dropdowns
  typeProduitOptions = [
    { label: 'Montre', value: 'Montre' },
    { label: 'Collier', value: 'Collier' },
    { label: 'Bague', value: 'Bague' },
    { label: 'Bracelet', value: 'Bracelet' },
    { label: 'Boucle d\'oreille', value: 'Boucle d\'oreille' },
    { label: 'Pendentif', value: 'Pendentif' },
    { label: 'Bouton de manchette', value: 'Bouton de manchette' },
    { label: 'Divers', value: 'Divers' }
  ];

  productTypes = [
    { label: 'Montre', value: 'MON' },
    { label: 'Collier', value: 'COL' },
    { label: 'Bague', value: 'BAG' },
    { label: 'Bracelet', value: 'BRA' },
    { label: 'Boucle d\'oreille', value: 'BOU' },
    { label: 'Pendentif', value: 'PEN' },
    { label: 'Bouton de manchette', value: 'MAN' },
    { label: 'Divers', value: 'DIV' }
  ];

  selectedType: string | null = null;      // Type sélectionné pour le filtre
  filteredProducts: Product[] = [];        // Produits filtrés selon le type

  // États des dialogues (modaux)
  visibleAdd = false;
  visibleEdit = false;
  visibleDelete = false;

  // ==================== CONSTRUCTEUR ====================
  constructor(
    private productService: ProductService,
    private fournisseurService: FournisseurService,
    private messageService: MessageService
  ) {}

  // ==================== INIT ====================
  ngOnInit() {
    this.loadProducts();       // Charge les produits
    this.loadFournisseurs();   // Charge les fournisseurs
  }

  // Génère une référence produit à partir du type sélectionné
  generateReference(type: string): string {
    const prefixMap: { [key: string]: string } = {
      'Montre': 'MON',
      'Collier': 'COL',
      'Bague': 'BAG',
      'Bracelet': 'BRA',
      'Boucle d\'oreille': 'BOU',
      'Pendentif': 'PEN',
      'Bouton de manchette': 'MAN',
      'Divers': 'DIV'
    };
    const prefix = prefixMap[type] || 'GEN';
    const timestamp = Date.now();
    return `${prefix}-${timestamp}`;
  }

  // Met à jour la référence automatiquement lors du changement de type
  onTypeProduitChange(): void {
    if (this.newProduct.typeProduit) {
      this.newProduct.reference = this.generateReference(this.newProduct.typeProduit);
    } else {
      this.newProduct.reference = '';
    }
  }

  // Charge les produits depuis le backend
  loadProducts() {
    this.productService.getProducts().subscribe({
      next: data => {
        this.products = data || [];
        this.filteredProducts = this.products;
      },
      error: err => {
        console.error('Erreur chargement produits :', err);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les produits.' });
      }
    });
  }

  // Charge les fournisseurs depuis le backend
  loadFournisseurs() {
    this.fournisseurService.getFournisseurs().subscribe({
      next: data => {
        this.fournisseurs = data;
        if (data.length === 0) {
          this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Aucun fournisseur trouvé.' });
        }
      },
      error: err => {
        console.error('Erreur chargement fournisseurs :', err);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les fournisseurs.' });
      }
    });
  }

  // Ajoute un nouveau produit
  ajouterProduit() {
    this.newProduct.inventoryStatus = this.calculerStatus(this.newProduct.stock);
    if (!this.selectedFournisseurId) return;

    this.newProduct.fournisseur = { id: this.selectedFournisseurId };
    this.newProduct.vendu = 0;

    if (this.newProduct.typeProduit) {
      this.newProduct.reference = this.generateReference(this.newProduct.typeProduit);
    }

    this.productService.addProduct(this.newProduct).subscribe({
      next: () => {
        this.visibleAdd = false;
        this.loadProducts();
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Produit ajouté' });
        this.newProduct = { reference: '', description: '', prixVente: 0, stock: 0, inventoryStatus: 'Disponible' };
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Ajout du produit échoué' });
      }
    });
  }

  // ==================== VALIDATION FORMULAIRE AJOUT ====================
  submitted = false;

  submitForm() {
    this.submitted = true;

    const { description, typeProduit, prixVente } = this.newProduct;
    if (!description || !typeProduit || !prixVente || prixVente <= 0) return;

    this.ajouterProduit();
    this.submitted = false;
    this.visibleAdd = false;
  }

  // Filtre les produits par type de référence
  filterByType(prefix: string): void {
    const foundType = this.productTypes.find(t => t.value === prefix);
    this.selectedType = foundType ? foundType.label : prefix;

    this.filteredProducts = this.products.filter(p =>
      p.reference?.startsWith(prefix)
    );
  }

  // Réinitialise le filtre de type
  resetTypeFilter(): void {
    this.selectedType = null;
    this.filteredProducts = this.products;
  }

  // ==================== MODIFICATION PRODUIT ====================
  submittedEdit = false;

  modifierProduit() {
    this.submittedEdit = true;

    if (!this.selectedProduct) return;

    const { description, typeProduit, prixVente } = this.selectedProduct;
    if (!description || !typeProduit || !prixVente || prixVente <= 0) return;

    this.selectedProduct.inventoryStatus = this.calculerStatus(this.selectedProduct.stock);

    this.productService.updateProduct(this.selectedProduct).subscribe({
      next: () => {
        this.visibleEdit = false;
        this.loadProducts();
        this.submittedEdit = false;
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Produit modifié' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de modifier le produit.' });
      }
    });
  }

  // ==================== SUPPRESSION PRODUIT ====================
  supprimerProduit() {
    if (!this.selectedProduct?.id) return;

    this.productService.deleteProduct(this.selectedProduct.id).subscribe({
      next: () => {
        this.visibleDelete = false;
        this.loadProducts();
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Produit supprimé' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Suppression échouée' });
      }
    });
  }

  // Ouvre le formulaire d'édition pour un produit donné
  ouvrirEdition(product: Product) {
    this.selectedProduct = {
      ...product,
      fournisseur: product.fournisseur || { id: this.fournisseurs[0]?.id || 0 }
    };
    this.visibleEdit = true;
  }

  // Ouvre la fenêtre de confirmation pour suppression
  ouvrirSuppression(product: Product) {
    this.selectedProduct = product;
    this.visibleDelete = true;
  }

  // Détermine le statut en fonction du stock
  calculerStatus(stock: number): 'Disponible' | 'Quantité faible' | 'Indisponible' {
    if (stock <= 0) return 'Indisponible';
    if (stock <= 5) return 'Quantité faible';
    return 'Disponible';
  }

  // Retourne la couleur associée à un statut
  getSeverity(status: string) {
    switch (status) {
      case 'Disponible': return 'success';
      case 'Quantité faible': return 'warn';
      case 'Indisponible': return 'danger';
      default: return 'info';
    }
  }

  // Récupère le nom d’un fournisseur à partir de son ID
  getFournisseurNameById(id: number): string {
    const fournisseur = this.fournisseurs.find(f => f.id === id);
    return fournisseur ? fournisseur.nom : 'Inconnu';
  }
}
