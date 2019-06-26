import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class BlockDTO {
  @IsString()
  @IsNotEmpty()
  name: string | undefined = null;

  @IsString()
  content: string | undefined = null;

  imgUrl: string | undefined = null;

  @IsInt()
  index: number = null;
}
