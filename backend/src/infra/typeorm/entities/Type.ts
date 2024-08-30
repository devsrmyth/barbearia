import { Entity, PrimaryColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity("types")
export class Type {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    constructor() {
        if (!this.id)
            this.id = uuidv4();
    }
}