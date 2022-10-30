import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cita,
  Vehiculo,
} from '../models';
import {CitaRepository} from '../repositories';

export class CitaVehiculoController {
  constructor(
    @repository(CitaRepository)
    public citaRepository: CitaRepository,
  ) { }

  @get('/citas/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Cita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof Cita.prototype.id,
  ): Promise<Vehiculo> {
    return this.citaRepository.vehiculo(id);
  }
}
