const createError = require('http-errors');
const pg = require('pg')
const Pool = pg.Pool;
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'wowdb',
	password: 'XXBankai00',
	port: 5432,
});

const types = pg.types;
types.setTypeParser(1114, function(stringValue) {
    return new Date(stringValue + "+0000");
});

/**
 * This function describes the route to get an item name based on an item id or 
 * a list of all ids
 * @param {number} request ID of item
 * @param {json} response JSON containing item name corresponding to item ID or
 * list of all ids
 * @throws will throw an error if request parameter invalid. 
 */
const getItemName = (request, response) => {
	stmt = 'SELECT item_name FROM item_list'
	if (request.query.id) {
		if (isNaN(request.query.id)) {
			throw createError(400, 'Bad Request')
		}
		stmt += ' WHERE item_id = ' + request.query.id
	}
	pool.query(stmt)
		.then(results => {
			if (!results.rows.length) {
				response.status(200).json({
					results: []
				})
				return
			}
			response.status(200).json({ results: results.rows })
		})
		.catch(error => { throw error })
}

/**
 * This function describes the route to get an item thumbnail based on an item
 * ID.
 * @param {number} request ID of item
 * @param {json} response JSON containing item picture as a byte array
 * @throws will throw an error if request parameter invalid. 
 */
const getItemPic = (request, response) => {
	if (isNaN(request.params.id)) {
		throw createError(400, 'Bad Request')
	}
	pool.query('SELECT item_pic FROM item_list WHERE item_id = $1',
	[request.params.id])
		.then(results => {
			if (!results.rows.length) {
				response.status(200).json({
					results: []
				})
				return
			}
			response.status(200).json({ results: results.rows })
		})
		.catch(error => { throw error })
}

/**
 * This function describes the route to get the list of items currently tracked.
 * @param {NULL} request.query.search Substring to match
 * @param {list} response List of item ids and corresponding names
 * @throws will throw an error if pg pool fails.
 */
const getItemList = (request, response) => {
	let stmt = 'SELECT item_id, item_name FROM item_list'
	if (request.query.search) {
		stmt += " WHERE item_name ILIKE '%" + request.query.search + "%'"
	}
	stmt += ' ORDER BY item_id'
	pool.query(stmt)
		.then(results => {
			if (!results.rows.length) {
				response.status(200).json({
					results: []
				})
				return
			}
			response.status(200).json({ results: results.rows })
		})
		.catch(error => { throw error })
}

/**
 * This function gets the price history of a single item
 * @param {integer} request ID of item
 * @param {list} response List of statistical data based on item prices
 * @throws will throw an error if request parameter invalid. 
 */
const getItemHistory = (request, response) => {
	if (request.query.last_update) {
		getLastUpdateTime(request, response)
		return
	}
	if (isNaN(request.query.id)) {
		throw createError(400, 'Bad Request')
	}
	pool.query('SELECT * FROM ' + request.params.realm +
	' WHERE item_id = $1 ORDER BY interval', [request.query.id])
		.then(results => {
			if (!results.rows.length) {
				response.status(200).json({
					results: []
				})
				return
			}
			response.status(200).json({ results: results.rows })
		})
		.catch(error => { throw error })
}

/**
 * This function gets the last update time of a specific item or of all items
 * @param {integer, bool} request ID of item, time of last update
 * @param {list} response List of last update time
 * @throws will throw an error if request parameter invalid
 */
const getLastUpdateTime = (request, response) => {
	stmt = 'SELECT interval FROM ' + request.params.realm
	if (request.query.id) {
		if (isNaN(request.query.id)) {
			throw createError(400, 'Bad Request')
		}
		stmt += ' WHERE item_id = ' + request.query.id
	}
	stmt += ' ORDER BY interval DESC LIMIT 1'
	pool.query(stmt)
		.then(results => {
			if (!results.rows.length) {
				response.status(200).json({
					results: []
				})
				return
			}
			response.status(200).json({ results: results.rows })
		})
		.catch(error => { throw error })
}

module.exports = {
	getItemName,
	getItemPic,
	getItemList,
	getItemHistory,
}

