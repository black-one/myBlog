const formidable=require('formidable');
const path=require('path'); 

const { Article }=require('../../model/article');
module.exports=async (req,res)=>{
	const id=req.query.id;
	// const {title,cover,content}=req.body;
	// res.send('ok')
	// let articalone=await Article.findOne({_id:id});
	// return;
	

 	const form = new formidable.IncomingForm();
	form.uploadDir=path.join(__dirname,'../','../','public','uploads');
	form.keepExtensions=true;
	form.parse(req, async (err,fields,files)=>{

		await Article.updateOne({_id: id},{
			title: fields.title,
			publishDate: fields.publishDate,
			cover: files.cover.path.split('public')[1],
			content: fields.content
		});
		res.redirect('/admin/article');
	})

}
