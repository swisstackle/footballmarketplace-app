import { Entity, PrimaryColumn, Column } from 'typeorm';
@Entity()
export class Service {
  @PrimaryColumn()
  name: string;
  @Column()
  description: string;
  @Column()
  isapproved: boolean;
  @Column()
  address: string;
}
