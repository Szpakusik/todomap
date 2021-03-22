import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Deadline from "./Deadline";
import TodoList from "./TodoList"

@Entity()
export default class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;

    @Column()
    eisenhoverQuarter: number;

    @ManyToOne(() => TodoList, todoList => todoList.todos)
    parentList: TodoList;

    @OneToOne(() => TodoList)
    @JoinColumn()
    childList: TodoList;

    @OneToMany(() => Deadline, deadline => deadline.todo)
    deadlines: Deadline[];

    @CreateDateColumn()
    createdAt: string;

    @CreateDateColumn()
    modifiedAt: string;
} 