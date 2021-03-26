import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Todo from "./Todo";

@Entity()
export default class TodoList {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title: string;

    @OneToMany(() => Todo, todo => todo.parentList)
    todos: Todo[];

    @OneToOne(() => Todo, {
        nullable: true,
    })
    @JoinColumn()
    parentTodo!: Todo | null ;
}