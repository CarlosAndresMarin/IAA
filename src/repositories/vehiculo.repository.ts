import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Propietario, Cita} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {CitaRepository} from './cita.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly propietario: BelongsToAccessor<Propietario, typeof Vehiculo.prototype.id>;

  public readonly citas: HasManyRepositoryFactory<Cita, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('CitaRepository') protected citaRepositoryGetter: Getter<CitaRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.citas = this.createHasManyRepositoryFactoryFor('citas', citaRepositoryGetter,);
    this.registerInclusionResolver('citas', this.citas.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
