package meex.enums;

public enum StatutCommande {
    EN_ATTENTE,
    PAYEE,
    EXPEDIEE,
    ANNULEE
}

/**
 * Ce Fichier représente les différents statuts possibles d'une commande.
 *
 * L'utilisation d'une enum permet de :
 * - Centraliser les valeurs valides du statut
 * - Faciliter la lecture et la maintenance du code
 * - Améliorer la sécurité en remplaçant les chaînes de caractères "libres"
 *
 * Statuts disponibles :
 * - EN_ATTENTE  : la commande est enregistrée mais non traitée
 * - PAYEE       : la commande a été payée
 * - EXPEDIEE    : la commande a été expédiée
 * - ANNULEE     : la commande a été annulée
 */