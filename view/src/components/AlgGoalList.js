import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Col, Form, Row} from "react-bootstrap";
import {Context} from "../index";
import ChoGoal from "./ChoiseGoal";




const AlgGoalList = observer(() => {

    const {queries} = useContext(Context)

    return (
        <Form className="mt-3" id="form">
            <Form.Group>
                <Row>
                <Form.Label className="ml-3" column sm="1.2">
                    Целевой список
                </Form.Label>
                <Col>
                    <Form.Control
                        placeholder="Введите целевой список"
                        value={queries.goal}
                        type="text"
                        onChange={e => queries.setGoal(e.target.value)}
                            />
                </Col>
                </Row>

                <ChoGoal/>

            </Form.Group>

        </Form>
    )
})




export default AlgGoalList;