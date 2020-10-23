const { User }=require('../../model/user');

module.exports=async (req,res)=>{
	const { message,id }=req.query;
	 req.app.locals.currentLink = 'user';
	// res.send(message);
	//这一步自己写的时候搞错了，如果路由的id存在
	if(id){
		//修改操作
			let user=await User.findOne({_id: id});

			res.render('admin/user-edit',{
				message:message,
				user:user,
				button: '修改',
				link: '/admin/user-modify?id='+id

		});
	}else{
		// 添加操作
			res.render('admin/user-edit',{
				message:message,
				button: '添加',
				link: '/admin/user-edit'
		});
	}

	
	
}