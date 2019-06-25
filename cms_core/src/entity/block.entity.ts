import { Entity, Column } from 'typeorm';
import { VersionBase } from './versionbase.entity';

@Entity()
export class Block extends VersionBase {
  @Column({ type: 'varchar', length: 50, unique: true, primary: true })
  name: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 250 })
  imgUrl: string;

  @Column({ type: 'int', default: 0 })
  index: number;
}
