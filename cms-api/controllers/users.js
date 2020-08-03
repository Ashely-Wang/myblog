const db = require('../models/db')
const ig = require('../models/img')
const jm = require('blueimp-md5')
exports.find = async function(req,res,next) {
    try {
        const ret = await db.query(`SELECT * FROM users WHERE id = '${req.params.id}'`)
        res.status(200).json(ret)
    } catch(err) {
        next(err)
    }
}
exports.edit = async function(req,res,next) {
    try {
        const sqlStr = `
        UPDATE users SET nickname = '${req.body.nickname}', gender = '${req.body.gender}', perfession = '${req.body.perfession}', introduction = '${req.body.introduction}' WHERE id = '${req.session.user.id}'`
        const ret = await db.query(sqlStr)
        const ret2 = await db.query(`SELECT * FROM users WHERE id = '${req.session.user.id}'`)
        res.status(201).json(ret2)
    } catch(err) {
		console.log(err)
        next(err)
    }
}
exports.addnew = async function(req,res,next) {
    const body = req.body
    const sqlStr = `INSERT INTO users(username, password, email, nickname, avatar, gender, create_time, modify_time, perfession, introduction) VALUES('${body.email}', '${jm(jm(jm(body.password)))}', '${body.email}', '${body.nickname}', 'default-avatar.png', '${body.gender}', DEFAULT, DEFAULT, NULL, '${body.introduction}') `
    try {
        const ret = await db.query(sqlStr)
        // body.id = ret.insertId
        const users = await db.query(`SELECT * FROM users WHERE id='${ret.insertId}'`)
        res.status(201).json(users[0])
    } catch(err) {
        next(err)
    }
    // db.query(sqlStr).then(function(data) {
    //     return data
    // }, function(data) {
    //     console.log(data);
    // })
}
exports.delete = function(req,res,next) {
    
}
exports.test = async function(req, res, next) {
	// var fs=require("fs")
	// var file = fs.createReadStream('./uploads/avatar-1593577052392brdnk-vision-h-fpMDENzjk-unsplash.jpg')
	// fs.createReadStream('./uploads/avatar-1593577052392brdnk-vision-h-fpMDENzjk-unsplash.jpg',optations).on('data', function(data) {
	// 	res.status(200).json(data)
	// })
	const ret = await ig.buff('./uploads/avatar-1593577052392brdnk-vision-h-fpMDENzjk-unsplash.jpg')
	console.log("好")
	res.send(ret)
	// res.status(200).json(ret)
}