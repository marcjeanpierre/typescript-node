import { config } from "dotenv";

config();








/************* Test *************/
import Pays from './src/models/Pays';
import Client from './src/models/Client';
import Personne from './src/models/Personne';
import PasswordException from './src/exception/PasswordException';

const france = new Pays(1, 'France');

const routeRegister = async() => {
    const pass = await PasswordException.hashPassword('Zoubida');
    const zoubida = new Personne(null, 'Zoubida', 'Bob', '1993-11-22', 1, 'rue pipo', 'tom', 'cvrogk');
    await zoubida.save();
    const clientZoubida = new Client(zoubida, 'totoo@to.to', pass);
    console.log('My name is:', clientZoubida.constructor.name);
    await clientZoubida.save();
}

routeRegister()