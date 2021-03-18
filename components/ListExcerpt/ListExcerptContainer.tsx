import { TodoInterface } from "../../interfaces/Todo";
import ListExcerpt from "./ListExcerpt";

export interface ListExcerptContainerProps {
    id: number;
    title: string;
    todos: TodoInterface[] | any[] // dev purposes
}

const ListExcerptContainer: React.SFC<ListExcerptContainerProps> = ({ title, todos, id }) => {
    return ( <ListExcerpt title={title} todos={todos} id={id}></ListExcerpt> );
}
 
export default ListExcerptContainer;