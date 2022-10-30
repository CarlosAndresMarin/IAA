import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Imagen, ImagenRelations, Repuesto} from '../models';
import {RepuestoRepository} from './repuesto.repository';

export class ImagenRepository extends DefaultCrudRepository<
  Imagen,
  typeof Imagen.prototype.id,
  ImagenRelations
> {

  public readonly repuesto: BelongsToAccessor<Repuesto, typeof Imagen.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RepuestoRepository') protected repuestoRepositoryGetter: Getter<RepuestoRepository>,
  ) {
    super(Imagen, dataSource);
    this.repuesto = this.createBelongsToAccessorFor('repuesto', repuestoRepositoryGetter,);
    this.registerInclusionResolver('repuesto', this.repuesto.inclusionResolver);
  }
}
