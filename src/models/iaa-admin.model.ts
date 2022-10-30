import {Entity, model, property} from '@loopback/repository';

@model()
export class IaaAdmin extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;


  constructor(data?: Partial<IaaAdmin>) {
    super(data);
  }
}

export interface IaaAdminRelations {
  // describe navigational properties here
}

export type IaaAdminWithRelations = IaaAdmin & IaaAdminRelations;
