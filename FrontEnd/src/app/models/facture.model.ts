
export interface Facture {
  nom: string;
  prenom: string;
  montant: number;
  quantite: number;
  statut: string;
  dateFacture: string;
  dateEcheance: string;
  references: string[];
}
