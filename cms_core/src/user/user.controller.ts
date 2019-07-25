import { UserService } from './user.service';
import { CrudController } from '../crud/crud.controller';
import { UserDTO } from '../dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

export class UserController extends CrudController(UserService, 'user', UserDTO, {
  createGuard: AuthGuard('jwt'),
  updateGuard: AuthGuard('jwt'),
  deleteGuard: AuthGuard('jwt'),
}) {}
