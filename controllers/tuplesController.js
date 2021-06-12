const {Tuples} = require('../models/models')
const ApiError = require('../error/ApiError')


class tuplesController {

    async getAllTup(req, res) {
        const tup = await Tuples.findAll()
        return res.json(tup)
    }

    async getAllUserTup(req, res) {
        const {userId} = req.params
        const alg = await Tuples.findAll({where:{userId}})
        return res.json(alg)
    }  //для получения всех запросов из Alg пользователем


    async saveTup(req, res, next) {
        try{
            const {query_name, desc_query, table_var, goal_list, query_body, nom_query, nom_qr, first_name, userId} = req.body
            const tup = await Tuples.create({query_name, desc_query, table_var, goal_list, query_body, nom_query, nom_qr, first_name, userId})
            return res.json(tup)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async updateTup(req, res) {
        try{
            const {query_name, desc_query, table_var, goal_list, query_body, nom_query, nom_qr, first_name, userId} = req.body
            const tup = await Tuples.update({desc_query, table_var, goal_list, query_body, nom_query, nom_qr, first_name, userId},
                {where: {query_name}}
            )
            return res.json(tup)
        }
        catch (e) {
            return (ApiError.badRequest(e.message))
        }
    }

    async deleteTup(req, res) {
        try{
            const {query_name} = req.body
            const tup = await Tuples.destroy(
                {where: {query_name}}
            )
            return res.json(tup)
        }
        catch (e) {
            return (ApiError.badRequest(e.message))
        }
    }

}

module.exports = new tuplesController()
