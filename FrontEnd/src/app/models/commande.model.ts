export interface Commande {
  id: number;
  date: string;
  nomClient: string;
  statut: string;
  totalCommande: number;
  factureId?: number;
}
