import { nanoid } from "nanoid";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Task } from "../../tasks/entities/task.entity";

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

    @OneToMany(() => Task, (task) => task.user)
    tasks!: Task[];

    @BeforeInsert()
    generateId() {
        this.id = `user_${nanoid()}`;
    }
}
