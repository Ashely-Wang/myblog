const db = require("../models/db")
const jm = require('blueimp-md5')
exports.find = async function(req,res,next) {
    try {
        res.status(200).json(req.session.user)
    } catch(err) {
        next(err)
    }
}
exports.addnew = async function(req,res,next) {
    const sqlStr1 = `SELECT * FROM users WHERE username = '${req.body.username}'`
    const ret = await db.query(sqlStr1)
    try {
        if (ret[0].password == jm(jm(jm(req.body.password)))) {
            req.session.user = ret[0]
            // res.render('test.html')
            console.log("er")
            res.status(201).json(ret[0].username + '登录成功')
        } else {
            return res.status(404).json({
                error: '密码错误'
            })
        }
    } catch(err) {
        next(err)
    }
}
exports.exit = async function(req,res,next) {
    delete req.session.user
    res.status(200).json({})
}