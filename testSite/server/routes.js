import express from 'express'
import User from './models/user'
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index.ejs')
})

router.get('/login', (req, res) => {

    res.render('login.ejs')
})

router.post('/login', (req, res) => {
    User.findOne({username:req.body.username})
    .then(obj=>{
        if(!obj) throw new Error('No User');
        if(obj.hashPassword == req.body.password){
            return obj;
        } else {
            throw new Error('No User password');
        }
    })
    .then(obj=>{
        req.session.user = obj._id
        res.redirect('/')
    })
    .catch(err=>{
        console.log(err.message)
        res.redirect('/login')
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

router.post('/register', (req, res, next) => {
    let type = 0;
    if(req.body.username[0] == 'A')
        type = 1;
    const addUser = new User({
        username: req.body.username,
        hashPassword: req.body.password,
        email: req.body.email,
        type: type
    })
    addUser.save()
    .then(()=>{
        res.redirect('/login')
    }).catch((err)=>{
        next(err)
    })
    // (err)=>{
    //     if(err) return next(err)
    //     res.redirect('/login')
    // })
})


export default router
