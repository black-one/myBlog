const mongoose=require('mongoose');
const config=require('config');
// console.log(config.get('db.host'))
mongoose.set('useCreateIndex', true)
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`,{ useUnifiedTopology: true , useNewUrlParser: true})
	.then(()=>console.log('数据库链接成功'))
	.catch(()=>console.log('数据库链接失败'))
