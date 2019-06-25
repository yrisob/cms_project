import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { PagesService } from './pages/pages.service';
import { BlocksController } from './blocks/blocks.controller';
import { PagesController } from './pages/pages.controller';
import { BlocksService } from './blocks/blocks.service';

@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forRoot()],
  controllers: [AppController, PagesController, BlocksController],
  providers: [AppService, PagesService, BlocksService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
