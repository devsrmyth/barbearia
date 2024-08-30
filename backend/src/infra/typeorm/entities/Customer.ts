import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity("customers")
export class Customer {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @CreateDateColumn()
    birth: Date;

    constructor() {
        if (!this.id)
            this.id = uuidv4();
    }
}