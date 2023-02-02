import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  name: string;
  @Column()
  description: string;
  @Column()
  isapproved: boolean;
}
