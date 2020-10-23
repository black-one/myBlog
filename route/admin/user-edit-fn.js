
const {	User,validateUser }=require('../../model/user');
//引入加密
const bcrypt=require('bcrypt');

module.exports=async (req,res,next)=>{
	//创建对象规则
	
	try{
		
		await	validateUser(req.body)
	}catch(e){
		// return res.redirect(`/admin/user-edit?message=${e.message}`);
		//Json.stringify() 将对象数据类型转换为字符串数据类型
		return next(JSON.stringify({path:'/admin/user-edit',message:e.message}))
	}

	//根据邮箱地址查询用户是否存在
	let user=await User.findOne({email:req.body.email});
	// res.send(user);
	//如果用户已经存在，邮箱地址已经被别人占用
	if( user){
		// return res.redirect(`/admin/user-edit?message=邮箱已经被占用`);
		return next(JSON.stringify({path:'/admin/user-edit',message: '邮箱已经被占用'}))
	}

	//对密码进行加密
	const salt=await bcrypt.genSalt(10);
	const password=await bcrypt.hash(req.body.password,salt);
	req.body.password=password;

	await User.create(req.body);
	res.redirect('/admin/user');

	

	//客户端传过来的参数，这是一个对象
	// res.send(req.body)
}