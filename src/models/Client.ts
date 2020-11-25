import Personne from './Personne';

import EmailException from '../exception/EmailException';
import PasswordException from '../exception/PasswordException';
import { ClientInterfaces } from '../interfaces/Client';
import MySQL from '../db/MySQL';
import Pays from './Pays';
import { PaysInterfaces } from '../interfaces/Pays';

export default class Client extends Personne {

    personne_idpersonne: number | null | undefined;
    email: string;
    password: string = '';

    constructor(id: number | Personne, email: string = '', password: string = '') {
        super(id);
        if (EmailException.checkEmail(email))
            throw new EmailException()
        if (!PasswordException.isValidPassword(password))
            throw new PasswordException()
        this.email = email;
        // PasswordException.hashPassword(password).then(pass => {
        //     this.password = pass;
        // });
        this.password = password;

        const personne = < Personne > id;
        this.personne_idpersonne = < number > personne.pk();
    }

    save(): Promise < number > {
        console.log("Client");
        return new Promise((resolve, reject) => {
            MySQL.insert('client', this).then((id: number) => {
                console.log('Save Client');
            })
        })
    };

    pk(type: 0 | 1 = 0): string | number {
        return (type) ? 'id' : < number > this.id;
    };

    get attribut(): Array < string > {
        return ['personne_idpersonne', 'email', 'password']
    }

    get select(): Array < string > {
        return ['personne_idpersonne', 'email'];
    }

}