import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Deadline from "./Deadline";
import TodoList from "./TodoList"

@Entity()
export default class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;

    @Column({
        nullable: true
    })
    eisenhoverQuarter: number;

    @ManyToOne(() => TodoList, todoList => todoList.todos)
    parentList: TodoList;

    @OneToOne(() => TodoList, {
        nullable: true,
        onDelete: "CASCADE"
    })
    @JoinColumn()
    childList!: TodoList;

    @OneToMany(() => Deadline, deadline => deadline.todo, {
        nullable: true
    })
    deadlines: Deadline[];

    @CreateDateColumn()
    createdAt: string;

    @CreateDateColumn()
    modifiedAt: string;
} 