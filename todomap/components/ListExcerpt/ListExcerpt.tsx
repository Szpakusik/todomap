import { Card, Col } from "react-bootstrap";
import TodoContainer from "../Todo/TodoContainer";
import styles from "./ListExcerpt.module.scss";
import Link from "next/link";

export interface ListExcerptProps {
  title: string
  todos: any[];
  id: number;
}
{/* <a className="d-inline"></a> */}
const ListExcerpt: React.SFC<ListExcerptProps> = ({ title, todos, id }) => {
  return (
    <Col className={"col-md-3 p-4"}>
      <Card className={styles.card+" px-4 overflow-hidden"}>
        <Link href={ `/double-view/`+id } key={ id }>
          <a className="d-inline">
            <p className="h3 mb-1 text-dark text-center pt-3 font-weight-bold">{title}</p>
                
            {todos.map(( todo ) => {
                return <TodoContainer todo={todo} key={todo.id}/>
            })}

            <div className={"pt-3 px-2 w-100 text-dark text-center font-weight-bold"}>
                <span className="h5 mb-0">...</span>
            </div> 
          </a>
        </Link>
      </Card>
    </Col>
  );
};

export default ListExcerpt;
