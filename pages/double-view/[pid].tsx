import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import ListContainer from "../../components/List/ListContainer"
import { dummy } from "../../utils/sample-data";
import { useRouter } from 'next/router'

const DoubleViewPage = () => {

    const router = useRouter()
    const { pid } = router.query
    console.log(pid)
    
    const [elapsed, setElapsed] = useState(-1)
    
    return pid ? <>
        <Layout title="About | Next.js + TypeScript Example">
        <Row className={"p-4 m-5"}>
            <Col className="col-md-6">
                <ListContainer 
                    setElapsed={setElapsed} 
                    title={dummy[Number(pid)].title} 
                    todos={dummy[Number(pid)].todos} />
            </Col>
            <Col className="col-md-6">
                { elapsed > -1 && <ListContainer 
                    setElapsed={setElapsed} 
                    title={dummy[elapsed].title} 
                    todos={dummy[elapsed].todos} /> }
            </Col>
        </Row>
        </Layout>
    </> : null
};

export default DoubleViewPage;