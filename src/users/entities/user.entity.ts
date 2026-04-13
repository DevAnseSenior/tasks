import { nanoid } from "nanoid";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column()
    dateOfBirth!: string;

    @BeforeInsert()
    generateId() {
        this.id = `dev_${nanoid()}`;
    }
}
