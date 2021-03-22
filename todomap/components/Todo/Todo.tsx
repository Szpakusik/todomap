import { TodoInterface } from "../../interfaces/Todo";
import { ArrowRightSquareFill } from "react-bootstrap-icons";
import style from "./Todo.module.scss";

export interface TodoProps {
    todo: TodoInterface;
}

const Todo: React.SFC<TodoProps> = ({ todo }) => {
    return (
        <div className={"pt-3 px-2 w-100 " + style.container}>
            
            <span className="h5 mb-0">{todo.body}</span>

            {
                todo.childrenListId && (
                <div className={"d-inline-block pt-0 float-right h6"}>
                    <ArrowRightSquareFill />
                </div>)
            }

        </div>
    );
};

export default Todo;
