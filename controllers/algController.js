const {Alg} = require('../models/models')
const ApiError = require('../error/ApiError')
const db = require('../db')
const {QueryTypes} = require("sequelize");



class algController {

    async getAll(req, res) {
            const alg = await Alg.findAll()
            return res.json(alg)
    }  //для получения всех запросов из Alg админом

    async getAllUser(req, res) {
        const {userId} = req.params
        const alg = await Alg.findAll({where:{userId}})
        return res.json(alg)
    }  //для получения всех запросов из Alg пользователем


    async getAllTable(req, res) {
        const tables = await db.getQueryInterface().showAllTables()
        tables.splice(0,1)
        tables.splice(4,2)
        return res.json(tables)
    }   //для получения всех наименований таблиц БД для селектора выбора таблицы для удобства ввода типов перемеенных

    async getFields(req, res) {
        const {table} = req.body
        const fields = await db.getQueryInterface().describeTable(table)
        return res.json(fields)
    } //для получения полей таблиц для селеторов выбора полей для удобства ввода целевого списка и тела запроса

    async save(req, res, next) {
            try{
                const {query_name, desc_query, table_var, goal_list, query_body, nom_query, nom_qr, first_name, userId} = req.body
                const alg = await Alg.create({query_name, desc_query, table_var, goal_list, query_body, nom_query, nom_qr, first_name, userId})
                return res.json(alg)
            }
            catch (e) {
                next(ApiError.badRequest(e.message))
            }
        }       //для сохранения запроса в Alg


    async update(req, res) {
        try{
            const {query_name, desc_query, table_var, goal_list, query_body, nom_query, nom_qr, first_name} = req.body
            const alg = await Alg.update({desc_query, table_var, goal_list, query_body, nom_query, nom_qr, first_name},
                {where: {query_name}}
            )
            return res.json(alg)
        }
        catch (e) {
            return (ApiError.badRequest(e.message))
        }
    }       //для обновления запроса в Alg

    async delete(req, res) {
        try{
            const {query_name} = req.body
            const alg = await Alg.destroy(
                {where: {query_name}}
            )
            return res.json(alg)
        }
        catch (e) {
            return (ApiError.badRequest(e.message))
        }
    }       //для удаления запроса из Alg

    async execute(req, res, next) {
        try{
            const {query_sql} = req.body
            const alg = await db.query(query_sql, {type: QueryTypes.SELECT}).then()
            return res.json(alg)

        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }       //для выполнения запроса к БД
}

    async view(req, res, next){
        try{
            const {query_name, query_sql} = req.body
            const sql = "create view " + query_name + " as " + query_sql
            const alg = await db.query(sql).then()
            return res.json(alg)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }       //для создания представления
}

module.exports = new algController()
