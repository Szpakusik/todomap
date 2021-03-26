import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import ListContainer from "../../components/List/ListContainer"
import { useRouter } from 'next/router'
import axios from "axios"
import { TodoListInterface } from "../../interfaces/Todo";

const DoubleViewPage = () => {

    const router = useRouter()
    const { pid } = router.query
    
    const [list, setList] = useState<TodoListInterface | null>(null);
    
    const [elapsed, setElapsed] = useState(-1)
    const [elapsedList, setElapsedList] = useState<TodoListInterface | null>(null);
    
    const url = process.env.NEXT_PUBLIC_CLIENT_URL;

    const getElapsed = async (rightHandList) => {
        await axios
        .get(url+"/todo-list/nested/"+rightHandList)
        .then(({ data }):void => {
            setElapsedList( data[0] )
        })
        .catch((err) => console.log("Request failed!"));
    }

    useEffect(() => {


        axios
        .get(url+"/todo-list/nested/"+pid)
        .then(({ data }):void => {
            setList( data[0] )
        })
        .catch((err) => console.log("Request failed!"));

        elapsed>-1 && axios
        .get(url+"/todo-list/nested/"+elapsed)
        .then(({ data }):void => {
            setElapsedList( data[0] )
        })
        .catch((err) => console.log("Request failed!"));

    }, [])
    console.log(elapsedList);
    
    return pid ? <>
        <Layout title="About | Next.js + TypeScript Example">
        <Row className={"p-4 m-5"}>
            <Col className="col-md-6">
                {list && <ListContainer 
                    setElapsed={getElapsed} 
                    title={list.title} 
                    todos={list.todos} />}
            </Col>
            <Col className="col-md-6">
                { elapsedList && <ListContainer 
                    setElapsed={setElapsed} 
                    title={elapsedList.title} 
                    todos={elapsedList.todos} /> }
            </Col>
        </Row>
        </Layout>
    </> : null
};

export default DoubleViewPage;