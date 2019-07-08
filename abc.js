Users.findOne({
    where: {
        email:req.body.email
    }
}).then((user)=>{
    if(!user){
        return done(null, false, {message: "No Such user"})
    }
    if(user.password != req.body.password){
        return done(null, false, {message: "Wrong Password"})
    }
    return done(null ,user)

}).catch((err)=>{
    return done(err)
})




Users.findOne({
    email : req.body.email
}).then((user)=>{
    if(!user){
        return done(new Error('No such User'))
    }
    done(null, user)

})