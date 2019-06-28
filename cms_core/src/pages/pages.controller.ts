import { Controller, Get, Param, Inject } from '@nestjs/common';
import { CrudController } from '../crud/crud.controller';
import { PagesService } from './pages.service';
import { PageDTO } from '../dto/page.dto';
import { AuthGuard } from '@nestjs/passport';
import { ParseIntPipe } from '../pipes/parse-int.pipe';
import { PageInfoService } from '../page-info/page-info.service';

@Controller('page')
export class PagesController extends CrudController(PagesService, 'page', PageDTO, {
  // createGuard: AuthGuard('jwt'),
  // updateGuard: AuthGuard('jwt'),
  deleteGuard: AuthGuard('jwt'),
}) {
  @Inject(PageInfoService) readonly pageInfoService;

  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id): Promise<any> {
    return this.pageInfoService.findById(id);
  }
}
