import {$authHost, $host} from "./index";


export const createAlg = async (alg) => {
    const {data} = await $host.post('api/alg', alg)
    return data
}

export const getAlgUser = async (userId) => {
    const {data} = await $authHost.get('api/alg/' + userId)
    return data
}



export const getAlg = async () => {
    const {data} = await $authHost.get('api/alg')
    return data
}

export const getAllTable = async () => {
    const {data} = await $host.post('api/alg/getAll')
    return data
}

export const getField = async (table) => {
    const {data} = await $host.post('api/alg/getFields', table)
    return data
}

export const updateAlg = async (alg) => {
    const {data} = await $host.post('api/alg/update', alg)
    return data
}

export const deleteAlg = async (query_name) => {
    const {data} = await $host.delete('api/alg', {data: {query_name}})
    return data
}

export const execute = async (query_sql) => {
    const {data} = await $host.post('api/alg/execute', query_sql)
    return data
}

export const view = async (alg) => {
    await $host.post('api/alg/view', alg)
}




export const createTup = async (tuples) => {
    const {data} = await $host.post('api/tuples', tuples)
    return data
}

export const getTupUser = async (userId) => {
    const {data} = await $authHost.get('api/tuples/' + userId)
    return data
}

export const getTup = async () => {
    const {data} = await $authHost.get('api/tuples')
    return data
}
export const updateTup = async (tuples) => {
    const {data} = await $host.post('api/tuples/update', tuples)
    return data
}

export const deleteTup = async (query_name) => {
    const {data} = await $host.delete('api/tuples', {data: {query_name}})
    return data
}

