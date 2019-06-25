import { Entity, Column } from 'typeorm';
import { VersionBase } from './versionbase.entity';

@Entity()
export class Page extends VersionBase {
  @Column({ type: 'varchar', length: 50, primary: true, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', default: '' })
  titleImgUrl: string;
}
