import { Injectable } from '@nestjs/common';
import { CrudService, ICrudService } from '../crud/crud.service';
import { PageInfo } from '../entity/pageinfo.entity';

@Injectable()
export class PageInfoService extends CrudService(PageInfo) implements ICrudService {
  async findByPageId(id: number): Promise<any> {
    if (id) {
      const foundPageInfo: PageInfo = await this.getRepository()
        .createQueryBuilder()
        .where('pageId = :id', { id })
        .getOne();
      return foundPageInfo;
    } else {
      return undefined;
    }
  }
}
