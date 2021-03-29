import Todo from "../db/entities/Todo";
import { Express, NextFunction, Request, Response } from "express";
import { getConnection, getRepository, Repository } from "typeorm";

import TodoList from "../db/entities/TodoList";


const setupRoutes = async (app: Express) => {

  const connection = await getConnection();
  const todoListRepository = getRepository(TodoList);
  const todoRepository = getRepository(Todo);
  
  app.post("/todo-list", errorHandlerWrapper( async (req: Request, res: Response, next: NextFunction) => {

    const { title, todos, parentTodoId } = req.body
    if ( !title || !parentTodoId ) return next(new Error("Invalid Body!"));

    const parentTodo: Todo = await todoRepository.findOneOrFail(parentTodoId);
    const newList: TodoList = { title, todos, parentTodo };
    const result = await insertQuery(connection, TodoList, newList);

    const addedTodoList = await todoListRepository.findOne(result.identifiers[0].id);
    parentTodo.childList = <TodoList>addedTodoList;
    todoRepository.save(parentTodo)

    res.json(result);

  } ) );

  app.get("/todo-list/:listId", errorHandlerWrapper( async (req: Request, res: Response, next: NextFunction) => {

    const result = await todoListRepository.findOneOrFail(req.params.listId);
    res.json(result);

  } ) );

  app.get("/todo-list/nested/:listId", errorHandlerWrapper( async (req: Request, res: Response, next: NextFunction) => {

    const result = await todoListRepository.findOneOrFail({
      where: { id: req.params.listId },
      relations: ["todos", "todos.childList", "todos.childList.todos"],
    });
    res.json(result);

  } ) );

  app.delete("/todo-list", errorHandlerWrapper( async (req: Request, res: Response, next: NextFunction) => {

    if (!req.body.todoListId) return next(new Error("Invalid Body!"));

    const todoList = await todoListRepository.findOneOrFail(req.body.todoListId);
    const result = await todoListRepository.remove(todoList);

    res.json(result);

  } ) );

  // Todo

  app.post("/todo", errorHandlerWrapper( async (req: Request, res: Response, next: NextFunction) => {

    if (!req.body.body || !req.body.parentListId) return next( new Error("Invalid Body!") );

    const list = await todoListRepository.findOneOrFail( req.body.parentListId );
    const newTodo = {
      body: req.body.body,
      parentList: list,
    };

    const result = await insertQuery( connection, Todo, newTodo );
    res.json( result );

  } ) );

  app.get("/todo/:todoId", errorHandlerWrapper( async (req: Request, res: Response, next: NextFunction) => {

    const result = await todoRepository.findOneOrFail( req.params.todoId );
    res.json( result );

  } ) );

  app.delete("/todo", errorHandlerWrapper( async (req: Request, res: Response, next: NextFunction) => {

    const todo = await todoRepository.findOneOrFail( req.body.todoId );
    const result = await todoRepository.remove( todo ) ;
    res.json(result);

  } ) );
};

const errorHandlerWrapper = (fn: any) => (req: Request, res: any, next: any) => 
  Promise.resolve( fn(req, res, next) ).catch( e => { 
    next( e.name ? new Error(e.name) : e )
  } );

const insertQuery = async ( connection: any, repository: any, values: any ) => {
  return await connection
      .createQueryBuilder()
      .insert()
      .into(TodoList)
      .values(values)
      .execute();
}

export default setupRoutes;
