import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Col} from "react-bootstrap";
import {Context} from "../index";
import {
    createTup,
    deleteTup,
    execute,
    getTup,
    updateTup,
    view
} from "../http/convAPI";
import convert_to_sql from "./TupleCalculusQuery";
import {LOGIN_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";


const TupButtons = observer(() => {

    const {queries, user} = useContext(Context)
    const history = useHistory()

    useEffect(() => {
        queries.setGroup('')
        queries.setFam('')
        queries.setNom('')
        queries.setDesc('')
        queries.setType('')
        queries.setGoal('')
        queries.setQuery('')
        queries.setQuerySQL('')
    }, [queries])

    const saveQ = () => {
        let nameQ = queries.group + '_' + queries.nom + '_' + queries.fam;
        createTup({query_name: nameQ,
            desc_query: queries.desc,
            table_var: queries.type,
            goal_list: queries.goal,
            query_body: queries.query,
            nom_query: queries.nom,
            nom_qr: queries.group,
            first_name: queries.fam,
            userId: user.user.id}).then(() => {
            updateSaveQuery()
            queries.setSelectedTup(nameQ)
        })
    }

    const updateSaveQuery = () => {
        check().then(data => {
            if (data.role === "ADMIN") getTup().then(data => queries.setTuples(data))
            else
                getTupUser(data.id).then(data => {queries.setTuples(data)})
        })
    }

    const getQ = () => {
        queries.setGroup(queries.selectedTup.nom_qr)
        queries.setFam(queries.selectedTup.first_name)
        queries.setNom(queries.selectedTup.nom_query)
        queries.setDesc(queries.selectedTup.desc_query)
        queries.setType(queries.selectedTup.table_var)
        queries.setGoal(queries.selectedTup.goal_list)
        queries.setQuery(queries.selectedTup.query_body)
        queries.setQuerySQL('')
        queries.setNamesCol(null)
    }
    const updateQ = () => {
        updateTup({query_name: queries.selectedTup.query_name,
            desc_query: queries.desc,
            table_var: queries.type,
            goal_list: queries.goal,
            query_body: queries.query,
            nom_query: queries.nom,
            nom_qr: queries.group,
            first_name: queries.fam,
            userId: user.user.id}).then(() => {
            updateSaveQuery()
            let nameQ = queries.group + '_' + queries.nom + '_' + queries.fam
            queries.setSelectedTup(nameQ)
        })
    }
    const deleteQ = () => {
        deleteTup(queries.selectedTup.query_name).then(() => {
            queries.setGroup('')
            queries.setFam('')
            queries.setNom('')
            queries.setDesc('')
            queries.setType('')
            queries.setGoal('')
            queries.setQuery('')
            updateSaveQuery()
            queries.setSelectedTup("Новый запрос")
        })
    }

    const executeQ = () => {
        execute({query_sql: queries.querySQL}).then(r => {queries.setResultQuery(r)
            queries.setNamesCol(Object.keys(queries.resultQuery[0]))
            console.log(r)
            console.log(queries.resultQuery)
        })
    }

    const generateQ = () => {
        const query_object = {
            alias: queries.type,
            target_list: queries.goal,
            query_body: queries.query,
            description: queries.desc
        }
        convert_to_sql(query_object).then(result => {
            queries.setQuerySQL(result)})
    }

    const viewQ = () => {
        let nameQ = queries.group + '_' + queries.nom + '_' + queries.fam;
        view({query_name:nameQ, query_sql:queries.querySQL}).then()
    }

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        queries.setTuples([])
        queries.setGroup('')
        queries.setFam('')
        queries.setNom('')
        queries.setDesc('')
        queries.setType('')
        queries.setGoal('')
        queries.setQuery('')
        queries.setQuerySQL('')
    }


    return (
        user.isAuth ?
            <Col className="p-2 mt-1 d-flex flex-column">
                <Button className="p-2 mb-4  border" variant="light" onClick={() => logOut()}>Выйти</Button>
                <Button className="p-2 mb-4  border" variant="light" onClick={getQ}>Принять запрос</Button>
                <Button className="p-2 mb-4 border" variant="light" onClick={saveQ}>Сохранить запрос</Button>
                <Button className="p-2 mb-4 border" variant="light" onClick={updateQ}>Изменить запрос</Button>
                <Button className="p-2 mb-4 border" variant="light" onClick={deleteQ}>Удалить запрос</Button>
                <Button className="p-2 mb-4 border" variant="light" onClick={generateQ}>Генерировать SQL</Button>
                <Button className="p-2 mb-4 border" variant="light" onClick={executeQ}>Выполнить SQL</Button>
                <Button className="p-2 border" variant="light" onClick={viewQ}>Создать View</Button>
            </Col>
            :
            <Col className="p-2 mt-1 d-flex flex-column">
                <Button className="p-2 mb-4  border" variant="light"
                        onClick={() => history.push(LOGIN_ROUTE)}>Войти</Button>
                <Button className="p-2 mb-4 border" variant="light" onClick={generateQ}>Генерировать SQL</Button>
                <Button className="p-2 mb-4 border" variant="light" onClick={executeQ}>Выполнить SQL</Button>
            </Col>
    );
});

export default TupButtons;