import { IsString, IsInt } from 'class-validator';

export class PageDTO {
  // @IsInt()
  // id: number | undefined = undefined;

  @IsString()
  name: string | undefined = undefined;

  @IsString()
  title: string | undefined = undefined;

  @IsString()
  titleImgUrl: string | undefined = undefined;
}
