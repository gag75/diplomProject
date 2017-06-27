import express from 'express'
import path from 'path'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import mongoose from './libs/mongoose'
import config from './config'
import router from './routes'
import engine from 'ejs-mate'

import User from './models/user'

const app = express()
const port = process.env.PORT || config.get('port')

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// app.use( morgan("combined", {}) )

app.use( bodyParser.urlencoded({ extended: true }) )

app.use( cookieParser() )

const MongoStore = require('connect-mongo')(session);
app.use( session({
    resave: false,
    saveUninitialized: false,
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use((req, res, next)=>{//auth
    req.user = res.locals.user = null
    if(!req.session.user)
        return next()
    User.findById(req.session.user).then(user=>{
        req.user = res.locals.user = user
        next()
    }).catch(err=>{
        return next()
    })
})

app.use(router)

app.use( express.static(path.join(__dirname, 'public')) )

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Ошибка сервера')
})

app.listen(port, (err) => {
    if (err) {
        console.error('Error listen http://localhost:%d', port)
    } else {
        console.log('Start server http://localhost:%d', port)
    }
})













////////////////////////////////////////////////

var rp = require('request-promise');

app.post('/callServer/loginCall', (req, res) => {
    if(!req.user){
        return res.status(403).send({message: 'Error success'})
    }
    var type = req.user.type;
    rp({
        method: 'POST',
        uri:"http://localhost:8080/api/getPeerId",
        body: {
            key: 'testKeys',
            userId: req.session.user,
            isAdmin: type
        },
        json: true
    }).then(parsedBody => {
        console.log(parsedBody)
        res.send({peerId: parsedBody.peerId, pass: parsedBody.pass})
    })
    .catch(err => {
        console.log(err)
        res.status(403).send({error: err})
    });
})
