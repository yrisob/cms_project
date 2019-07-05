import { Controller, Get, Param, Inject, Patch, Body, BadRequestException } from '@nestjs/common';
import { CrudController } from '../crud/crud.controller';
import { PagesService } from './pages.service';
import { PageDTO } from '../dto/page.dto';
import { AuthGuard } from '@nestjs/passport';
import { ParseIntPipe } from '../pipes/parse-int.pipe';
import { PageInfoService } from '../page-info/page-info.service';
import { PageInfo } from '../entity/pageinfo.entity';
import { Page } from '../entity/page.entity';
import { validateClasses } from '../utils/validate.class';
import { PageInfoDTO } from '../dto/pageInfo.dto';

@Controller('page')
export class PagesController extends CrudController(PagesService, 'page', PageDTO, {
  // createGuard: AuthGuard('jwt'),
  // updateGuard: AuthGuard('jwt'),
  deleteGuard: AuthGuard('jwt'),
}) {
  @Inject(PageInfoService) readonly pageInfoService;

  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id): Promise<any> {
    let pageInfo: PageInfo = await this.pageInfoService.findByPageId(id);
    pageInfo.page = await this.getService().findById(id);
    if (!pageInfo) {
      const page: Page = await this.getService().findById(id);
      if (page) {
        pageInfo = new PageInfo();
        pageInfo.page = page;
      }
    }
    return pageInfo;
  }

  @Patch(':id')
  async update(@Param('id', new ParseIntPipe()) id, @Body() dto): Promise<any> {
    const validationResult = validateClasses(new PageInfoDTO(), dto);
    if (!validationResult) {
      dto.page = await this.getService().update(id, dto.page);
      if (!dto.id) {
        return this.pageInfoService.create(dto);
      } else {
        return this.pageInfoService.update(dto.id, dto);
      }
    } else {
      throw new BadRequestException({ message: validationResult }, 'bad request');
    }
  }
}
