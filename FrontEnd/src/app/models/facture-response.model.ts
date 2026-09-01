export interface FactureResponse {
  id: number;
  nomClient: string;
  prenomClient: string;
  montantTotal: number;
  quantiteTotale: number;
  statutCommande: string;
  referencesProduits: string[];
  dateEmission: string;
  dateEcheance: string;
}
