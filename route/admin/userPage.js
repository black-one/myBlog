const { User }=require('../../model/user');

module.exports= async (req,res)=>{

	//标识 标识访问是用户
	 req.app.locals.currentLink = 'user';

	//实现分页功能
	let page=req.query.page || 1;
	// res.send(page);
	//设置也一页显示的数据
	let pagesize=2;
	//查询到的用户数据
	let count=await User.countDocuments({});
	// res.send('总的用户数据'+$(total))
	//总页数
	let total=Math.ceil(count/pagesize);
	// res.send('查询到的总页数'+total)


	
	//页码对应的数据查询开始的位置
	let start=(page-1)*pagesize;


	 let user=await User.find({}).limit(pagesize).skip(start)
	 // res.send(user)
	res.render('admin/user',{
		user:user,
		page: page,
		total: total

	});
}