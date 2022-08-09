const {pool} = require('./db_connection.js')

const fnAlterHotel = (req, res) => {

    const {id} = req.params;

    let reqParams = req.body

    //Exclui os campos que vierem em branco para que sejam alterados apenas campos preenchidos
    for (const [key, value] of Object.entries(reqParams)) {

        if (!value) {
            delete reqParams[key]
        }

    }

    pool.getConnection((err, connection) => {

    if (err) throw err

    const queryStr = 'UPDATE hotels SET ? WHERE id = ?';

    connection.query(queryStr, [reqParams, id], (error, results, fields) =>{
        
        connection.release()

        if (error) throw error

        res.json({message: 'Hotel alterado com sucesso'});
    })

    })
}

const fnGetAllHotels = (req, res) => {

    const {price} = req.query
    const columns = ['name', 'description', 'lat', 'lng', 'price']
  
    if(!price) {
  
      pool.getConnection((err, connection) => {
  
        if (err) throw err
  
        connection.query('SELECT ?? FROM hotels WHERE status = "active" ORDER BY 1', 
          [columns], (error, rows, fields) => {
          
            connection.release()
  
            if (error) throw error
  
            return res.json(rows)
  
          })
  
      })    
  
    } 
  
    else {
  
      pool.getConnection((err, connection) => {
  
        if (err) throw err
  
        connection.query('SELECT ?? FROM hotels WHERE price <= ? AND status = "active"  ORDER BY 1', 
          [columns, price], (error, rows, fields) => {
          
            connection.release()
  
            if (error) return error
      
            if (rows.length < 1) return res.json({message: 'Nenhum hotel encontrado nessa faixa de valor'})
        
            return res.json(rows)
        
          })
  
      })
    
    }
  
}

const fnGetHotelsFilter = (req, res) => {

    pool.getConnection((err, connection) => {

        if (err) throw err
    
        const {name, description, lat, lng, price, status} = req.body
    
        const tabFields = {name, description, lat, lng, price, status}
    
        const queryStr = 'INSERT INTO hotels SET ?'
    
        connection.query(queryStr, tabFields, (error, result, fields) => {
          
          connection.release()
    
          if (error) throw error
    
          if (result.insertId) return res.status(201).json({message: 'Hotel incluído com sucesso'})
    
    
        })
    
      })
    

}

exports.fnAlterHotel = fnAlterHotel
exports.fnGetAllHotels = fnGetAllHotels
exports.fnGetHotelsFilter = fnGetHotelsFilter