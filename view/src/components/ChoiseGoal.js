import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Col, Form, Row, Table} from "react-bootstrap";
import {Context} from "../index";
import {getField} from "../http/convAPI";

let Fields = [[],[],[],[],[],[],[],[],[],[],[],[],[]]

let u = []
let e
const ChoGoal = observer(() => {
    const {queries} = useContext(Context)
    let cho = null
    if (queries.nameTablesMarks !== null) {

        let NamesTables = []
        let Marks = []

    for (let i=0; i<queries.nameTablesMarks.length; i++)
        if (i % 2 === 0) NamesTables.push(queries.nameTablesMarks[i])
        else Marks.push(queries.nameTablesMarks[i])


    for (let i=0; i<NamesTables.length; i++) {
        console.log(Fields)
        getField({table: NamesTables[i]}).then(data => {
            Fields[i]=Object.keys(data)
        })
    }


    if (Fields.length > 0) {
        cho = (
            <Row>
                <Col sx={1}></Col>
                {NamesTables.map((fi, i) => (
                    <Col md={2}>
                        <Form.Control
                            as="select"
                            size="sm"
                            value={queries.selectedFis[i]}
                            onChange={(e) => {
                                if (queries.goal === '')
                                    queries.setGoal(e.target.value)
                                else queries.setGoal(queries.goal + ', ' + e.target.value)
                            }}
                        >
                            {u = Fields[i]}
                            {
                                e = Array.prototype.slice.call(u)
                            }
                            <option>{Marks[i]}</option>
                            {e.map(f =>
                                <option>
                                        {Marks[i] + '.' + f}
                                </option>
                            )
                            }
                        </Form.Control>
                    </Col>
                ))}
            </Row>
        )
    }
    }
    return cho
});

export default ChoGoal;