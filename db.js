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

db.sync().then(()=>{
    console.log("database is ready")
})

exports = module.exports = {
    db, Users
}