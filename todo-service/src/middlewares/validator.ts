import { Request, Express, Response, NextFunction } from "express";
import { validationResult, body, param, check, oneOf } from "express-validator";

const bodyValidator = body;

const setupValidator = (app: Express) => {
  app.post(
    "/todo-list",
    check("title", "Invalid title!").isString().not().isEmpty().trim().escape(),
    check("parentTodoId", "Invalid parentTodoId!").isNumeric().notEmpty(),
    (req: Request, res, next) => checkValidation(req, res, next)
  );

  app.get(
    "/todo-list/:listId",
    check("listId", "Invalid listId!").isNumeric(),
    (req: Request, res, next) => checkValidation(req, res, next)
  );

  app.get(
    "/todo-list/nested/:listId",
    check("listId", "Invalid listId!").isNumeric(),
    (req: Request, res, next) => checkValidation(req, res, next)
  );

  app.delete(
    "/todo-list",
    check("todoListId", "Invalid todoListId!").isNumeric().notEmpty(),
    (req: Request, res, next) => checkValidation(req, res, next)
  );

  app.post(
    "/todo",
    check("body", "Invalid todo body!").isString().trim().escape().notEmpty(),
    check("parentListId", "Invalid parentListId!").isNumeric().notEmpty(),
    (req: Request, res, next) => checkValidation(req, res, next)
  );

  app.get(
    "/todo/:todoId",
    check("todoId", "Invalid todoId!").isNumeric(),
    (req: Request, res, next) => checkValidation(req, res, next)
  );

  app.delete(
    "/todo",
    check("todoId", "Invalid todoId!").isNumeric(),
    (req: Request, res, next) => checkValidation(req, res, next)
  );
};

const checkValidation = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    validationResult(req).throw();
    next();
  } catch (e) {
    next(new Error(e.errors[0].msg));
  }
};

export default setupValidator;
