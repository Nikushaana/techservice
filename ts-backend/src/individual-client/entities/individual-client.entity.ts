import { Exclude } from 'class-transformer';
import { IsBoolean } from 'class-validator';
import { IndividualClientToken } from 'src/individual-client-token/entities/individual-client-token.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('individual_clients')
export class IndividualClient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  phone: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ default: false })
  status: boolean;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Order, (order) => order.individual)
  orders: Order[];

  @OneToOne(() => IndividualClientToken, (token) => token.individualClient)
  token: IndividualClientToken;
}
