import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ICrudService } from '../crud/crud.service';
import { Menu } from '../entity/menu.entity';
import { MenuDTO } from '../dto/menu.dto';
import { TreeRepository, Connection } from 'typeorm';
import { getEntityMadeOfDto } from '../utils/validate.class';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';

@Injectable()
export class MenuService implements ICrudService {
  protected serviceRepository: TreeRepository<Menu>;
  protected readonly conn: Connection;

  constructor(
    @InjectConnection('default')
    connection: Connection,
  ) {
    this.conn = connection;
    this.serviceRepository = connection.getTreeRepository(Menu);
  }

  async findAll(): Promise<any> {
    return this.serviceRepository.findTrees();
  }

  getRepository(): TreeRepository<any> {
    return this.serviceRepository;
  }

  async findById(id: number): Promise<any> {
    const menu = await this.serviceRepository.findOne(id);
    menu.children = await this.serviceRepository.findDescendants(menu);
    return menu;
  }

  async create(dto: MenuDTO): Promise<any> {
    const menuEntity = new Menu();
    const creatableEntity: Menu = getEntityMadeOfDto(menuEntity, dto);
    if (!creatableEntity) {
      throw new BadRequestException({ message: 'expected data for entity' });
    } else {
      try {
        if (dto.parentId) {
          creatableEntity.parent = await this.serviceRepository.findOne(dto.parentId);
        }
        const result = await this.serviceRepository.save(creatableEntity);
        return result;
      } catch (e) {
        throw new BadRequestException({ message: e.message });
      }
    }
  }

  async update(id: number, dto: MenuDTO): Promise<any> {
    let foundEntity = await this.serviceRepository.findOne(id);
    if (!foundEntity) {
      throw new NotFoundException({ message: `Entity with id=${id} not found` });
    } else {
      foundEntity = getEntityMadeOfDto(foundEntity, dto);

      if (!foundEntity) {
        throw new BadRequestException({ message: 'expected data for entity' });
      } else {
        try {
          if (dto.parentId) {
            foundEntity.parent = await this.serviceRepository.findOne(dto.parentId);
          }
          const savedEntity = await this.serviceRepository.save(foundEntity);
          return savedEntity;
        } catch (e) {
          throw new BadRequestException({
            statusCode: 400,
            message: e.message,
          });
        }
      }
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const deletedEntity = await this.serviceRepository.findOne(id);
      await this.conn
        .createQueryBuilder()
        .delete()
        .from('menu_closure')
        .where('id_ancestor = :id', { id })
        .orWhere('id_descendant = :id', { id })
        .execute();
      await this.serviceRepository.remove(deletedEntity);
      return deletedEntity;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }
}
