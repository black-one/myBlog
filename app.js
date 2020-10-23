const express=require('express');
const path=require('path');
const app=express();
//引用body-parser用来处理post请求参数
const bodyPaser=require('body-parser');

//引入expres-session存储客服端的信息
const session=require('express-session');

//引入处理时间模式
const template=require('art-template');
const dateFormat=require('dateformat');

//引入morgan第三方模块
const morgan=require('morgan');
//引入cofig第三方模块
const config=require('config');

//对时间模式进行配置
template.defaults.imports.dateFormat=dateFormat;

//当渲染后缀为art的模板时，所使用的模板应青是什么
app.engine('art',require('express-art-template'));
//告诉express框架模板所在位置
app.set('views',path.join(__dirname,'views'));
// 告诉express框架模板的默认后缀是什么
app.set('view engine','art');

//数据库链接
require('./model/connect');
require('./model/user');


//开放静态资源访问服务
app.use(express.static(path.join(__dirname,'public')));
//处理post请求参数
app.use(bodyPaser.urlencoded({extended: false}))

//配置session
app.use(session({secret: 'secret key'}));

const home=require('./route/home');
const admin=require('./route/admin');


console.log(config.get('title'));
//配置开发环境
if(process.env.NODE_ENV=='development'){
	console.log('当前是开发环境')
	app.use(morgan('dev'))
}else{
	console.log('当前是生产环境')
}

//拦截请求，判断用户登录状态
app.use('/admin',require('./middleware/loginGuard'));

app.use('/home',home);
app.use('/admin',admin);

app.use((err,req,res,next)=>{
	const result=JSON.parse(err);
	let params=[];
	for(attr in result){
		if(attr !='path'){
			params.push(attr+'='+result[attr]);
		}
	}
	res.redirect(`${result.path}?${params.join('&')}`);
})


app.listen(3000);
console.log('服务器启动成功');
