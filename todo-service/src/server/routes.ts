import Todo from "../db/entities/Todo";
import { Express } from "express";
import { getConnection, getRepository } from "typeorm";

import TodoList from "../db/entities/TodoList";

const setupRoutes = (app: Express) => {
  const connection = getConnection();
  const todoListRepository = getRepository(TodoList);
  const todoRepository = getRepository(Todo);

  app.post("/todo-list", async (req, res, next) => {
    if (!req.body.title) return next(new Error("Invalid Body!"));
    try {
      let parentTodo = await todoRepository.findOne(req.body.parentTodoId);
      if (!parentTodo) return next(new Error("Wrong parent Todo Id!"));

      const newList: TodoList = {
        title: req.body.title,
        todos: req.body.todos,
        parentTodo: parentTodo,
      };

      const result = await connection
        .createQueryBuilder()
        .insert()
        .into(TodoList)
        .values([newList])
        .execute();

      const addedTodoList = await todoListRepository.findOne(
        result.identifiers[0].id
      );

      parentTodo.childList = <TodoList>addedTodoList;
      todoRepository.save(parentTodo)

      res.json(newList);
    } catch (e) {
      return next(e);
    }
  });

  app.get("/todo-list/:listId", async (req, res, next) => {
    try {

      const todoList = await todoListRepository.findOne(req.params.listId);
      if (!todoList) return next(new Error("Invalid list ID!"));
      res.json(todoList);

    } catch (e) {
      return next(e);
    }
  });

  app.get("/todo-list/nested/:listId", async (req, res, next) => {
    try {

      const todoList = await todoListRepository.find({
        where: { id: req.params.listId },
        relations: ["todos", "todos.childList", "todos.childList.todos"],
      });
      if (!todoList) return next(new Error("Invalid list ID!"));
      res.json(todoList);

    } catch (e) {
      return next(e);
    }
  });

  app.delete("/todo-list", async (req, res, next) => {
    if (!req.body.todoListId) {
      return next(new Error("Invalid Body!"));
    }
    try {
      
      const todoList = await todoListRepository.findOne(req.body.todoListId);
      if (!todoList) return next(new Error("Invalid todo list ID!"));

      const result = await todoListRepository.remove(todoList);
      res.json(result);

    } catch (e) {
      return next(e);
    }
  });

  // Todo

  app.post("/todo", async (req, res, next) => {
    if (!req.body.body || !req.body.parentListId) {
      return next(new Error("Invalid Body!"));
    }
    try {
      const list = await todoListRepository.findOne(req.body.parentListId);
      if (!list) return next(new Error("Parent List not found!"));

      const newTodo = {
        body: req.body.body,
        parentList: list,
      };

      await connection
        .createQueryBuilder()
        .insert()
        .into(Todo)
        .values([newTodo])
        .execute();

      res.json(newTodo);
    } catch (e) {
      return next(e);
    }
  });

  app.get("/todo/:todoId", async (req, res, next) => {
    try{

      const todo = await todoRepository.findOne(req.params.todoId);
      if (!todo) return next(new Error("Invalid todo ID!"));
      res.json(todo);

    } catch (e) {
      return next(e);
    }
  });

  app.delete("/todo", async (req, res, next) => {
    try{

      const todo = await todoRepository.findOne(req.body.todoId);
      if (!todo) return next(new Error("Invalid todo list ID!"));

      const result = await todoRepository.remove(todo);
      res.json(result);

    } catch (e) {
      return next(e);
    }
  });
};

export default setupRoutes;
