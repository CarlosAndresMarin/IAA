import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Repuesto,
  Propietario,
} from '../models';
import {RepuestoRepository} from '../repositories';

export class RepuestoPropietarioController {
  constructor(
    @repository(RepuestoRepository)
    public repuestoRepository: RepuestoRepository,
  ) { }

  @get('/repuestos/{id}/propietario', {
    responses: {
      '200': {
        description: 'Propietario belonging to Repuesto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propietario)},
          },
        },
      },
    },
  })
  async getPropietario(
    @param.path.string('id') id: typeof Repuesto.prototype.id,
  ): Promise<Propietario> {
    return this.repuestoRepository.propietario(id);
  }
}
