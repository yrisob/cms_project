import { Entity, Column, OneToMany, TreeChildren, TreeParent, Tree } from 'typeorm';
import { VersionBase } from './versionbase.entity';

@Entity()
@Tree('closure-table')
export class Menu extends VersionBase {
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'int', nullable: true })
  pageId?: number | null;

  @TreeChildren()
  children: Menu[];

  @TreeParent()
  parent: Menu;

  constructor() {
    super();
    this.name = '';
    this.pageId = null;
    this.parent = null;
  }
}
