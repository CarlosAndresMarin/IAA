import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Propietario,
  Repuesto
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioRepuestoController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/repuestos', {
    responses: {
      '200': {
        description: 'Array of Propietario has many Repuesto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Repuesto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Repuesto>,
  ): Promise<Repuesto[]> {
    return this.propietarioRepository.repuestos(id).find(filter);
  }

  @post('/propietarios/{id}/repuestos', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Repuesto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repuesto, {
            title: 'NewRepuestoInPropietario',
            exclude: ['id'],
            optional: ['propietarioId']
          }),
        },
      },
    }) repuesto: Omit<Repuesto, 'id'>,
  ): Promise<Repuesto> {
    return this.propietarioRepository.repuestos(id).create(repuesto);
  }

  @patch('/propietarios/{id}/repuestos', {
    responses: {
      '200': {
        description: 'Propietario.Repuesto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repuesto, {partial: true}),
        },
      },
    })
    repuesto: Partial<Repuesto>,
    @param.query.object('where', getWhereSchemaFor(Repuesto)) where?: Where<Repuesto>,
  ): Promise<Count> {
    return this.propietarioRepository.repuestos(id).patch(repuesto, where);
  }

  @del('/propietarios/{id}/repuestos', {
    responses: {
      '200': {
        description: 'Propietario.Repuesto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Repuesto)) where?: Where<Repuesto>,
  ): Promise<Count> {
    return this.propietarioRepository.repuestos(id).delete(where);
  }
}
