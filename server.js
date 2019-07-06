const expess = require('express')
const app = expess()
const Users = require('./db').Users

const PORT = process.env.PORT || 3000


app.post('/login',(req, res)=>{
    Users.findOne({
        where: {
            email:req.body.email
        }
    }).then((user)=>{
        if(!user){
            return res.send('No such User')
        }
        if(user.password != req.body.password){
            return res.send('Wrong Password')
        }

        return res.send('Logged in Succesfully')
    })
})

app.post('/signup',(req,res)=>{
    Users.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    }).then((createdUser)=>{
        res.send('Signed up Successfully')
    })
})

app.listen(PORT, ()=>{
    console.log('listening on ' + PORT);
    
})