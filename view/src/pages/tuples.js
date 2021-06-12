import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TupGroupFioQuery from "../components/TupGroupFioQuery";
import TupButtons from "../components/TupButtons";
import {observer} from "mobx-react-lite";
import AlgBodyQuerySQL from "../components/AlgBodyQuerySQL";
import AlgDescType from "../components/AlgDescType";
import AlgGoalList from "../components/AlgGoalList";
import TableResult from "../components/TableResult";

const Tuples = observer(() => {

    return (
        <Container fluid style={{backgroundColor: '#E0FFFF', minHeight:'100vh', maxHeight:'100%'}}>
            <Row className="d-flex justify-content-between ml-1 mr-1">
            <Col md={10}>
                <TupGroupFioQuery/>
                <AlgDescType/>
                <AlgGoalList/>
                <AlgBodyQuerySQL/>
            </Col>
            <Col md={2}>
                <TupButtons/>
            </Col>
        </Row>
         <Row className="ml-1 mr-1 mt-3" >
            <Col>
                <TableResult/>
            </Col>
        </Row>
        </Container>
    );
});

export default Tuples;