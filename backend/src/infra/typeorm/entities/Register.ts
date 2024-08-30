import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity("registers")
export class Register {
    @PrimaryColumn()
    id: string;

    @Column()
    isIncoming: boolean

    @Column()
    value: number;

    @Column()
    description: string;

    @CreateDateColumn()
    date: Date;

    constructor() {
        if (!this.id)
            this.id = uuidv4();
    }
}