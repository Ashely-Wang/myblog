const fs = require("fs")
const db = require('../models/db')
const ig = require('../models/img')
exports.updateAvatar = async function(req, res, next) {
	try {
		console.log(req.file)
		const sqlOrder = `UPDATE users SET avatar = '${req.file.path}' WHERE id = '${req.session.user.id}'`
		const ret = await db.query(sqlOrder)
		console.log(req.file.path)
		res.status(201).json(ret)
	} catch(err) {
		next(err)
	}
}
exports.newTopic = async function(req, res, next) {
    try {
        console.log(req.fields)
        console.log(req.file)
        console.log(req.files)
        console.log(req.body)
        const a = JSON.parse(JSON.stringify(req.body))
        console.log(a.topicInfor)
        console.log(typeof(a.topicInfor))
        //字符串
        console.log(JSON.parse(a.topicInfor))
        // console.log(JSON.stringify(b))
        // console.log(JSON.parse(JSON.stringify(b)))
        // console.log(JSON.parse(JSON.stringify(a.topicInfor)).name)
        res.status(200).json("好嘞")
    } catch(err) {
        console.log(err)
        next(err)
    }
}
exports.getAvatar = async function(req, res, next) {
	try {
		const sqlOrder = `SELECT * FROM users WHERE id = '${req.params.id}'`
		const ret1 = await db.query(sqlOrder)
		// console.log(ret1[0].avatar)
		// console.log(typeof(ret1))
		if (ret1[0].avatar == 'default-avatar.png') {
			res.status(200).json("no avatar")
		} else {
			const ret2 = './public/' + (ret1[0].avatar).substr(6)
			const ret3 = await ig.buff(ret2)
			res.status(200).json(ret3)
		}
		//publicavatar-1593873184067eye-4997724_960_720.png
	} catch(err) {
        console.log(err)
		next(err)
	}
}
exports.getAvatars = async function(req, res, next) {
    try {
        var results1 = []
        var results2 = []
        var results2 = []
        var results2 = []
        var results2 = []
        var loadavatar = async function(sqlStr) {
            return await db.query(sqlStr)
        }
        const idArray = req.params.ids.split(",")
        idArray.forEach(element => {
          results1.push(new Promise((res, rej) => {
              res(loadavatar(`SELECT * FROM users WHERE id='${element}'`))
          }))  
        })
        Promise.all(results1).then(data => {
            data.map(val => {
                results2.push({id: val[0].id, avatar: val[0].avatar, nickname: val[0].nickname})
            })
            res.status(200).json(results2)
        })
    } catch(err) {
        console.log(err)
        next(err)
    }
}

// exports.getAvatars = async function(req, res, next) {
// 	try {
// 		var finalresult = []
// 		var results = []
// 		var finalresult2 = []
// 		var finalresult3 = []
// 		var finalresult4 = []
// 		var finalresult5 = []
// 		var loadavatar = async function(sqlStr) {
// 			return await db.query(sqlStr)
// 		}
// 		var readavatar = async function(e) {
// 			return await ig.buff(e)
// 		}
// 		const idArray = req.params.ids.split(",")
// 		idArray.forEach(element => {
// 			results.push(new Promise((res, rej) => {
// 				res(loadavatar(`SELECT * FROM users WHERE id = '${element}'`))
// 			}))
// 		})
// 		Promise.all(results).then(data => {
// 			data.map(val => {
// 				finalresult.push(val)
// 			})
// 			finalresult.forEach(el => {
// 				if (el[0].avatar != 'default-avatar.png') {
// 					finalresult2.push(el[0])
// 				} else {
// 					finalresult5.push([el[0].id, 'default-avatar.png'])
// 				}
// 			})
// 			finalresult2.forEach(el => {
// 				finalresult3.push(new Promise((res, rej) => {
// 					res(readavatar('./uploads/' + (el.avatar).substr(7)))
// 				}))
// 			})
// 			Promise.all(finalresult3).then(data => {
// 				data.map(v => {
// 					finalresult4.push(v)
// 				})
// 				for (var i=0; i < finalresult2.length; i++) {
// 					finalresult5.push([finalresult2[i].id, finalresult4[i]])
// 				}
// 				console.log(finalresult5)
// 				res.status(200).json(finalresult5)
// 			})
// 		})
		
// 		// idArray.forEach(async function(element) {
// 		// 	const ret = await db.query(`SELECT * FROM users WHERE id = '${element}'`)
// 		// 	results.push(ret[0].avatar)	
// 		// })
// 		// console.log(results)
// 		// const sqlOrder = `SELECT * FROM users WHERE id In '${req.params.ids.split(",")}'`
// 		// const ret = await db.query(sqlOrder)
// 		// console.log(ret)
// 	} catch (err) {
// 		console.log(err)
// 		next(err)
// 	}
// }