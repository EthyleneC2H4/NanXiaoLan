const cloud = require('wx-server-sdk');
cloud.init({  env: 'nanxiaolan-4g4j741id4f1e0e5' });

let wxContext;
const db = cloud.database();
const _ = db.command;

const getWhere = filtering=>{
	const where = {};
	filtering.forEach(f=> {
		switch (f.oper) {
			case 'eq': where[f.k] = _.eq(f.v); break;
			case 'like': where[f.k] =  db.RegExp({  regexp: `.*${f.v}*.`,  options: 'i' }); break;
			case 'this': where._openId = _.eq(wxContext.OPENID); break;
			default: break;
		}
	} )
	return where;
}

const select = body=>{
	const {filtering = [],page = 1,pageSize = 10,tb} = body;
	return db.collection(tb).where( getWhere(filtering) ).skip( (page - 1) * pageSize ).limit( pageSize ).get().then(r=> ({ code:200, data: r.data })).catch(e=> ({code:0, msg:e}));
}

const update = body=>{
	const { data,tb,filtering = [] } = body;
	return db.collection(tb).where( getWhere(filtering) ).update({ data }).then(r=>  ({ code: r.stats && r.stats.updated > 0 ? 200 : 0 })).catch(e=> ({code:0, msg:e}));
}
const create = body=>{
	const {  data,tb} = body;
	data._openId = wxContext.OPENID;
	return db.collection(tb).add({ data }).then(r=>  ({ code:  200  })).catch(e=> ({code:0, msg:e}));
}
const del = body=>{
	const {  data,tb,filtering = []} = body;
	return db.collection(tb).where( getWhere(filtering) ).remove().then(r=>  ({ code: r.stats && r.stats.removed > 0 ? 200 : 0 })).catch(e=> ({code:0, msg:e}));
}



exports.main = async (body, ctx) => {
	wxContext = cloud.getWXContext();
	console.log(body,wxContext)
	let res = {code: 0};
	switch (body.head) {
		// 增删改查
		case 'select': res = await select(body); break;
		case 'update': res = await update(body); break;
		case 'create': res = await create(body); break;
		case 'del': res = await del(body); break;
		
		case 'getOpenId': res = {code:200, data: wxContext.OPENID }; break;
		default: res = {code: 0}; break;
	}
	return res;
};
