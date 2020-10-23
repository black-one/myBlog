const { Article }=require('../../model/article');
const pagination=require('mongoose-sex-page');

module.exports=async (req,res)=>{
	let page=req.query.page
	 req.app.locals.currentLink = 'article';


	// let article = await Article.find().populate('author');
	// res.send(article);
	// return;

	 //查询数据
	  let article = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();
	  // res.send(article);
	  // return;
	
	article = JSON.stringify(article);
    article = JSON.parse(article);

	 // res.send(article);
	 // return;

	// res.send('ok')
	res.render('admin/article',{
		article: article
	})
}