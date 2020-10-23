
const { Article }=require('../../model/article');

module.exports=async (req,res)=>{
	//从模板a标签传过来的id是文章id 
	const id=req.query.id;
	req.app.locals.currentLink = 'article';
	// res.send(id);
	// return;
	// let articles=await Article.findOne({_id:id}).populate("author");
	// res.send(articles);
	// return;

	//查询当前数据
	
	// res.send(user);
	// return;

	if(id){
		let articles=await Article.findOne({_id:id}).populate("author");
		articles=JSON.stringify(articles)
		articles=JSON.parse(articles)

		req.app.locals.userId=articles.author._id;
		//修改操作
		res.render('admin/article-edit',{
			articles:articles,
			link: '/admin/article-modify?id='+id,
			button: '修改'
		});
		
	}else{
		//添加操作
		res.render('admin/article-edit',{		
			link: '/admin/article-add',
			button: '添加'
		});
		
	}
	
	
}

