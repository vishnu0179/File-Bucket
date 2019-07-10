const express = require('express')
const app = express()
const Users = require('./db').Users
const Files = require('./db').Files
const passport = require('./passport')
const session = require('express-session')
const fs = require('fs')
const bodyParser = require('body-parser')

const s3 = require('./config/s3.config.js');

let fileUpload = require('express-fileupload')

var cookieParser = require('cookie-parser')

const s3Client = s3.s3Client;
const params = s3.Params;

const PORT = process.env.PORT || 3000


//appapp.use(express.bodyParser())
//app.use(express.cookieParser())


app.use(fileUpload())
//app.use(express.limit('11M'))
app.use(cookieParser())
app.use('/',express.static(__dirname))
app.use(bodyParser.urlencoded({extended: true, limit:'11mb' }))
app.use(bodyParser.json({limit:'11mb'}))
app.use(express.urlencoded({extended: true}))
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

app.post('/upload',(req, res)=>{
    
    if(req.user)
    {   
        console.log(req.user)
        if(req.files){
            const file = req.files.filename;
            const filename = file.name;
    
            params.Key = filename;
            params.Body = file.data;
    
            s3Client.upload(params, (err, data) => {
                if (err) {
                  res.status(500).json({error:"Error -> " + err});
                }
              });
            Files.create({
                filename: filename,
                owner: req.user.email
            }).then((data)=>{
                res.send("File uploaded successfully")
            })
        }
    }
    else{
        res.redirect('/login')
    }
    //res.send("success")
})


app.post('/download',(req,res)=>{
    if(req.user){
        let filePath = './data/'+req.body.key;
         var downloadParams = {
            Bucket: params.Bucket,
            Key: req.body.key
        }
        
        Files.findOne({
            filename: req.body.key
        }).then((file)=>{
            if(!file){
                res.send('File does not exist')
            }
            if(file.owner == req.user.email)
            {
                s3Client.getObject(downloadParams,(err, data)=>{
                    
                    if(err){console.error(err);}
                    
                    fs.writeFileSync(filePath, data.Body.toString())
                    res.send('File Downloaded at' + filePath)
                })

            }
            else{
                res.send('Access Denied')
            }
        })
        

        
    }
})


app.listen(PORT, ()=>{
    console.log('listening on ' + PORT);
    
})