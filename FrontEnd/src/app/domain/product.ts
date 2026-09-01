  export interface Product {
    id?: string;
    code?: string;
    name?: string;
    price: number;
    inventoryStatus?: 'Disponible' | 'Quantité faible' | 'Indisponible';
  }
  