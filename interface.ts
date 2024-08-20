
export interface Admin {
    id: string
    user: string
    password: string
    role: string
}

export interface Utilisateur {
    id: string
    code: string
    nom: string
    prenom: string
    dateNaissance: Date
    role: string
    idAdmin : string
    password : string
    createdAt: Date
    updatedAt: Date
}
export interface Production {
    id: string
    code: string
    nom: string
    prenom: string
    dateNaissance: Date
    inspectionId : string
    createdAt: Date
    updatedAt: Date
}
export interface Realisateur {
    id: string
    code: string
    nom: string
    prenom: string
    dateNaissance: Date
    inspectionId : string
    createdAt: Date
    updatedAt: Date
}
export interface Films {
    id: string
    code : string
    titre: string
    dateCreate: Date
    sujet: string
    realisateurId : string
    productionId : string
    reponsableId: string
    createdAt: Date
    updatedAt: Date
}

export interface Projection {
    id: string
    jour : string
    date : string
    lieu : string
    salle : string
    createdAt: Date
    updatedAt: Date
}

export interface Note{
    id: string
    note: Number
    createdAt: Date
    updatedAt: Date
}

export interface Auth  extends Request {
    user?:string;
}