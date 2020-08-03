var exp = require('express')
const multer = require('multer')
// const upload = multer({dest: 'uploads/images/'})
const fs = require('fs')
var storage = multer.diskStorage({
	//设置上传后文件路径，uploads文件夹会自动创建。
	destination: function (req, file, cb) {
		cb(null, 'public/')
	}, 
	//给上传文件重命名，获取添加后缀名
	filename: function (req, file, cb) {
		cb(null,  file.fieldname+'-'+Date.now()+file.originalname)
     }
 })
const upload = multer({storage: storage})
var router = exp.Router()
var userController = require('./controllers/users')
var topicController = require('./controllers/topics')
var commentController = require('./controllers/comments')
var sessionController = require('./controllers/session')
var imageController = require('./controllers/images')
function checkLogin(req, res, next) {
    if (!req.session.user) {
        console.log('ww');
        return res.status(403).json({
            error: "Unauthorized getaway!"
        })
    }
    next()
}
//用户资源
router
    .get('/users/:id', userController.find)
    .post('/users', userController.addnew)
    .patch('/users', checkLogin, userController.edit)
    .delete('/users/:id', checkLogin, userController.delete)
//话题资源
router
    .get('/topics', checkLogin,  topicController.find)
    .get('/topic/:id', checkLogin, topicController.findone)
    .get('/topics/:userId', checkLogin, topicController.findByUser)
    .post('/topics', checkLogin, upload.array('topicImages', 9), topicController.addnew)
    .patch('/topics/:id', topicController.edit)
    .delete('/topics/:id', topicController.delete)
//动态路由参数通过req.params获取,post请求体通过req.body获取,查询字符串通过req.query获取
//评论资源
router
    .get('/comments/all/:topicIds', checkLogin, commentController.findall)
    .get('/comments/:topicId', checkLogin, commentController.find)
    .post('/comments/:topicId', checkLogin, commentController.addnew)
    .patch('/comments/:id', checkLogin, commentController.edit)
    .delete('/comments/:id', checkLogin, commentController.delete)
//会话管理
router
    .get('/sessions', checkLogin, sessionController.find)
    .post('/sessions',sessionController.addnew)
    .delete('/sessions', checkLogin, sessionController.exit)

router
    .patch('/useravatar', checkLogin, upload.single('avatar'), imageController.updateAvatar)
    .get('/useravatar/:id', checkLogin, imageController.getAvatar)
// router.post('/test', upload.single('avatar'), (req, res) => {
// 	  console.log(req.file)
// 	  res.status(200).json("卢本伟hen牛逼")
router.get('/usersavatar/:ids', checkLogin, imageController.getAvatars)
// router
    // .post('/topicImages/:topicId', checkLogin, upload.array('topicImages', 9), imageController.newTopic)
    // .post('/topicImages/:topicId', checkLogin, upload.array('topicImages', 9), imageController.newTopic)
// })
// router.get('/lbw', userController.test)

module.exports = router