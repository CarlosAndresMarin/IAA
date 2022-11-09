import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Repuesto} from '../models';
import {RepuestoRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class RepuestoService {
  constructor(
    //acceder a la database a buscar los repuestos inyeccion de repositorio
    @repository(RepuestoRepository)
    public repuestoRepository: RepuestoRepository

  ) { }

  getRepuestosDisponibles(): Promise<Repuesto[]> {
    let repuestos = this.repuestoRepository.find({
      //filtros para la busqueda
      where: {
        parteNumero: "AA69"
      }
    });
    return repuestos;
  }

  getRepuestosNombre(): Promise<Repuesto[]> {
    let repuestos = this.repuestoRepository.find({
      //filtro de busqueda
      where: {
        tipo: "ABS"
      }
    });
    return repuestos;
  }
  getRepuestosPrecioMayorA(valor: number): Promise<Repuesto[]> {
    let repuestos = this.repuestoRepository.find({
      where: {
        costo: {gt: valor},
        //estado: disponible
      }
    });
    return repuestos
  }
  getRepuestosPrecioMenorOIgualA(valor: number): Promise<Repuesto[]> {
    let repuestos = this.repuestoRepository.find({
      include: ['imagenes', 'propietario'],
      where: {
        costo: {lt: valor},
        //estado: disponible
      }
    });
    return repuestos
  }




  /*
   * Add service methods here
   */
}
