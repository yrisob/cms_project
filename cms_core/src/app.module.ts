import { Module, MulterModule } from '@nestjs/common';
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
import { PageInfoService } from './page-info/page-info.service';
import { UploaderController } from './uploader/uploader.controller';
import { MenuController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';
@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot(),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [AppController, PagesController, BlocksController, UploaderController, MenuController],
  providers: [AppService, PagesService, BlocksService, PageInfoService, MenuService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
