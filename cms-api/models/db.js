var mysql = require('mysql')
const poor = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'cms'
})
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'cms'
// })
// connection.connect()
// connection.query(sqlstr, function(error, results, fields) {
//     if (error) throw error
//     return results
// })
// connection.end()
//############################################################################################
// const query = function(sqlstr) {
//     return new Promise((res,rej) => {
//         connection.query(sqlstr, function(error,results, fields) {
//             if (error) {
//                 return rej(error)
//             } else {
//                 return res(results)
//             }
            
//         })
//     })
//#############################################################################################
const query = function(sqlstr) {
    return new Promise((res,rej) => {
        poor.getConnection(function(error,connection) {
            if (error) {
                return rej(error)
            } else {
                return connection.query(sqlstr, function(err, results, fields) {
                    connection.release()
                    if (err) {
                        return rej(err)
                    } else {
                        res(results)
                    }
                })
            }
        })
    })
}
exports.query = query
// query(sqlstr).then(function(data) {
//     return data
// }, function(data) {
//     return data
// })