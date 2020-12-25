const jwt = require('../helpers/jwt');
const acl = require('../config/acl.json');

const checkAuthorization = (payload, req) => {
	let found = false;
	const aclType = payload.type;
	const url = req.originalUrl.split('/')[2].split('?')[0];
	const userAcl = acl[aclType];

	if (!userAcl[url]) return found;
	if (userAcl[url]) {
		if (userAcl[url][0] === '*') {
			found = true;
			return found;
		}
		found = userAcl[url].includes(req.method);
	}
	return found;
}

module.exports.jwt = async function (req, res, next) {
	let token = req.header('authorization') || req.header('token') || req.query.token;
	if (!token) {
		return next(new Error('user not authorized'));
	}
	// check token
	const payload = await jwt.decode(token);
	if (!payload) return next(new Error('auth_token_invalid'));
	// check authorization
	const checkAuth = checkAuthorization(payload, req);
	if (!checkAuth) return next(new Error('auth_user_unauthorized'));

	req.user = payload;
	next();
};