import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CrudController } from '../crud/crud.controller';
import { MenuService } from './menu.service';
import { MenuDTO } from '../dto/menu.dto';
import { Menu } from '../entity/menu.entity';

@Controller('menu')
export class MenuController extends CrudController(MenuService, 'menu', MenuDTO) {}
