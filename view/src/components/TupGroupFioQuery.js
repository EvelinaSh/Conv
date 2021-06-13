import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Col, Dropdown, Form, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom"
import {Context} from "../index";
import {getAlg, getAlgUser, getTup, getTupUser} from "../http/convAPI";
import {check} from "../http/userAPI";



const TupGroupFioQuery = observer(() => {
    const history = useHistory() //для перехода на другую страницу
    const {queries} = useContext(Context)

    useEffect(() => {
        if (user.isAuth === true)
            check().then(data => {
                if (data.role === "ADMIN") getTup().then(data => queries.setTuples(data))
                else
                getTupUser(data.id).then(data => {queries.setTuples(data)})
        })
        queries.setSelectedAlg("Новый запрос")
    }, [queries])

    return (
        <Row >

            <Col md={2} className="p-3">
                <Form>
                    <Form.Check
                        onClick={() => {history.push('/alg')
                            queries.setQuerySQL('')
                            queries.setNamesCol(null)}}
                        type="radio"
                        label="Кортежи"
                        id="tup"
                        name="flag"
                    />
                </Form>
            </Col>


            <Col  md={2} className="p-2">
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="1.2">
                            Группа
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control
                                size="sm"
                                value={queries.group}
                                type="text"
                                onChange={e => queries.setGroup(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Col>

            <Col md={2} className="p-2">
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="1.2">
                            Фамилия
                        </Form.Label>
                        <Col sm="6">
                            <Form.Control
                                size="sm"
                                type="text"
                                value={queries.fam}
                                onChange={e => queries.setFam(e.target.value)}/>
                        </Col>
                    </Form.Group>
                </Form>
            </Col>

            <Col md={2} className="p-2">
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label  column sm="1.2">
                            Номер запроса
                        </Form.Label>
                        <Col sm="5">
                            <Form.Control
                                size="sm"
                                type="text"
                                value={queries.nom}
                                onChange={e => queries.setNom(e.target.value)}/>
                        </Col>
                    </Form.Group>
                </Form>
            </Col>

            <Col md={3} className="ml-4 p-2">
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="1.2">Сохраненный запрос</Form.Label>
                        <Col sm="6">

                            <Dropdown size="sm">
                                <Dropdown.Toggle style={{backgroundColor: '#FFFFFF', color: '#000000', borderColor: '#c0c0c0'}}>{queries.selectedTup.query_name || "Новый запрос"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {queries.tuples.map(tup =>
                                        <Dropdown.Item
                                            onClick={() => queries.setSelectedTup(tup)}
                                            key={tup.query_name}
                                        >
                                            {tup.query_name}
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>


                        </Col>
                    </Form.Group>
                </Form>
            </Col>

        </Row>
    );
});

export default TupGroupFioQuery;