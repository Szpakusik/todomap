export type TodoInterface = {
  id?: number;
  body: string;
  eisenhoverQuarter?: number;
  parentList?: TodoListInterface;
  childList?: TodoListInterface;
  deadLines?: Deadline[];
  createdAt?: Date;
  modifiedAt?: Date;
};

export type Deadline = {
  todoId: number;
  description: string;
  severity: number;
  date: Date;
};

export type TodoListInterface = {
  id: number;
  title: string;
  todos: TodoInterface[]
}