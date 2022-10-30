import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Imagen,
  Repuesto,
} from '../models';
import {ImagenRepository} from '../repositories';

export class ImagenRepuestoController {
  constructor(
    @repository(ImagenRepository)
    public imagenRepository: ImagenRepository,
  ) { }

  @get('/imagens/{id}/repuesto', {
    responses: {
      '200': {
        description: 'Repuesto belonging to Imagen',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Repuesto)},
          },
        },
      },
    },
  })
  async getRepuesto(
    @param.path.string('id') id: typeof Imagen.prototype.id,
  ): Promise<Repuesto> {
    return this.imagenRepository.repuesto(id);
  }
}
