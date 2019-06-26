import { Entity, Column } from 'typeorm';
import { VersionBase } from './versionbase.entity';

@Entity()
export class Block extends VersionBase {
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  imgUrl: string;

  @Column({ type: 'int', default: 0 })
  index: number;

  constructor() {
    super();
    this.name = '';
    this.content = '';
    this.imgUrl = '';
    this.index = 0;
  }
}
