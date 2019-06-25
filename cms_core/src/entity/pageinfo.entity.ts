import { Entity, OneToOne, JoinColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { VersionBase } from './versionbase.entity';
import { Page } from './page.entity';
import { Block } from './block.entity';

@Entity()
export class PageInfo extends VersionBase {
  @OneToOne(type => Page)
  @JoinColumn()
  page: Page;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int' })
  index: number;

  @ManyToMany(type => Block)
  @JoinTable()
  blocks: Block[];
}
