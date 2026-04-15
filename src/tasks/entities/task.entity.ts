import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { nanoid } from "nanoid";

@Entity('tasks')
export class Task {
    @PrimaryColumn()
    id!: string;

    @Column()
    title!: string

    @Column({ nullable: true })
    description!: string

    @Column({ default: false })
    completed!: boolean;

    @Column({ nullable: false })
    dueDate!: string;

    @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE'})
    user!: User;

    @Column()
    userId!: string;

    @CreateDateColumn()
    createAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @BeforeInsert()
    generateId() {
        this.id = `task_${nanoid()}`
    }
}