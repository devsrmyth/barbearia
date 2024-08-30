import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Customer } from './Customer';

@Entity("services")
export class Service {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => Customer)
    @JoinColumn({ name: "customer_id" })
    customer: Customer;

    @Column("text", { array: true })
    type: string[];

    @Column()
    value: number;

    @Column()
    description: string;

    @Column("text", { array: true })
    payment: string[];

    @CreateDateColumn()
    date: Date;

    constructor() {
        if (!this.id)
            this.id = uuidv4();
    }
}