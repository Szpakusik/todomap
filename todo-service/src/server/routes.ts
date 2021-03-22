import Todo from "../db/entities/Todo";
import { Express } from "express";
import { getConnection, getRepository } from "typeorm";

import TodoList from "../db/entities/TodoList";

const setupRoutes = (app: Express) => {
  const connection = getConnection();
  const todoListRepository = getRepository(Todo);

  app.post("/todo-list", async (req, res, next) => {
    if (!req.body.title) {
      return next(new Error("Invalid Body!"));
    }
    try {
      const newList = {
        title: req.body.title,
        todos: req.body.todos,
      };

      await connection
        .createQueryBuilder()
        .insert()
        .into(TodoList)
        .values([newList])
        .execute();
      return res.json(newList);
    } catch (e) {
        return next(e);
    }
  });

  app.get("/todo-list/:listId", async (req, res, next) => {
    const todoList = await todoListRepository.findOne(Number(req.params.listId));
    if(!todoList) return next( new Error("Invalid list ID!") )

    res.json(todoList)
  })

  app.post("/todo", async (req, res, next) => {
    if (!req.body.body || !req.body.parentList) {
      return next(new Error("Invalid Body!"));
    }
    try {
      const list = await todoListRepository.findOne({
        id: req.body.parentList,
      });

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
      return res.json(newTodo);
    } catch (e) {
      return next(e);
    }
  });

};

export default setupRoutes;
