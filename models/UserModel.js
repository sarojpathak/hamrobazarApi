var dbConfig = require('../config/databaseConfig');
var users = dbConfig.sequelize.define('user',
    //attributes define
    {
        id:{
            type:dbConfig.Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        username:{
            type:dbConfig.Sequelize.TEXT,
            allowNull:false
        },
        password:{
            type:dbConfig.Sequelize.TEXT,
            allowNull:false
        }
    },
    {
        paranoid:true,
        freezeTableName:false,
        tableName:'user_table'
    })
users.sync({force:false})
    .then(function(result){
        console.log(result);
    })
    // .then(()=>{return users.create({
    // username:"Saroj Pathak",
    // password:"test"
    // });
    // });
    .catch(function(err){
        console.log(err);
    })
module.exports = users;
