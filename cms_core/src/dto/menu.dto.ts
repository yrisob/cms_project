import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class MenuDTO {
  @IsString()
  name: string | undefined = undefined;

  @IsNumber()
  orderNumber: number | null = null;

  pageId?: number | null = null;

  parentId?: number | null = null;
}
