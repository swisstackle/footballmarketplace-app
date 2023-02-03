import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Servicebought {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  servicename: string;
  @Column()
  buyeraddress: string;
}
