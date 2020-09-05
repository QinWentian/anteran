/* eslint-disable no-throw-literal */
const Util = {}

module.exports = Util

Util.responseError = async (res, err) => {
  res.setHeader('content-type', 'application/vnd.api+json')
  res.status(err.status || 400)
  const errorJSON = {
    errors: []
  }

  if (err instanceof Array) {
    const adjustErr = err.map(r => {
      errorJSON.errors.push(r)
      return r
    })

    await Promise.all(adjustErr).then(errData => {
      res.json(errorJSON)
      return errData
    })
    return
  }

  console.error('capture error ===>', err)
  console.error('capture error MESSAGE  ===>', err.message)
  const newError = {
    status: err.status || 400,
    code: err.code || undefined,
    title: err.title || undefined,
    detail: err.detail || 'Bad request.',
    source: err.source || undefined,
    message: err.message || err.sqlMessage
  }
  errorJSON.errors.push(newError)
  res.json(errorJSON)
}

Util.responseSuccess = async (res, response) => {
  return res.send({
    success: true,
    data: response
  })
}

Util.responseNotFound = async (res, response) => {
  return res.send({
    success: true,
    data: response,
    message: 'data not found'
  })
}

Util.globalLogging = async (req) => {
  const logStatus = {
    type: 'GLOBAL_LOG',
    path: req ? `${req.originalUrl}` : null,
    date: new Date(),
    body: req ? JSON.stringify(req.body) : null,
    query: req ? JSON.stringify(req.query) : null,
    routes: req ? JSON.stringify(req.route) : null
  }
  console.log(logStatus)
}

