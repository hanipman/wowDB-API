const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'wowdb',
    password: 'XXBankai00',
    port: 5432,
})

/**
 * This function describes the route to get an item name based on an item id.
 * @param {number} request ID of item
 * @param {json} response JSON containing item name corresponding to item ID
 * @throws will throw an error if request parameter invalid or response empty. 
 */
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

/**
 * This function describes the route to get an item thumbnail based on an item ID.
 * @param {number} request ID of item
 * @param {json} response JSON containing item picture as a byte array
 * @throws will throw an error if request parameter invalid or response empty. 
 */
const getItemPic = (request, response) => {
    if (isNaN(request.params.id)) {
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

/**
 * This function describes the route to get the list of items currently tracked.
 * @param {NULL} request Request has no parameters
 * @param {list} response List of item ids and corresponding names
 * @throws will throw an error if response empty. 
 */
const getItemList = (request, response) => {
    let stmt = 'SELECT item_id, item_name FROM item_list'
    if (request.query.q) {
        stmt += " WHERE item_name ILIKE '%" + request.query.q + "%'"
    }
    stmt += ' ORDER BY item_id'
    pool.query(stmt, (error, results) => {
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

/**
 * This function gets the price history of a single item
 * @param {integer} request ID of item
 * @param {list} response List of statistical data based on item prices
 * @throws will throw an error if request parameter invalid or response empty. 
 */
const getItemHistory = (request, response) => {
    if (isNaN(request.params.id)) {
        response.status(400).send({error: {
            status: 400,
            message: "Bad Request",
        }})
        return
    }
    pool.query('SELECT * FROM ' + request.params.realm + ' WHERE item_id = $1 ORDER BY interval', [request.params.id], (error, results) => {
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

