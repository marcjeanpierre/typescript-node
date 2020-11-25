import Pays from './Pays';
import MySQL from '../db/MySQL';

export default class Personne {

    protected id ? : number | null;
    public nom: string | null;
    public prenom: string | null;
    public dateNaiss: string | null;
    public adresse ? : string;
    public ville ? : string;
    public zipcode ? : string;
    protected pays_idPays: number;

    constructor(id: number | Personne | null, firstname: string = '', lastname: string = '', dateNaiss: string = '', idPays: number = 1, adresse ? : string, ville ? : string, zipcode ? : string) {
        if (id === null) {
            this.nom = lastname.toUpperCase().trim();
            this.prenom = firstname.toLowerCase().trim();
            this.dateNaiss = dateNaiss;
            this.adresse = adresse;
            this.ville = ville;
            this.zipcode = zipcode;
            this.pays_idPays = idPays
        } else if (id.constructor !== undefined) {
            const personne = < Personne > id;
            this.updateId( < number > personne.pk())
            this.nom = personne.nom;
            this.ville = personne.ville;
            this.prenom = personne.prenom;
            this.adresse = personne.adresse;
            this.zipcode = personne.zipcode;
            this.dateNaiss = personne.dateNaiss;
            this.pays_idPays = < number > personne.idPays;
            // this.pays_idPays = user.pays_idPays
        } else {
            // Search Personne by id
            let user = { id: 1, nom: 'Zoubida', prenom: 'Test 2', dateNaiss: '22-11-1993', adresse: '', ville: '', zipcode: '', pays_idPays: 1 }


            this.id = user.id;
            this.nom = user.nom
            this.prenom = user.prenom
            this.dateNaiss = user.dateNaiss;
            this.adresse = user.adresse;
            this.ville = user.ville;
            this.zipcode = user.zipcode;
            this.pays_idPays = user.pays_idPays
        }
    }

    save(): Promise < number > {
        console.log("Personne");
        return new Promise((resolve, reject) => {
            // MySQL.insert('personne', this).then((id: number) => {
            //     this.id = id;
            //     resolve(id)
            // })
            MySQL.select('personne', this).then((id: any) => {
                console.log(id);
                // resolve(id)
            })
        })
    }

    pk(type: 0 | 1 = 0): string | number {
        return (type) ? 'idpersonne' : < number > this.id;
    }

    get attribut(): Array < string > {
        return ['nom', 'prenom', 'dateNaiss', 'adresse', 'ville', 'zipcode', 'pays_idPays']
    }

    get select(): Array < string > {
        return ['nom', 'prenom', 'dateNaiss', 'adresse', 'ville', 'zipcode', 'pays_idPays']
    }

    get pays(): string {
        return new Pays( < number > this.pays_idPays).name;
    }

    get idPays(): number {
        return this.pays_idPays;
    }

    get fullname(): string {
        return this.prenom + ' ' + this.nom;
    }

    get address(): string {
        return this.adresse + ' ' + this.ville + ',' + this.zipcode;
    }

    private updateId(id: number): void {
        this.id = id
    }

    private updateIdPays(id: number): void {
        this.pays_idPays = id
    }

}