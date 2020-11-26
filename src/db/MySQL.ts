import { createConnection, Connection } from 'mysql';

import Client from '../models/Client';
import Personne from '../models/Personne';
import listClass from '../utils/listClass';

/**
 *
 *  Class CRUD to database MySql/MariaDB
 * @export
 * @class MySQL
 */
export default class MySQL {

    /**
     *
     * Insertion of any defined entity
     * @static
     * @param {string} table
     * @param {(Client | Personne)} insert
     * @returns {Promise < number >}
     * @memberof MySQL
     */
    static insert(table: string, instance: Client | Personne): Promise < number > {
        return new Promise((resolve, reject) => { // return Promise because the processing time of the database | The only way to get an answer is the "resolve()" or "reject()"

            const bdd: Connection = createConnection({ // Init params to database
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                socketPath: process.env.SOCKETPATH, // Socket to Mac or Linux
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) // 3306 port default to mysql
            })
            bdd.connect(err => {
                if (err) console.log('Connection database error');
            })

            let data = []; // Stock value
            let columns = "";
            let parameters = "";

            for (const [key, value] of Object.entries(instance)) { // Convert the properties of our objects to an array
                if (instance.attribut.indexOf(key) !== -1) { // Check to property to the key array because the children Object will acces property parent
                    columns += "`" + key + "`,";
                    parameters += "?,";
                    data.push(value)
                }
            }
            columns = columns.slice(0, -1); // delete the last carac.
            parameters = parameters.slice(0, -1);

            bdd.query(`INSERT INTO ${table} (${columns}) VALUES (${parameters})  `, data, (error, results, fields) => { // excute request sql
                if (error) {
                    reject(error); // Reponse promise false => catch
                    console.log(error);
                } else
                    resolve(results.insertId); // Reponse promise true => then or await
                bdd.end(); // Close database
            });

        })

    }

    static select(table: 'client' | 'personne', where ? : any): any {
        return new Promise((resolve, reject) => { // return Promise because the processing time of the database | The only way to get an answer is the "resolve()" or "reject()"
            const bdd: Connection = createConnection({ // Init params to database
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                socketPath: process.env.SOCKETPATH, // Socket to Mac or Linux
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) // 3306 port default to mysql
            })
            bdd.connect(err => {
                if (err) console.log('Connection database error');
            })

            let data = []; // Stock value
            let columns = "";
            let conditionWhere = "";

            let parameters = "";

            const key = listClass[table].selectAttribut() // select is method to the Class => Array<string>
            // const key = Client.selectAttribut() // select is method to the Class => Array<string>

            for (const champs of key) {
                columns += "`" + champs + "`,";
            }


            for (const [key, value] of where) {
                conditionWhere += "`" + key + "` LIKE ? and ";
                data.push(value)
            }
            conditionWhere = conditionWhere.slice(0, -5); // delete the last carac.

            columns = columns.slice(0, -1); // delete the last carac.

            const query = bdd.query(`SELECT ${columns} FROM ${table} WHERE ${conditionWhere} ;`, [data], (error, results, fields) => { // excute request sql
                if (error) {
                    reject(error); // Reponse promise false => catch
                    console.log(error);
                } else
                    resolve(results); // Reponse promise true => then or await
                bdd.end(); // Close database
            });

        })

    }


}