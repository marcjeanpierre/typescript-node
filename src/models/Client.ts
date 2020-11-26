import MySQL from '../db/MySQL';
import Personne from './Personne';

import EmailException from '../exception/EmailException';
import PasswordException from '../exception/PasswordException';
import { jointureInterface } from '../db/MySQL';

export default class Client extends Personne {

    email: string;
    password: string = '';
    personne_idpersonne: number | null | undefined;

    protected table: string = 'client';

    constructor(id: Personne, email: string = '', password: string = '') {

        super(id);

        if (EmailException.checkEmail(email)) // Check valid syntaxe email
            throw new EmailException()
        if (!PasswordException.isValidPassword(password)) // Check valid syntaxe password
            throw new PasswordException()

        this.email = email;
        this.password = password;
        this.personne_idpersonne = this.id;
    }

    /************************* GETTER *************************/

    get attributInsert(): Array < string > {
        return ['personne_idpersonne', 'email', 'password']
    };

    /************************* STATIC METHOD *************************/

    static select(where: any) {
        return new Promise((resolve, reject) => {
            const join: Array < jointureInterface > = [{
                type: 'LEFT',
                table: 'personne',
                where: {
                    table: 'client',
                    foreignKey: 'personne_idpersonne'
                }
            }, {
                type: 'LEFT',
                table: 'pays',
                where: {
                    table: 'personne',
                    foreignKey: 'pays_idPays'
                }
            }, ]
            MySQL.selectJoin('client', join, where).then((arrayPersonne: Array < any > ) => {
                    // let data: Array < Personne > = [];
                    // for (const personne of arrayPersonne) {
                    //     personne.dateNaiss = new String(personne.dateNaiss)
                    //     personne.id = personne.idpersonne;
                    //     data.push(new Personne(personne));
                    // }
                    console.log(arrayPersonne);
                    resolve(arrayPersonne)
                })
                .catch((err: any) => {
                    console.log(err);
                    reject(false)
                });
        })
    }

}