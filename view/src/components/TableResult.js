import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Table} from "react-bootstrap";
import {Context} from "../index";


const TableResult = observer(() => {

    const {queries} = useContext(Context)
    let table = null
    if (queries.namesCol !== null){
        table = (
            <Table striped bordered hover size="sm" style={{backgroundColor: '#FFFFFF'}}>
                <thead>
                <tr>
                    {queries.namesCol.map(nam =>
                        <th>
                            {nam}
                        </th>
                    )}
                </tr>
                </thead>
                <tbody>
              {queries.resultQuery.map((result,i) =>(
                    <tr key={i}>
                        {queries.namesCol.map((nam,j) =>
                            <td key={j}>
                                {result[nam]}
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </Table>
        )
    }

    return table

});

export default TableResult;