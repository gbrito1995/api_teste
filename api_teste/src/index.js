const express = require('express')
const app = express()
const port = 3333
const {pool} = require('./mysql/db_connection')

//middleware de validação de pesquisa com filtro de preço
const validatePrice = (req, res, next) => {

  const {price} = req.query;

  //Aqui verifico se "price" não é nulo
  //Depois verifico se não é do tipo NaN 
  if (price && Number(price) !== Number(price)) return res.status(404).send('O valor digitado deve ser númerico')

  req.query.price = Number(price)

  return next()
}

//middleware de validação de inserção de novo hotel
const validateInsertHotel = (req, res, next) => {

  const {name, description, lat, lng, price, status} = req.body

  if (!name || !description || !lat || !lng || !price || !status) return res.status(401).send('Todos os campos devem ser preenchidos')

  return next()

}

app.use(express.json())

app.get('/hotels', validatePrice, (req, res) => {

  const {price} = req.query

  if(!price) {

    pool.getConnection((err, connection) => {

      if (err) throw err

      connection.query('SELECT * FROM hotels WHERE status = "active" ', (error, rows, fields) => {
        
        connection.release()

        if (error) throw error
  
        return res.json(rows)
    
      })

    })    

  } 

  else {

    pool.getConnection((err, connection) => {

      connection.query('SELECT * FROM hotels WHERE price <= ? AND status = "active"  ', [price], (error, rows, fields) => {
        
        connection.release()

        if (error) return error
  
        if (rows.length < 1) return res.send('Nenhum hotel encontrado nessa faixa de valor')
    
        return res.json(rows)
    
      })

    })
  
  }


})

app.post('/hotels', validateInsertHotel, (req, res) =>{

  pool.getConnection((err, connection) => {

    if (err) throw err

    const {name, description, lat, lng, price, status} = req.body

    const tabFields = {name, description, lat, lng, price, status}

    const queryStr = 'INSERT INTO hotels SET ?'

    connection.query(queryStr, tabFields, (error, result, fields) => {
      
      connection.release()

      if (error) throw error

      if (result.insertId) return res.send('Hotel incluído com sucesso')


    })

  })
  
})

app.put('/hotels/:id', (req, res) =>{

  const arrKey = []
  const arrValue = []
  const {id} = req.params;

  let reqParams = req.body

  for (const [key, value] of Object.entries(reqParams)) {

    if (!value) {
      delete reqParams[key]
    }

  }

  pool.getConnection((err, connection) => {

    const queryStr = 'UPDATE hotels SET ? WHERE id = ?';

    connection.query(queryStr, [reqParams, id], (err, results, fields) =>{
      
      if (err) throw err

      console.log(results)
      
      res.send('OK');
    })

  })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

