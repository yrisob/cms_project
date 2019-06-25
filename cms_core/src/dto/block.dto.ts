import { IsInt, IsString } from 'class-validator';

export class BlockDTO {
  @IsInt()
  id: number | undefined = undefined;

  @IsString()
  content: string | undefined = null;

  @IsString()
  imgUrl: string | undefined = null;

  @IsInt()
  index: number | undefined = null;
}
