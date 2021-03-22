import { TodoInterface } from "../../interfaces/Todo";
import List from "./List";

export interface ListContainerProps {
    title: string;
    todos: TodoInterface[] | any[] // dev purposes
    setElapsed: Function
}

const ListContainer: React.SFC<ListContainerProps> = ( {title, todos, setElapsed} ) => {
    return ( <List title={title} todos={todos} setElapsed={setElapsed} ></List> );
}
 
export default ListContainer;