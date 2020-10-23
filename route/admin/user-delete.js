const { User }=require('../../model/user');
module.exports= async (req,res)=>{
	// res.send('ok')
	const id=req.query.id;
	let user=await User.findOneAndDelete({_id: id});
	res.redirect('/admin/user')
}