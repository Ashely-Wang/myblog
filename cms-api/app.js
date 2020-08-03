const exp = require('express')
const router = require('./router')
const session = require('express-session')
const app = exp()
const bp = require("body-parser")
app.use(bp.urlencoded({ extend: false }))
app.use(bp.json())
app.use(session({
    secret: 'itcast',
    resave: false,
    saveUninitialized: false
}))
app.all('*', function(req, res, next){
    res.header('Access-Control-Allow-Origin',  'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS'){
      res.send(200);
    }
    else{
      next();
    }
})
app.use('/public/', exp.static('./public/'))
// app.engine('html', require("express-art-template"))
app.use(router)
app.use((err, req, res, next) => {
    res.status(500).json({
        error: err.message
    })
})
app.listen(3000, function() {
    console.log("王诗雨加油！！")
})
//第三方包:
// body-parser
// blueimp-bm5
// mysql
// express-session
//multer