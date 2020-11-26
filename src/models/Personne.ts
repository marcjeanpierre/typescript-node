import Pays from './Pays';
import MySQL from '../db/MySQL';
import { PersonneInterfaces } from '../interfaces/Personne';

export default class Personne {

    protected id ? : number | null;
    public nom: string | null;
    public prenom: string | null;
    public dateNaiss: string | null;
    public adresse ? : string;
    public ville ? : string;
    public zipcode ? : string;
    protected pays_idPays: number;

    /**
     * Creates an instance of Personne.
     * @param {(number | Personne | null)} id
     * @param {string} [firstname='']
     * @param {string} [lastname='']
     * @param {string} [dateNaiss='']
     * @param {number} [idPays=1]
     * @param {string} [adresse]
     * @param {string} [ville]
     * @param {string} [zipcode]
     * @memberof Personne
     */
    constructor(id: number | Personne | null, firstname: string = '', lastname: string = '', dateNaiss: string = '', idPays: number = 1, adresse ? : string, ville ? : string, zipcode ? : string) {
        if (id === null || Number.isInteger(id)) {
            this.ville = ville;
            this.adresse = adresse;
            this.zipcode = zipcode;
            this.pays_idPays = idPays;
            this.dateNaiss = dateNaiss;
            this.nom = lastname.toUpperCase().trim();
            this.prenom = firstname.toLowerCase().trim();
            this.id = (id === null) ? null : < number > id;
        }
        // else if (!isNaN(id)) {
        //     const personne = < Personne > id;
        //     this.updateId( < number > personne.pk())
        //     this.nom = personne.nom;
        //     this.ville = personne.ville;
        //     this.prenom = personne.prenom;
        //     this.adresse = personne.adresse;
        //     this.zipcode = personne.zipcode;
        //     this.dateNaiss = personne.dateNaiss;
        //     this.pays_idPays = < number > personne.idPays;
        // } 
        // else {
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
            // }
    }

    /**
     *
     * Save to the property in database
     * @returns {Promise < number >}
     * @memberof Personne
     */
    save(): Promise < number > {
        return new Promise((resolve, reject) => {
            MySQL.insert('personne', this).then((id: number) => {
                    this.id = id;
                    resolve(id)
                })
                .catch((err) => {
                    reject(false)
                })
        })
    }

    static select(where: any) {
        return new Promise((resolve, reject) => {
            MySQL.select('personne', where).then((id: any) => {
                    console.log(id);
                    resolve(id)
                })
                .catch((err: any) => {
                    reject(false)
                })
        })
    }

    pk(type: 0 | 1 = 0): string | number {
        return (type) ? 'idpersonne' : < number > this.id;
    }

    /**
     *
     * Return the attribut for the register property in the MySQL Class
     * @readonly
     * @type {Array < string >}
     * @memberof Personne
     */
    get attribut(): Array < string > {
        return ['nom', 'prenom', 'dateNaiss', 'adresse', 'ville', 'zipcode', 'pays_idPays']
    }

    /**
     *
     * List of the property retrieved for the Select method
     * @readonly
     * @type {Array < string >}
     * @memberof Personne
     */
    static selectAttribut(): Array < string > {
        return ['idpersonne', 'nom', 'prenom', 'dateNaiss', 'adresse', 'ville', 'zipcode', 'pays_idPays']
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

}