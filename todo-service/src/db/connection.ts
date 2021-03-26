import { Connection, createConnection } from "typeorm"
import Deadline from "./entities/Deadline";
import Todo from "./entities/Todo";
import TodoList from "./entities/TodoList";

let connection: Connection;

export const initConnection = async (drop: boolean = true) => {
    connection = await createConnection({
        name: "default",
        type: "postgres",
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [ TodoList, Todo, Deadline ]
    })
}