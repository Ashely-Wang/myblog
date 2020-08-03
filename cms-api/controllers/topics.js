const db = require("../models/db")
const jm = require("blueimp-md5")
exports.find = async function(req,res,next) {
    // try {
    //     if (req.query.all == "1") {
    //         const ret = await db.query(`SELECT COUNT(*) FROM topics`)
    //         res.status(200).json(ret)
    //     } else {
    //         const a = (req.query.page - 1) * 6
    //         const sqlStr_all = `SELECT * FROM topics limit ${a}, ${6}`
    //         const sqlStr_currentuser = `SELECT * FROM topics WHERE user_id = '${req.session.user.id}'`
    //         const sqlStr_someone = `SELECT * FROM topics WHERE user_id = '${req.body.id}'`
    //         const sqlStr_title = `SELECT * FROM topics WHERE title = '${req.body.title}'`
    //         const ret = await db.query(sqlStr_all)
    //         res.status(200).json(ret)
    //     }
    // } catch(err) {
    //     next(err)
    // }
    try {
        if (req.query.all == "1") {
            const ret = await db.query(`SELECT COUNT(*) FROM topics`)
            res.status(200).json(ret)
        } else {
            const ret = await db.query(`SELECT * FROM topics`)
            res.status(200).json(ret)
        }
    } catch(err) {

    }
}
exports.findone = async function(req, res, next) {
    try {
        const ret = await db.query(`SELECT * FROM topics WHERE id = '${req.params.id}'`)
        res.status(200).json(ret)
    } catch(err) {
        next(err)
    }
}
exports.findByUser = async function(req, res, next) {
    try {
        const ret = await db.query(`SELECT * FROM topics WHERE user_id = '${req.params.userId}'`)
        res.status(200).json(ret)
    } catch(err) {
        next(err)
    }
}
exports.edit = async function(req,res,next) {
    try {
        const ret1 = db.query(`SELECT * FROM topics WHERE id='${req.params.id}'`)
        const sqlStr = `UPDATE topics SET title='${req.body.title}', content='${req.body.content}', images='${req.body.images}' WHERE id='${req.params.id}'`
        const ret2 = await db.query(sqlStr)
        const ret3 = db.query(`SELECT * FROM topics WHERE id='${req.params.id}'`)
        res.status(201).json([ret2,ret3])   
    } catch(err) {
        console.log(err)
        next(err)
    }
}
exports.addnew = async function(req,res,next) {
    const qeq = []
    const qaq = JSON.parse(JSON.parse(JSON.stringify(req.body)).topicInfor)
    req.files.forEach(element => {
        qeq.push(element.path)
    })
    const sqlStr = `INSERT INTO topics(title, content, create_time, modify_time, user_id, images) VALUES('${qaq.title}', '${qaq.content}', DEFAULT, DEFAULT, '${req.session.user.id}', '${qeq}')`
     try {
        const ret = await db.query(sqlStr)
        const sqlStr2 = `SELECT * FROM topics WHERE id = '${ret.insertId}'`
        const topic = await db.query(sqlStr2)
        res.status(201).json(topic[0])
    } catch(err) {
        console.log(err)
        next(err)
    }
}
exports.delete = async function(req,res,next) {
    try {
        const sqlStr = `DELETE FROM topics WHERE id = '${req.params.id}'`
        const ret = await db.query(sqlStr)
        res.status(200).json(ret)
    } catch(err) {
        next(err)
    }
}