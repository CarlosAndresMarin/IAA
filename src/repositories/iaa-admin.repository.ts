import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {IaaAdmin, IaaAdminRelations} from '../models';

export class IaaAdminRepository extends DefaultCrudRepository<
  IaaAdmin,
  typeof IaaAdmin.prototype.id,
  IaaAdminRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(IaaAdmin, dataSource);
  }
}
