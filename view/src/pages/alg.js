import React from 'react';
import {Container, Col, Row} from "react-bootstrap";
import AlgButtons from "../components/AlgButtons";
import AlgGroupFioQuery from "../components/AlgGroupFioQuery";
import AlgDescType from "../components/AlgDescType";
import AlgGoalList from "../components/AlgGoalList";
import AlgBodyQuerySQL from "../components/AlgBodyQuerySQL";
import TableResult from "../components/TableResult";

const Alg = () => {

    return (
        <Container fluid style={{backgroundColor: '#FFE4B5', minHeight:'100vh', maxHeight:'100%'}}>
            <Row className="d-flex justify-content-between ml-1 mr-1">
                <Col md={10}>
                <AlgGroupFioQuery/>
                <AlgDescType/>
                <AlgGoalList/>
                <AlgBodyQuerySQL/>
            </Col>
            <Col md={2}>
                <AlgButtons/>
            </Col>
            </Row>
            <Row className="ml-1 mr-1 mt-3" >
                <Col>
                <TableResult/>
                </Col>
            </Row>
            </Container>
    )
};


export default Alg;