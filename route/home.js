const express=require('express');
const home=express.Router();

//博客首页路由
home.get('/',require('./home/index'));

//文章详情页路由
home.get('/article',require('./home/article'))

//文章评论路由
home.post('/comment',require('./home/comment'))
module.exports=home;
