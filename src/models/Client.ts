import MySQL from '../db/MySQL';
import Personne from './Personne';

import EmailException from '../exception/EmailException';
import PasswordException from '../exception/PasswordException';

export default class Client extends Personne {

    email: string;
    password: string = '';
    personne_idpersonne: number | null | undefined;

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

        // const personne = < Personne > id;
        // this.personne_idpersonne = < number > personne.pk();
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

    static attribut(): Array < string > {
        return ['personne_idpersonne', 'email', 'password']
    };

    static selectAttribut(): Array < string > {
        return ['personne_idpersonne', 'email'];
    }

}