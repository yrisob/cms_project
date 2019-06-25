import { Controller } from '@nestjs/common';
import { CrudController } from '../crud/crud.controller';
import { PagesService } from './pages.service';
import { PageDTO } from '../dto/page.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('pages')
export class PagesController extends CrudController(PagesService, 'page', PageDTO, {
  createGuard: AuthGuard('jwt'),
  updateGuard: AuthGuard('jwt'),
  deleteGuard: AuthGuard('jwt'),
}) {}
