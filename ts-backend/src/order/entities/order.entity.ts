import { Exclude } from 'class-transformer';
import { Category } from 'src/category/entities/category.entity';
import { OrderStatus } from 'src/common/types/order-status.enum';
import { CompanyClient } from 'src/company-client/entities/company-client.entity';
import { IndividualClient } from 'src/individual-client/entities/individual-client.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
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

  @Column()
  address: string;

  @ManyToOne(() => CompanyClient, (company) => company.orders, { nullable: true })
  company: CompanyClient;

  @ManyToOne(() => IndividualClient, (individual) => individual.orders, { nullable: true })
  individual: IndividualClient;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
