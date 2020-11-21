const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'wowdb',
    password: 'XXBankai00',
    port: 5432,
})

// function error(err, req, res, next) {
    
// }

const getItemName = (request, response) => {
    if (isNaN(request.params.id)) {
        response.status(400).send({error: {
            status: 400,
            message: "Bad Request",
        }})
        return
    }
    pool.query('SELECT item_name FROM item_list WHERE item_id = $1', [request.params.id], (error, results) => {
        if (error) {
            throw error
        }
        if (!results.rows.length) {
            response.status(404).send({error: {
                status: 404,
                message: 'Not Found',
            }})
            return
        }
        response.status(200).json(results.rows)
    })
}

const getItemPic = (request, response) => {
    if (isNaN(item_id)) {
        response.status(400).send({error: {
            status: 400,
            message: "Bad Request",
        }})
        return
    }
    pool.query('SELECT item_pic FROM item_list WHERE item_id = $1', [request.params.id], (error, results) => {
        if (error) {
            throw error
        }
        if (!results.rows.length) {
            response.status(404).send({error: {
                status: 404,
                message: 'Not Found',
            }})
            return
        }
        response.status(200).json(results.rows)
    })
}

const getItemList = (request, response) => {
    pool.query('SELECT * FROM item_list ORDER BY item_id', (error, results) => {
        if (error) {
            throw error
        }
        if (!results.rows.length) {
            response.status(404).send({error: {
                status: 404,
                message: 'Not Found',
            }})
            return
        }
        response.status(200).json(results.rows)
    })
}

const getItemHistory = (request, response) => {
    if (isNaN(request.params.id)) {
        response.status(400).send({error: {
            status: 400,
            message: "Bad Request",
        }})
        return
    }
    pool.query('SELECT * FROM $1 WHERE item_id = $2', [request.params.realm, request.params.id], (error, results) => {
        if (error) {
            throw error
        }
        if (!results.rows.length) {
            response.status(404).send({error: {
                status: 404,
                message: 'Not Found',
            }})
            return
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getItemName,
    getItemPic,
    getItemList,
    getItemHistory
}

