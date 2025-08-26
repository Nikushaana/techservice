import { Exclude } from 'class-transformer';
import { CompanyClientToken } from 'src/company-client-token/entities/company-client-token.entity';
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

@Entity('company_clients')
export class CompanyClient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  phone: string;

  @Column()
  companyAgentName: string;

  @Column()
  companyAgentLastName: string;

  @Column()
  companyName: string;

  @Column()
  companyIdentificationCode: string;

  @Column({ default: false })
  status: boolean;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Order, (order) => order.company)
  orders: Order[];

  @OneToOne(() => CompanyClientToken, (token) => token.companyClient)
  token: CompanyClientToken;
}
