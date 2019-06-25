import { IsString, IsInt } from 'class-validator';

export class PageDTO {
  @IsInt()
  id: number | undefined = undefined;

  @IsString()
  name: string | undefined = null;

  @IsString()
  title: string | undefined = null;

  @IsString()
  titleImgUrl: string | undefined = null;
}
