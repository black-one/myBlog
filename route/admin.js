const express=require('express');
const admin=express.Router();


//渲染登录功能
admin.get('/login',require('./admin/loginPage'));


//实现登录功能
admin.post('/login',require('./admin/login'))

//实现退出功能路由
admin.get('/logout',require('./admin/logout'))


//创建用户列表页面
admin.get('/user',require('./admin/userPage'));


//创建用户编辑页面路由
admin.get('/user-edit',require('./admin/user-edit'));

// 实现用户添加功能路由
admin.post('/user-edit',require('./admin/user-edit-fn'));

admin.post('/user-modify', require('./admin/user-modify'))

//删除用户功能
admin.get('/user-delete',require('./admin/user-delete'))

//文章编辑页面路由
admin.get('/article',require('./admin/article'))

//文章编辑页面路由
admin.get('/article-edit',require('./admin/article-edit'))

admin.post('/article-add',require('./admin/article-add'))

admin.post('/article-modify',require('./admin/article-modify'))


module.exports=admin;
