const express = require('express')
const app = express()
const port = 3333
const {fnGetHotels} = require('./mysql/db_methods')


app.use(express.json())

app.get('/hotels', (req, res) => {
  
  const teste = fnGetHotels()
  res.json(teste)
    
})

app.post('/hotels', (req, res) =>{
    res.send('Hello World');
})

app.put('/hotels:id', (req, res) =>{
    res.send('Hello World');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

