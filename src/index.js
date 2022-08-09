const express = require('express')
const app = express()
require('dotenv').config
const port = process.env.APP_PORT
const { fnAlterHotel, fnGetAllHotels, fnGetHotelsFilter } = require('./mysql/db_operations.js')
const { validatePrice, validateInsertHotel, validateId, authUser } = require('./middlewares/middleware.js')

app.use(express.json())
//middleware usado em todas as rotas
app.use(authUser)

app.get('/hotels', validatePrice, (req, res) => {

  fnGetAllHotels(req, res)

})

app.post('/hotels', validateInsertHotel, (req, res) => {

  fnGetHotelsFilter(req, res)

})

app.put('/hotels/:id', validateId, (req, res) => {
  fnAlterHotel(req, res);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

