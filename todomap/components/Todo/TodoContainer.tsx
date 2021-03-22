import { TodoInterface } from "../../interfaces/Todo";
import TodoComponent from "./Todo";

export interface TodoContainerProps {
    todo: TodoInterface
}
 
const TodoContainer: React.SFC<TodoContainerProps> = ({ todo }) => {
    return ( <TodoComponent todo={todo} /> );
}
 
export default TodoContainer;