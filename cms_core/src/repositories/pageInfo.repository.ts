import { EntityRepository, Repository } from 'typeorm';
import { PageInfo } from '../entity/pageinfo.entity';

@EntityRepository(PageInfo)
export class PageRepository extends Repository<PageInfo> {}
