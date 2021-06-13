import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Col} from "react-bootstrap";
import {Context} from "../index";
import {createAlg, deleteAlg, execute, getAlg, getAlgUser, getOneAlg, updateAlg, view} from "../http/convAPI";
import convert_to_sql from "./RelationalAlgebraQuery";
import {useHistory} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";
import {check, login} from "../http/userAPI";


const AlgButtons = observer(() => {

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
        createAlg({query_name: nameQ,
            desc_query: queries.desc,
            table_var: queries.type,
            goal_list: queries.goal,
            query_body: queries.query,
            nom_query: queries.nom,
            nom_qr: queries.group,
            first_name: queries.fam,
            userId: user.user.id
        }).then(() => {
                updateSaveQuery()
                queries.setSelectedAlg(nameQ)
            })
    }

    const updateSaveQuery = () => {
        if (user.user.role === "ADMIN")
        getAlg().then(data => queries.setAlgs(data))
        else
        getAlgUser(user.user.id).then(data => {queries.setAlgs(data)})
    }
    const getQ = () => {
        queries.setGroup(queries.selectedAlg.nom_qr)
            queries.setFam(queries.selectedAlg.first_name)
            queries.setNom(queries.selectedAlg.nom_query)
            queries.setDesc(queries.selectedAlg.desc_query)
            queries.setType(queries.selectedAlg.table_var)
            queries.setGoal(queries.selectedAlg.goal_list)
            queries.setQuery(queries.selectedAlg.query_body)
        queries.setQuerySQL('')
        queries.setNamesCol(null)
        }
    const updateQ = () => {
        console.time("Update")
        updateAlg({query_name: queries.selectedAlg.query_name,
            desc_query: queries.desc,
            table_var: queries.type,
            goal_list: queries.goal,
            query_body: queries.query,
            nom_query: queries.nom,
            nom_qr: queries.group,
            first_name: queries.fam,
            userId: user.user.id
        }).then(() => {
            updateSaveQuery()
            let nameQ = queries.group + '_' + queries.nom + '_' + queries.fam
            queries.setSelectedAlg(nameQ)
        })
        console.timeEnd("Update")
    }
    const deleteQ = () => {
        deleteAlg(queries.selectedAlg.query_name).then(() => {
            queries.setGroup('')
            queries.setFam('')
            queries.setNom('')
            queries.setDesc('')
            queries.setType('')
            queries.setGoal('')
            queries.setQuery('')
            updateSaveQuery()
            queries.setSelectedAlg("Новый запрос")
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
        queries.setAlgs([])
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

export default AlgButtons;