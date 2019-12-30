const Sequelize = require('sequelize');
const sequelize = new Sequelize('sof_api','root','root',{
    host: 'localhost',
    dialect:'mysql',
    logging:false
});
sequelize.authenticate()
// console.log(x);
// .then(()=>{console.log('Connection success')
// })
//  .catch(err => {
//    console.error('Unable to connect to the database:', err);
//   });
module.exports = {
    Sequelize,
    sequelize
}