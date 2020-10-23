const mongoose=require('mongoose');
const Joi=require('joi');

//引入加密
const bcrypt=require('bcrypt');

const blogSchema=new mongoose.Schema({
	username: {
		type: String,
		required: true,
		moinlength: 2,
		maxlength:20
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	},
	state: {
		type: Number,
		default: 0
	}
});

//创建集合
const User=mongoose.model('User',blogSchema);

async function createUser(){
	const salt=await bcrypt.genSalt(10);
	const pass=await bcrypt.hash('123456',salt);
	
	const user=await User.create({
	username: 'jiangheng',
	email: 'heng@qq.com',
	password: pass,
	role: 'admin',
	state: 0
});

}

const validateUser = user =>{
	const schema={
		username: Joi.string().min(2).max(20).required().error(new Error('用户名不符合规则')),
		email: Joi.string().email().required().error(new Error('邮箱不符合规则')),
		password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不符合规则')),
		role: Joi.string().valid('admin','normal').required().error(new Error('角色值不合法')),
		state: Joi.number().valid(0,1).required().error(new Error('状态值非法'))
	}
	return Joi.validate(user,schema)
}
// createUser();

// User.create({
// 	username: 'zhuyeye',
// 	email: 'yeye@qq.com',
// 	password: '123',
// 	role: 'admin',
// 	state: 0
// }).then(()=>{
// 	console.log('用户创建成功')
// }).catch(()=>{
// 	console.log('用户创建失败')
// });

module.exports={
	User,
	validateUser
}