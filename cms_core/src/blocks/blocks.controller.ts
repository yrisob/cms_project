import { Controller } from '@nestjs/common';
import { CrudController } from '../crud/crud.controller';
import { BlocksService } from './blocks.service';
import { BlockDTO } from '../dto/block.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('block')
export class BlocksController extends CrudController(BlocksService, 'block', BlockDTO, {
  // createGuard: AuthGuard('jwt'),
  // updateGuard: AuthGuard('jwt'),
  deleteGuard: AuthGuard('jwt'),
}) {}
