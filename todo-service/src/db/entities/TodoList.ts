import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Todo from "./Todo";

@Entity()
export default class TodoList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(() => Todo, todo => todo.parentList)
    todos: Todo[];
}