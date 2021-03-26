import { Row } from "react-bootstrap";
import Layout from "../components/Layout";
import ListExcerptContainer from "../components/ListExcerpt/ListExcerptContainer";
import { TodoInterface, TodoListInterface } from "../interfaces/Todo";
import axios from "axios";
import { useEffect, useState } from "react";

const url = process.env.NEXT_PUBLIC_CLIENT_URL;
const EntryPage = () => {
    const [rootLists, setRootLists] = useState<TodoListInterface[]>([]);

    useEffect(() => {
        axios
        .get(url+"/todo-list/nested/1")
        .then(({ data }):void => {
            setRootLists( data[0].todos.map( ( rootTodo:TodoInterface ) => rootTodo.childList ) )
        })
        .catch((err) => console.log("Request failed!"));
    }, [])
    

    return (
        <>
            <Layout>
                <Row className={"p-4 m-5"}>
                    {rootLists.map((el: TodoListInterface) => (
                        <ListExcerptContainer
                            id={el.id}
                            key={el.id}
                            title={el.title}
                            todos={el.todos}
                        />
                    ))}
                </Row>
            </Layout>
        </>
    );
};

export default EntryPage;
