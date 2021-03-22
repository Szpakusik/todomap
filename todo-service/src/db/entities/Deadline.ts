import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Todo from "./Todo"

@Entity()
export default class Deadline {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;

    @ManyToOne(() => Todo, todo => todo.deadlines)
    todo: Todo;
}