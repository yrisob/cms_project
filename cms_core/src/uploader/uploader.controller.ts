import {
  Controller,
  FilesInterceptor,
  UseInterceptors,
  Post,
  HttpException,
  Param,
  UploadedFiles,
  ParseIntPipe,
  Get,
  Res,
} from '@nestjs/common';
import { diskStorage } from 'multer';

@Controller('img')
export class UploaderController {
  @Post()
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FilesInterceptor('file', 1, {
      storage: diskStorage({
        destination: './uploads',
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype.indexOf('image') > -1) {
          cb(null, true);
        } else {
          cb(new HttpException('Unexpected format: supported only image files, ', 500), false);
        }
      },
    }),
  )
  uploadImg(@Param('id', new ParseIntPipe()) id, @UploadedFiles() file) {
    return { imgUrl: `img/${file[0].path}` };
  }

  @Get(':imgpath')
  getPageImage(@Param('imgpath') imgpath, @Res() res) {
    return res.sendFile(imgpath, { root: 'uploads' });
  }
}
