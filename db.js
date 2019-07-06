const Sequelize = require('sequelize')

const db = new Sequelize(
    'clientdb',
    'root',
    'dell1234',
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

db.sync()

exports = module.exports = {
    db, Users
}