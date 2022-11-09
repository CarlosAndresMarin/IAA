import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {llaves} from '../config/llaves';
import {Propietario} from '../models';
import {PropietarioRepository} from '../repositories';
const cryptoJs = require('crypto-js');
const passwordGen = require('password-generator');
const jwt = require('jsonwebtoken')

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PropietarioRepository)
    public propietarioRepository: PropietarioRepository
  ) { }

  cifrarClave(clave: string): string {
    let claveCifrada = cryptoJs.MD5(clave).toString();

    return claveCifrada
  }
  generarClave() {
    let clave = passwordGen(8, false);
    return this.cifrarClave(clave);
  }

  validarAcceso(usuario: string, contrasenia: string) {
    try {
      let prop = this.propietarioRepository.findOne({
        where: {
          correo: usuario,
          clave: contrasenia
        }
      });
      if (prop)
        return prop;

      return false;

    } catch (error) {

      return false;

    }
  }

  //const  cifrarClave2 = (clave: string) => cryptoJs.MD5(clave).toString().toString();
  // METODO QUE GENERE UN TOKEN

  generarTokenJWT(propietario: Propietario) {
    let token = jwt.sign({
      data: {
        id: propietario.id,
        correo: propietario.correo,
        nombre: `${propietario.nombre} ${propietario.apellido}`
      }
    },
      llaves.claveJWT
    );
    return token;
  }

  validarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, llaves.claveJWT)
      return datos;
    } catch (error) {
      return false;
    }
  }

}
