import { Entity, Column } from 'typeorm';
import { VersionBase } from './versionbase.entity';

@Entity()
export class Menu extends VersionBase {
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'int' })
  pageId: number;
}
