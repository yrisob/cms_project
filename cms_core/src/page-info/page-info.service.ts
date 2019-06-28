import { Injectable } from '@nestjs/common';
import { CrudService, ICrudService } from '../crud/crud.service';
import { PageInfo } from '../entity/pageinfo.entity';

@Injectable()
export class PageInfoService extends CrudService(PageInfo) implements ICrudService {}
