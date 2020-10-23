const { Article }=require('../../model/article');
const { Comment }=require('../../model/comment');

module.exports=async (req,res)=>{

	//接受客户端传递过来的文章id‘值
	const id=req.query.id;

	//根据id查询文章详细信息
	let article=await Article.findOne({_id: id}).populate("author");
	//根据id查询评论信息
	let comments=await Comment.find({aid: id}).populate('uid');
	// res.send(article)
	// return
	article=JSON.stringify(article)
	article=JSON.parse(article)
	comments=JSON.stringify(comments)
	comments=JSON.parse(comments)
	// res.send('欢迎来到博客详情页')
	res.render('home/article',{
		article,
		comments
	})
}