import { User } from "../interfaces";
import { TodoListInterface } from "../interfaces/Todo";

/** Dummy user data. */
export const sampleUserData: User[] = [
    { id: 101, name: "Alice" },
    { id: 102, name: "Bob" },
    { id: 103, name: "Caroline" },
    { id: 104, name: "Dave" },
];

export const dummy: TodoListInterface[] = [
    {
        id: 0,
        title: "Life",
        todos: [
            { id: 1, body: "Brain, do something!" },
            { id: 2, body: "Another Todo", childrenListId: 4 },
            { id: 3, body: "Buy some milk" },
            { id: 4, body: "Brain, do something!" },
            { id: 5, body: "Brain, do something!" },
            { id: 6, body: "Brain, do something!" },
            { id: 7, body: "Brain, do something!" },
            { id: 8, body: "Brain, do something!" },
        ],
    },
    {
        id: 1,
        title: "Work",
        todos: [
            { id: 1, body: "Brain, do something!" },
            { id: 4, body: "Brain, do something!" },
            { id: 3, body: "Buy some milk" },
            { id: 5, body: "Brain, do something!" },
            { id: 6, body: "Brain, do something!" },
            { id: 7, body: "Brain, do something!" },
            { id: 8, body: "Brain, do something!" },
            { id: 2, body: "Another Todo" },
        ],
    },
    {
        id: 2,
        title: "Home",
        todos: [
            { id: 1, body: "Brain, do something!" },
            { id: 6, body: "Brain, do something!" },
            { id: 3, body: "Buy some milk" },
            { id: 5, body: "Brain, do something!" },
            { id: 4, body: "Brain, do something!" },
            { id: 7, body: "Brain, do something!" },
            { id: 2, body: "Another Todo" },
            { id: 8, body: "Brain, do something!" },
        ],
    },
    {
        id: 3,
        title: "ToDoMap App",
        todos: [
            { id: 1, body: "Sub-List view" },
            { id: 2, body: "Sub-List view" },
        ],
    },
    {
        id: 4,
        title: "Another Todo Sublist",
        todos: [
            { id: 1, body: "Sub-List view" },
            { id: 5, body: "Brain, do something!" },
            { id: 3, body: "Buy some milk" },
            { id: 7, body: "Brain, do something!" },
            { id: 2, body: "Another Todo" },
        ],
    },
];
