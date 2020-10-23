
const { User }=require('../../model/user');
//引用加密
const bcrypt=require('bcrypt');


module.exports=async (req,res)=>{
	// res.send(req.body)
	const {email,password}=req.body;

	// if(email.trim().length==0 || password.trim().length==0)  return res.status(400).send('<h4>邮件或者密码错误</h4>')
	if(email.trim().length==0 || password.trim().length==0)  return res.status(400).render("admin/error",{
		msg: '邮件或者密码错误'
	});
	
	//根据邮箱地址查询信息
	let user=await User.findOne({email});

		
	//查询到了用户
	if(user){

		//明文密码和暗文密码的比对
			let isValid=await bcrypt.compare(password,user.password);
		if(isValid){
			//登录成功
			//将用户存储在请求对象中
			req.session.username=user.username;
			//将角色存在请求对象中
			req.session.role=user.role;
			// res.send('登陆成功')
			req.app.locals.userInfo=user;

			if(user.role=='admin'){
				res.redirect('/admin/user')
			}else{
				res.redirect('/home/')
			}

			
		}else {
			//登录失败
		 res.status(400).render("admin/error",{msg: '邮件或者密码错误'})

		}

	}else{
		//没哟查询到用户
		 res.status(400).render("admin/error",{msg: '邮件或者密码错误'})
	}
}