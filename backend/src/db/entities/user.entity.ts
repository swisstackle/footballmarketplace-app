import { Entity, PrimaryColumn, Column } from 'typeorm';
@Entity()
export class User {
  @PrimaryColumn()
  address: string;
  @Column()
  name: string;
  @Column()
  password: string;
  @Column()
  iscoach: boolean;
}
