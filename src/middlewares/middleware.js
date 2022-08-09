require('dotenv').config()
const {pool} = require('../mysql/db_connection.js')

//middleware de validação de pesquisa com filtro de preço
const validatePrice = (req, res, next) => {

    const {price} = req.query;
  
    //Aqui verifico se "price" não é nulo
    //Depois verifico se não é do tipo NaN. Para esse verificação é preciso comparar o valor com ele mesmo
    //como faço abaixo na expressão Number(price) !== Number(price)
    if (price && Number(price) !== Number(price)) 
      return res.status(404).json({error: 'O valor digitado deve ser númerico'})
  
    req.query.price = Number(price)
  
    return next()
  }

  //middleware de validação de inserção de novo hotel
const validateInsertHotel = (req, res, next) => {

    const {name, description, lat, lng, price, status} = req.body
  
    //Todos os campos devem ser preenchidos
    if (!name || !description || !lat || !lng || !price || !status) 
      return res.status(401).json({error: 'Todos os campos devem ser preenchidos'})
  
    return next()
  
  }
  
  //middleware de validação de id do hotel
  const validateId = (req, res, next) => {
  
    pool.getConnection((err, connection) => {
  
      if (err) throw err
  
      const queryStr = 'SELECT * FROM hotels WHERE id = ?';
      const {id} = req.params
  
      connection.query(queryStr, id, (error, rows, fields) => {
  
        if (error) throw error
  
        if (rows.length < 1) 
          return res.status(404).json({error: 'Este hotel não existe'}) 
        
        return next()
  
      })
  
    })
  
  }
  
  //middleware de validação de login
  const authUser = (req, res, next) =>{
  
    const {authorization}  = req.headers
  
    if (authorization !== process.env.USER_AUTH) 
      return res.status(401).json({error: 'Login ou senha estão incorretos'})
  
    return next()
  
  }
  

  exports.validatePrice = validatePrice
  exports.validateInsertHotel = validateInsertHotel
  exports.validateId = validateId
  exports.authUser = authUser