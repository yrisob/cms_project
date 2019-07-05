import { IsString, IsInt, ValidateNested } from 'class-validator';
import { Page } from '../entity/page.entity';

export class PageInfoDTO {
  @ValidateNested()
  page: Page = undefined;

  @IsString()
  content: string | undefined = undefined;

  @IsInt()
  index: number | undefined = undefined;
}
