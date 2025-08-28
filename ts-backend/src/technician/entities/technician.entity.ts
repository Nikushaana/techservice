import { Exclude, Expose } from 'class-transformer';
import { Order } from 'src/order/entities/order.entity';
import { TechnicianToken } from 'src/technician-token/entities/technician-token.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('technicians')
export class Technician {
    @PrimaryGeneratedColumn()
    id: number;

    @Expose({ groups: ['admin'] })
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

    @OneToMany(() => Order, (order) => order.technician)
    orders: Order[];

    @OneToOne(() => TechnicianToken, (token) => token.technician)
    token: TechnicianToken;
}
