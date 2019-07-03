import * as _ from 'lodash';
import { validate, IsInt, IsString, Validator } from 'class-validator';

export function validateClasses(dto: any, enterObject: any): any {
  const dtoKeys = Object.getOwnPropertyNames(dto);
  const enterObjectKeys = Object.getOwnPropertyNames(enterObject);
  const resultKey = _.intersection(dtoKeys, enterObjectKeys);

  for (const key of resultKey) {
    dto[key] = enterObject[key];
  }

  const validator = new Validator();

  const errors = validator.validateSync(dto);
  if (errors.length > 0) {
    return _.map(errors, n => {
      return n.constraints;
    });
  } else {
    return undefined;
  }
}

export function getEntityMadeOfDto(entity: any, dto: any): any {
  const dtoKeys = Object.getOwnPropertyNames(dto);
  const entityObjectKeys = Object.getOwnPropertyNames(entity);
  const resultKey = _.intersection(dtoKeys, entityObjectKeys);

  if (!resultKey && resultKey.length === 0) {
    return undefined;
  }

  for (const key of resultKey) {
    if (key.toLowerCase() !== 'id') {
      entity[key] = dto[key];
    }
  }

  return entity;
}
