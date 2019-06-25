import { Entity, Column } from 'typeorm';
import { VersionBase } from './versionbase.entity';

@Entity()
export class Page extends VersionBase {
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  titleImgUrl: string | undefined;

  constructor() {
    super();
    this.name = '';
    this.title = '';
    this.titleImgUrl = '';
  }
}
