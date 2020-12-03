
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const db = require('./routes/queries')
const path = require('path')
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))

app.get('/item_list/name/:id', db.getItemName)
app.get('/item_list/image/:id', db.getItemPic)
app.get('/item_list', db.getItemList)
app.get('/wowdb/:realm/:id', db.getItemHistory)

app.use((req, res, next) => {
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    })
})

app.listen(port, () => {
    console.log('App running on port ' + port)
})

module.exports = app