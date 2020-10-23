const mongoose=require('mongoose');


//创建规则
const articleSchema=new mongoose.Schema({
	title: {
		type: String,
		maxlength: 20,
		minlength: 4,
		required: [true,'请插入文章标题']
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true,'请传递作者']
	},
	publishDate: {
		type: Date,
		default: Date.now
	},
	cover: {
		type: String,
		default: null
	},
	content: {
		type: String
	}
})

const Article=mongoose.model('Article',articleSchema)

//4. 将集合做为模块成员导出
module.exports={
	Article
}