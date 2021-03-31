import Todo from "../db/entities/Todo";
import { Express, NextFunction, Request, Response } from "express";
import { getConnection, getRepository, Repository } from "typeorm";
import { todoListControllerFactory } from "../controllers/todoList"
import { todoControllerFactory } from "../controllers/todo";

import TodoList from "../db/entities/TodoList";

const setupRoutes = async (app: Express) => {

  const todoListController = await todoListControllerFactory()
  const todoController = await todoControllerFactory()

  const connection = await getConnection();
  const todoListRepository = getRepository(TodoList);
  const todoRepository = getRepository(Todo);
  
  app.post("/todo-list", errorHandlerWrapper( async (req: Request, res: Response, next: any) => {

    const result = await todoListController.addTodoList(req)
    res.json(result);

  } ) );

  app.get("/todo-list/:listId", errorHandlerWrapper( async (req: Request, res: Response, next: NextFunction) => {

    const result = await todoListController.getTodoList(req);
    res.json(result);

  } ) );

  app.get("/todo-list/nested/:listId", errorHandlerWrapper( async (req: Request, res: Response, next: NextFunction) => {

    const result = await todoListController.getNestedList(req);
    res.json(result);

  } ) );

  app.delete("/todo-list", errorHandlerWrapper( async (req: Request, res: Response, next: NextFunction) => {

    const result = await todoListController.deleteTodoList(req)
    res.json(result);

  } ) );

  // Todo

  app.post("/todo", errorHandlerWrapper( async (req: Request, res: Response, next: NextFunction) => {

    const result = await todoController.addTodo(req)
    res.json( result );

  } ) );

  app.get("/todo/:todoId", errorHandlerWrapper( async (req: Request, res: Response, next: NextFunction) => {

    const result = await todoController.getTodo(req)
    res.json( result );

  } ) );

  app.delete("/todo", errorHandlerWrapper( async (req: Request, res: Response, next: NextFunction) => {

    const result = await todoController.deleteTodo(req);
    res.json(result);

  } ) );
};

const errorHandlerWrapper = (fn: any) => (req: Request, res: any, next: any) => 
  Promise.resolve( fn(req, res, next) ).catch( e => { 
    // if(e.toString().includes("EntityNotFound")) e = "Entity not found"
    console.log(typeof e);
    console.log(Object.keys(e));
    console.log(e.name, e.message);
    
    
    // next( e.name ? new Error(e) : new Error("Entity not found") )
    next( new Error(e.name) )
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
