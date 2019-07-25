import { UserService } from './user.service';
import { CrudController } from '../crud/crud.controller';
import { UserDTO } from '../dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../entity/user.entity';
import { Get, Param, ParseIntPipe } from '@nestjs/common';

export class UserController extends CrudController(UserService, 'user', UserDTO, {
  createGuard: AuthGuard('jwt'),
  updateGuard: AuthGuard('jwt'),
  deleteGuard: AuthGuard('jwt'),
}) {
  @Get()
  async findAll(): Promise<User[]> {
    const users: User[] = await this.getService().findAll();
    for (const user of users) {
      user.password = undefined;
    }
    return users;
  }

  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id): Promise<User> {
    const user: User = await this.getService().findById(id);
    user.password = undefined;
    return user;
  }
}
