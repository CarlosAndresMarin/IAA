import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cita, CitaRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class CitaRepository extends DefaultCrudRepository<
  Cita,
  typeof Cita.prototype.id,
  CitaRelations
> {

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Cita.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Cita, dataSource);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}
