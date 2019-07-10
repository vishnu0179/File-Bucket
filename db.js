const Sequelize = require('sequelize')

const db = new Sequelize(
    'clientdb',
    'devuser',
    'devuser',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
)

const Users = db.define('users',{
    email:{
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    name : Sequelize.STRING
})

const Files = db.define('files',{
    filename:{
        type: Sequelize.STRING,
        allowNull: false
    },
    owner :{
        type : Sequelize.STRING,
        allowNull: false
    }
})

db.sync().then(()=>{
    console.log("database is ready")
})

exports = module.exports = {
    db, Users, Files
}