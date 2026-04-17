import { nanoid } from "nanoid";
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Task } from "../../tasks/entities/task.entity";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

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

    @Column({
        type: 'simple-enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role!: UserRole;

    @Column({ default: true })
    isActive!: boolean

    @CreateDateColumn()
    createAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Task, (task) => task.user)
    tasks!: Task[];

    @BeforeInsert()
    generateId() {
        this.id = `user_${nanoid()}`;
    }
}
