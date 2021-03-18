export type TodoInterface = {
  id: number;
  body: string;
  childrenListId?: number;
  eisenhoverQuarter?: number;
  deadlines?: Deadline[];
  createdAt?: Date;
  modifiedAt?: Date;
};

type Deadline = {
  description: string;
  severity: number;
  date: Date;
};

export type TodoListInterface = {
  id: number;
  title: string;
  todos: TodoInterface[]
}