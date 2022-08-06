const {connection} = require('./db_connection.js')

async function fnGetHotels  (price = 0)  {

    let queryStr = ''

    if (price > 0) {
         queryStr = `SELECT * FROM hotels WHERE PRICE =${price}`
    } else {
         queryStr = `SELECT * FROM hotels`
    }

    connection.connect()
    
    connection.query(queryStr, (err, rows, fields) =>{
        
        if (err) throw err
        
        return rows
    })

    connection.end()
}

exports.fnGetHotels = fnGetHotels