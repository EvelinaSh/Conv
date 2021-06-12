import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Col, Form} from "react-bootstrap";
import {Context} from "../index";
import ChoGoal_query from "./ChoiseGoal _query";


const AlgBodyQuerySQL = observer(() => {
    const {queries} = useContext(Context)
    return (
        <Form className="mt-4">
            <Form.Row>
                <Form.Group as={Col}>

                    <Form.Label>Тело запроса</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={6}
                        placeholder="Введите тело запроса"
                        type="text"
                        value={queries.query}
                        onChange={e => queries.setQuery(e.target.value)}
                    />

                    <ChoGoal_query/>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Запрос на SQL</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={6}
                        type="text"
                        value={queries.querySQL}
                       // onChange={e => queries.setQuerySQL(e.target.value)}
                    />
                </Form.Group>
            </Form.Row>
        </Form>
    );
});

export default AlgBodyQuerySQL;