import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Repuesto} from './repuesto.model';

@model()
export class Imagen extends Entity {
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
  acceso: string;

  @belongsTo(() => Repuesto)
  repuestoId: string;

  constructor(data?: Partial<Imagen>) {
    super(data);
  }
}

export interface ImagenRelations {
  // describe navigational properties here
}

export type ImagenWithRelations = Imagen & ImagenRelations;
