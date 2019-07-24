import {
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  BadRequestException,
  Patch,
  NotFoundException,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from '../models/interfaces/iuser.interface';
import { CrudController } from '../crud/crud.controller';
import { UserDTO } from '../dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController extends CrudController(UserService, 'user', UserDTO, {
  createGuard: AuthGuard('jwt'),
  updateGuard: AuthGuard('jwt'),
  deleteGuard: AuthGuard('jwt'),
}) {}
//   constructor(private readonly userService: UserService) {}

//   @Get()
//   async findAll() {
//     return this.userService.findAll();
//   }

//   @Get(':id')
//   async findByID(@Param('id', new ParseIntPipe()) id: number) {
//     return this.userService.findById(id);
//   }

//   @Post()
//   @UsePipes(new ValidationPipe({ transform: true }))
//   async create(@Body() userInfo: IUser) {
//     try {
//       return this.userService.create(userInfo);
//     } catch (error) {
//       throw new BadRequestException('User create faild');
//     }
//   }

//   @Patch(':id')
//   @UsePipes(new ValidationPipe({ transform: true }))
//   async update(@Param('id', new ParseIntPipe()) id: number, @Body() updatedData: IUser) {
//     try {
//       return this.userService.update(id, updatedData);
//     } catch (err) {
//       throw new NotFoundException(`User with id=${id} not found`);
//     }
//   }

//   @Delete(':id')
//   async delete(@Param('id', new ParseIntPipe()) id: number) {
//     return this.userService.delete(id);
//   }
// }
