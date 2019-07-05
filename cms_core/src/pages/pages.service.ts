import { Injectable } from '@nestjs/common';
import { CrudService, ICrudService } from '../crud/crud.service';
import { Page } from '../entity/page.entity';

@Injectable()
export class PagesService extends CrudService(Page) implements ICrudService {
}
