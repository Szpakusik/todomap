import { Response, Request } from "express";
import { getConnection, getRepository } from "typeorm";
import Todo from "../db/entities/Todo";
import TodoList from "../db/entities/TodoList";

export const todoControllerFactory = async () => {
        const connection = await getConnection();
        const todoListRepository = getRepository(TodoList);
        const todoRepository = getRepository(Todo);
        
        let todoController = {
        
            addTodo: async(req: Request) => {
                const list = await todoListRepository.findOneOrFail( req.body.parentListId );
                const newTodo = {
                  body: req.body.body,
                  parentList: list,
                };
            
                const result = await insertQuery( Todo, newTodo, connection );
                return result;
            },
            
            getTodo: async(req: Request) => {
                const result = await todoRepository.findOneOrFail( req.params.todoId );
                return result;
            },

            deleteTodo: async(req: Request) => {
                const todo = await todoRepository.findOneOrFail( req.body.todoId );
                const result = await todoRepository.remove( todo ) ;
                return result;
            }
        }

        return todoController
}
const insertQuery = async ( repository: any, values: any, connection:any ) => {

    return await connection
        .createQueryBuilder()
        .insert()
        .into(Todo)
        .values(values)
        .execute();
  }
  