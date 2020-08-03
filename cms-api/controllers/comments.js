const db = require("../models/db")
const { get } = require("../router")
exports.findall = async function(req, res, next) {
    try {
        const getpagecomments =async function(sqlOrder) {
            return await db.query(sqlOrder)
        }
        const topicIds = req.params.topicIds.split(",")
        const ret1 = []
        const ret2 = []
        const ret3 = []
        topicIds.forEach(element => {
            ret1.push(new Promise((res, rej) => {
                res(getpagecomments(`SELECT * FROM comments WHERE topic_id = '${element}'`))
            }))
        })
        Promise.all(ret1).then(data => {
            data.map(val => {
                if (val[0]) {
                    ret2.push({topicId: val[0].topic_id, comments: val})
                }
            })
            res.status(200).json(ret2) 
        })
    } catch(err) {
        next(err)
    }
}
exports.find = async function(req, res, next) {
    try {
        const sqlOrder = `SELECT * FROM comments WHERE topic_id = '${req.params.topicId}'`
        const ret = await db.query(sqlOrder)
        res.status(202).json(ret)
    } catch(err) {
        next(err)
    }
}
exports.edit = async function(req, res, next) {
    try {
        const sqlOrder = `SELECT * FROM comments WHERE id = '${req.params.id}'`
        const ret1 = await db.query(sqlOrder)
        if (!ret1[0]) {
            res.status(404).json("Not fount")
        }
        const sqlOrder2 = `UPDATE comments SET content = '${req.body.content}' WHERE id = '${req.params.id}'`
        const ret2 = await db.query(sqlOrder2)
        const ret3 = await db.query(sqlOrder)
        res.status(201).json([ret2,ret3])
    } catch(err) {
        next(err)
    }
}
exports.addnew = async function(req, res, next) {
    try {
        const sqlOrder = `INSERT INTO comments(content, create_time, modify_time, topic_id, user_id, reply_id) VALUES('${req.body.content}', DEFAULT, DEFAULT, '${parseInt(req.params.topicId)}','${req.session.user.id}', NULL)`
        const ret = await db.query(sqlOrder)
        res.status(201).json(ret)
    } catch(err) {
        console.log(err)
        next(err)
    }
}
exports.delete = async function(req, res, next) {
    try {
        const sqlOrder = `DELETE FROM comments WHERE id = ${req.params.id}`
        const ret = await db.query(sqlOrder)
        res.status(200).json(ret)
    } catch(err) {
        next(err)
    }
}