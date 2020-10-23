const { User }=require('../../model/user');
const bcrypt=require('bcrypt');

module.exports=async (req,res,next)=>{
	// res.send('ok')
	const {username,email,role,state,password}=req.body;
	const id=req.query.id;
	let  user=await User.findOne({_id: id});
	// res.send(user)
	// return ;
	const isValid= await bcrypt.compare(password,user.password);

	if(isValid){
		//密码正确
		//将用户信息更新到数据库中
		await User.updateOne({_id: id},{
			username: username,
			email: email,
			role: role,
			state: state
		})
		res.redirect('/admin/user');
	}else{
		//密码比对失败
		let obj={path: '/admin/user-edit',message: '密码比对失败，不能进行用户信息修改功能',id:id}
		next(JSON.stringify(obj));
	}
}
