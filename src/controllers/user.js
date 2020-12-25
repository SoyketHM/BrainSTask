const userCrud = require('../services/userCrud');
const _p = require('../helpers/simpleasync');
const hash = require('../helpers/password_hash');
const { createResponse } = require('../utils/responseGenerate');
const jwt = require('../helpers/jwt');


module.exports.createUser = async (req, res, next) => {
    if (req.body.password) {
        const hashPass = await hash.new(req.body.password);
        req.body.password = hashPass;
    }
    const [error, user] = await _p(userCrud.createUser(req.body));

    if (error) {
        console.log(error);
        return next(new Error('user creation failed'));
    }
    let token = '';
    if (user) {
        const payload = {
            id: user._id,
            name: user.name,
            type: user.type,
            status: user.status,
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        };
        token = await jwt.encode(payload);
    }

    return res.status(200).json(createResponse({ token, name: user.name }, 'user created successfully'));
};

module.exports.getUsers = async (req, res, next) => {
    const [error, categories] = await _p(userCrud.getUsers(req.query));

    if (error) {
        console.log(error);
        return next(new Error('user fetch error'));
    }
    return res.status(200).json(createResponse(categories));
};

module.exports.getUserById = async (req, res, next) => {
    const [error, user] = await _p(userCrud.getUserById(req.params.id));

    if (error) {
        console.log(error);
        return next(new Error('user fetch error'));
    }

    if (!user) {
        return res.status(200).json(createResponse(null, 'user not found'));
    }
    return res.status(200).json(createResponse(user));
};

module.exports.updateUserById = async (req, res, next) => {
    let [error, user] = await _p(userCrud.updateUserById(req.params.id, req.body));

    if (error) {
        console.log(error);
        return next(new Error('user access error'));
    }
    if (!user) {
        return res.status(200).json(createResponse(null, 'user not found'));
    }
    return res.status(200).json(createResponse(user, 'user updated successfully'));
};

module.exports.bannedUserById = async (req, res, next) => {
    let [error, user] = await _p(userCrud.bannedUserById(req.params.id, req.user.id));

    if (error) {
        console.log(error);
        return next(new Error('user access error'));
    }
    if (!user) {
        return res.status(200).json(createResponse(null, 'user not found'));
    }
    if (user.message) {
        return res.status(200).json(createResponse(null, user.message));
    }
    return res.status(200).json(createResponse(user, 'user repoted successfully'));
};

module.exports.loginUser = async (req, res, next) => {
    const [error, user] = await _p(userCrud.loginUser(req.body));
    if (!user) {
        return res.status(400).json(createResponse(null, 'user unauthorized!'));
    }    
    if (user) {  
        if (user.status === 'banned') return res.status(400).json(createResponse(null, 'you are banned!'));

        const varifyPass = await hash.verify(req.body.password, user.password);
        if (!varifyPass) {
            return res.status(500).json(createResponse(null, 'user info invalid!', true));
        }
    }

    if (error) {
        return next(new Error('user info invalid!'));
    }

    let token = '';
    if (user) {
        const payload = {
            id: user._id,
            type: user.type,
            status: user.status,
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        };
        token = await jwt.encode(payload);
    }

    return res.status(200).json(createResponse({ token, name: user.name }, 'user login successfully'));
};
