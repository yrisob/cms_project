import { IsString, IsUrl, IsEmpty } from 'class-validator';

export class PageDTO {
  // @IsInt()
  // id: number | undefined = undefined;

  @IsString()
  name: string | undefined = undefined;

  @IsString()
  title: string | undefined = undefined;

  titleImgUrl: string | undefined = undefined;
}
