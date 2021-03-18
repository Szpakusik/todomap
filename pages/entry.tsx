import { Row } from "react-bootstrap";
import Layout from "../components/Layout";
import ListExcerptContainer from "../components/ListExcerpt/ListExcerptContainer";
import { TodoListInterface } from "../interfaces/Todo";
import { dummy } from "../utils/sample-data";

const EntryPage = () => (
    <>
    <Layout>
        <Row className={"p-4 m-5"}>
            {dummy.map((el: TodoListInterface) => (
                <ListExcerptContainer id={el.id} title={el.title} todos={el.todos} />
            ))}
        </Row>
    </Layout>
    </>
);

export default EntryPage;
