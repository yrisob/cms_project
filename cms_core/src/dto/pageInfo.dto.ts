import { IsString, IsInt } from 'class-validator';

export class PageInfoDTO {
  @IsString()
  content: string | undefined;

  @IsInt()
  index: number | undefined;
}
