import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, RedirectRoute, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {ParamsDictionary} from 'express-serve-static-core';
import parseBearerToken from 'parse-bearer-token';
import {ParsedQs} from 'qs';
import {AutenticacionService} from '../services';

export class EstrategiaAdministrador implements AuthenticationStrategy {
  name: string = 'admin';

  constructor(
    @service(AutenticacionService)
    public serviceAutenticacion: AutenticacionService
  ) { }

  // async authenticate(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): Promise<UserProfile | RedirectRoute | undefined> {
  //   throw new Error('Method not implemented.');
  // }
  async authenticate(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): Promise<UserProfile | RedirectRoute | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      let datos = this.serviceAutenticacion.validarTokenJWT(token);
      if (datos) {
        let perfil: UserProfile = Object.assign({
          nombre: datos.data.nombre
        });
        return perfil;
      } else {
        throw new HttpErrors[401]('El token no es valido');
      }

    } else {
      throw new HttpErrors[401]('No se ha incluido un token en la solicitud');
    }
  }

}
