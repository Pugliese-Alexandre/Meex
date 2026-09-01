export interface Client {
  id?: number;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  numeroMaison: string;
  codePostal: string;
  dateInscription: string;
  dateAnniversaire?: string | null;

}
