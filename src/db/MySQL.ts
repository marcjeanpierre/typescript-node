import { createConnection, Connection } from 'mysql';

import Client from '../models/Client';
import Personne from '../models/Personne';

export default class MySQL {

    static insert(table: string, insert: Client | Personne): Promise < number > {
        return new Promise((resolve, reject) => {

            const bdd: Connection = createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                socketPath: process.env.SOCKETPATH,
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL)
            })
            bdd.connect(err => {
                if (err)
                    console.log('Connection database error');
            })

            let key = Object.keys(insert)
            let data = []
            let columns = "";
            let parameters = "";

            for (const [key, value] of Object.entries(insert)) {
                if (insert.attribut.indexOf(key) !== -1) {
                    columns += "`" + key + "`,";
                    parameters += "?,";
                    data.push(value)
                }
            }
            columns = columns.slice(0, -1);
            parameters = parameters.slice(0, -1);

            const query = bdd.query(`INSERT INTO ${table} (${columns}) VALUES (${parameters})  `, data, (error, results, fields) => {
                if (error)
                    console.log(error);
                else
                    resolve(results.insertId)
                bdd.end();
            });

        })

    }

    static select(table: string, insert: Client | Personne): any {
        return new Promise((resolve, reject) => {

            const bdd: Connection = createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                socketPath: process.env.SOCKETPATH,
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL)
            })
            bdd.connect(err => {
                if (err)
                    console.log('Connection database error');
            })

            let key = insert.select
            let columns = "";

            for (const champs of key) {
                columns += "`" + champs + "`,";
            }

            columns = columns.slice(0, -1);

            console.log(Object.keys(insert));

            const query = bdd.query(`SELECT ${columns} FROM ${table} WHERE ${insert.pk(1)} LIKE ?;`, [insert.pk()], (error, results, fields) => {
                if (error)
                    console.log(error);
                else
                    resolve('results')
                bdd.end();
            });

        })

    }


}