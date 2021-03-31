import { Response, Request } from "express";
import { getConnection, getRepository } from "typeorm";
import Todo from "../db/entities/Todo";
import TodoList from "../db/entities/TodoList";

export const todoListControllerFactory = async () => {
        const connection = await getConnection();
        const todoListRepository = getRepository(TodoList);
        const todoRepository = getRepository(Todo);
        
        let todoListController = {
        
            addTodoList: async(req: Request) => {
            
                const { title, todos, parentTodoId } = req.body
            
                const parentTodo: Todo = await todoRepository.findOneOrFail(parentTodoId);
                const newList: TodoList = { title, todos, parentTodo };
                const result = await insertQuery(TodoList, newList, connection);
            
                const addedTodoList = await todoListRepository.findOne(result.identifiers[0].id);
                parentTodo.childList = <TodoList>addedTodoList;
                todoRepository.save(parentTodo)
            
                return result;
            },
            
            getTodoList: async(req: Request) => {
                const result = await todoListRepository.findOneOrFail(req.params.listId);
                return result;
            },

            getNestedList: async(req: Request) => {
                const result = await todoListRepository.findOneOrFail({
                    where: { id: req.params.listId },
                    relations: ["todos", "todos.childList", "todos.childList.todos"],
                });
                return result;
            },

            deleteTodoList: async(req: Request) => {
                const todoList = await todoListRepository.findOneOrFail(req.body.todoListId);
                const result = await todoListRepository.remove(todoList);
                return result;
            }
        }

        return todoListController
}
const insertQuery = async ( repository: any, values: any, connection:any ) => {

    return await connection
        .createQueryBuilder()
        .insert()
        .into(TodoList)
        .values(values)
        .execute();
  }
  