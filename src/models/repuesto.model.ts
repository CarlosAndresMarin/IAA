import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Imagen} from './imagen.model';
import {Propietario} from './propietario.model';

@model()
export class Repuesto extends Entity {
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
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  parteNumero: string;

  @property({
    type: 'number',
    required: true,
  })
  costo: number;

  @property({
    type: 'boolean',
    required: true,
  })
  RequiereProgramar: boolean;

  @hasMany(() => Imagen)
  imagenes: Imagen[];

  @belongsTo(() => Propietario)
  propietarioId: string;

  constructor(data?: Partial<Repuesto>) {
    super(data);
  }
}

export interface RepuestoRelations {
  // describe navigational properties here
}

export type RepuestoWithRelations = Repuesto & RepuestoRelations;
