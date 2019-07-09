import { IsString } from 'class-validator';

export class MenuDTO {
  @IsString()
  name: string | undefined = undefined;

  pageId?: number | null = null;

  parentId?: number | null = null;
}
