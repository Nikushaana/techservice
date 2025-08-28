import { Address } from 'src/address/entities/address.entity';
import { Category } from 'src/category/entities/category.entity';
import { OrderStatus } from 'src/common/types/order-status.enum';
import { CompanyClient } from 'src/company-client/entities/company-client.entity';
import { IndividualClient } from 'src/individual-client/entities/individual-client.entity';
import { Technician } from 'src/technician/entities/technician.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, (category) => category.orders, { eager: true })
  category: Category;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  description: string;

  @ManyToOne(() => Address, (address) => address.orders, { eager: true })
  address: Address;

  @ManyToOne(() => CompanyClient, (company) => company.orders, { nullable: true })
  company: CompanyClient;

  @ManyToOne(() => IndividualClient, (individual) => individual.orders, { nullable: true })
  individual: IndividualClient;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: string;

  @ManyToOne(() => Technician, (technician) => technician.orders, { nullable: true })
  technician: Technician | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
