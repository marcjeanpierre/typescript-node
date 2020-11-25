import { PaysInterfaces } from './Pays';
export interface PersonneInterfaces {
    id ? : number | null;
    nom: string | null;
    prenom: string | null;
    dateNaiss: string | null;
    adresse ? : string;
    ville ? : string;
    zipcode ? : string;
    pays_idPays: string | number;

    save(): Promise < number >
}