const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('./db').Users


passport.serializeUser(function(user,done){

    done(null, user.email)
})

passport.deserializeUser(function(email, done){

    Users.findOne({
        email : email
    }).then((user)=>{
        if(!user){
            return done(new Error('No such User'))
        }
        done(null, user)
    
    })
    //done(null, user)
})

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},(email, password, done)=>{

    Users.findOne({
        where:{
            email: email
        }
    }).then((user)=>{
        console.log(user.password)
        if(!user){
            done(null, false, {message: "No Such user"})
        }
        if(user.password != password){
            done(null, false, {message: "Wrong Password"})
        }
        done(null ,user)
    
    })
}))

exports = module.exports = passport