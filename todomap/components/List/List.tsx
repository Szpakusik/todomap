import { Card, Col } from "react-bootstrap";
import { TodoInterface } from "../../interfaces/Todo";
import TodoContainer from "../Todo/TodoContainer";
import styles from "./List.module.scss";

export interface ListProps {
  title: string;
  todos: TodoInterface[];
  setElapsed: Function;
}

const List: React.SFC<ListProps> = ({ title, todos, setElapsed }) => {

  const handleClick = async (id: number | undefined) => {
    if( !id ) return
    await setElapsed(id)
  }

  return (
    <Col className={"col-md-12 p-4"}>
      <Card className={styles.card+" px-4"}>
        <p className="h3 mb-1 text-dark text-center pt-3 font-weight-bold">{title}</p>
            
        {todos.map(( todo: TodoInterface ) => {
            return <div onClick={ () => handleClick(todo.childList?.id) } key={todo.id} >
              <TodoContainer todo={todo}/>
            </div>
        })}

        <div className={"pt-3 px-2 w-100 text-dark text-center font-weight-bold"}>
            <span className="h5 mb-0">...</span>
        </div> 

      </Card>
    </Col>
  );
};

export default List;
