import { Injectable } from '@nestjs/common';
import { CrudService, ICrudService } from '../crud/crud.service';
import { Block } from '../entity/block.entity';

@Injectable()
export class BlocksService extends CrudService(Block) implements ICrudService {}
