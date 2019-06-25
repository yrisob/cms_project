import { EntityRepository, Repository } from 'typeorm';
import { Page } from '../entity/page.entity';

@EntityRepository(Page)
export class PageRepository extends Repository<Page> {}
