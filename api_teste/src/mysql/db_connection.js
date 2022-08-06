const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'backend-teste.czmtjskqwvmq.us-east-1.rds.amazonaws.com',
    user: 'tester',
    password: 'TdeRHXeD?$j7LD8@',
    database: 'teste'

})

module.exports = {connection}