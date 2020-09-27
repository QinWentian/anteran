module.exports = errorHandler;
const util = require('../utils')

function errorHandler(err, req, res, next) {
    const errorJSON = {
        errors: []
      }
    switch (true) {
        case typeof err === 'string':
            // custom application error
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });
        case err.name === 'UnauthorizedError':
            // jwt authentication error
            errorJSON.errors.push({ status: 401, detail:'Authentication Error', message: 'Unauthorized' })
            return res.status(401).json(errorJSON);
        default:
            errorJSON.errors.push({ status: 500, detail:'Bad Request', message: err.message })
            return res.status(500).json(errorJSON);
    }
}