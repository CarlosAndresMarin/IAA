import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Repuesto,
  Imagen,
} from '../models';
import {RepuestoRepository} from '../repositories';

export class RepuestoImagenController {
  constructor(
    @repository(RepuestoRepository) protected repuestoRepository: RepuestoRepository,
  ) { }

  @get('/repuestos/{id}/imagens', {
    responses: {
      '200': {
        description: 'Array of Repuesto has many Imagen',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Imagen)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Imagen>,
  ): Promise<Imagen[]> {
    return this.repuestoRepository.imagenes(id).find(filter);
  }

  @post('/repuestos/{id}/imagens', {
    responses: {
      '200': {
        description: 'Repuesto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Imagen)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Repuesto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagen, {
            title: 'NewImagenInRepuesto',
            exclude: ['id'],
            optional: ['repuestoId']
          }),
        },
      },
    }) imagen: Omit<Imagen, 'id'>,
  ): Promise<Imagen> {
    return this.repuestoRepository.imagenes(id).create(imagen);
  }

  @patch('/repuestos/{id}/imagens', {
    responses: {
      '200': {
        description: 'Repuesto.Imagen PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagen, {partial: true}),
        },
      },
    })
    imagen: Partial<Imagen>,
    @param.query.object('where', getWhereSchemaFor(Imagen)) where?: Where<Imagen>,
  ): Promise<Count> {
    return this.repuestoRepository.imagenes(id).patch(imagen, where);
  }

  @del('/repuestos/{id}/imagens', {
    responses: {
      '200': {
        description: 'Repuesto.Imagen DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Imagen)) where?: Where<Imagen>,
  ): Promise<Count> {
    return this.repuestoRepository.imagenes(id).delete(where);
  }
}
