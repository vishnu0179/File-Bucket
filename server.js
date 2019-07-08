const express = require('express')
const app = express()
const Users = require('./db').Users
const passport = require('./passport')
const session = require('express-session')
const bodyParser = require('body-parser')

var cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 3000

//appapp.use(express.bodyParser())
//app.use(express.cookieParser())



app.use(cookieParser())
app.use('/',express.static(__dirname))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//app.use(express.urlencoded({extended: true}))
app.use(session({
   secret: 'inofsdfiysdf-sd'
   //saveUninitialized: false,
   //resave: false
}))
app.use(passport.initialize())
app.use(passport.session())


app.post('/login',(req, res)=>{
    console.log('got a post request')
    passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/login'
    })(req,res)
})

app.post('/signup',(req,res)=>{
    Users.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    }).then((data)=>{
        res.send('Signed up Successfully')
    })
})

app.get('/', (req, res)=>{
    if(req.user){
        console.log(req.user)
        return res.send('Logged In Successfully')
    }
    else {
        res.redirect('/login')
    }
})



app.listen(PORT, ()=>{
    console.log('listening on ' + PORT);
    
})