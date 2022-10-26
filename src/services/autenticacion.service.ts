import { /* inject, */ BindingScope, injectable} from '@loopback/core';
const cryptoJs = require('crypto-js');
const passwordGen = require('password-generator');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) { }

  cifrarClave(clave: string): string {
    let claveCifrada = cryptoJs.MD5(clave).toString();

    return claveCifrada
  }
  generarClave() {
    let clave = passwordGen(8, false);
    return this.cifrarClave(clave);
  }


  //const  cifrarClave2 = (clave: string) => cryptoJs.MD5(clave).toString().toString();

}
