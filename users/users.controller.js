﻿const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const userService = require('./user.service');
const util = require('../utils')

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

async function authenticate(req, res, next) {
  try{
    await userService.authenticate(req.body)
    .then(user => res.json({status: 200, message: 'success', data: user}))
    .catch(err => {
      return util.responseError(
          res,
          {
            message: err.message,
            'status': 404
          }
        )
    })
  } catch(error){
    next(error)
  }
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
        email: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

async function register(req, res, next) {
  try {
    userService.create(req.body)
    .then(() => res.json({ status: 200, message: 'Registration successful' }))
    .catch(err => {
      return util.responseError(
          res,
          {
            message: err.message,
            'status': 404
          }
        )
    })
  } catch (error) {
    next(error)
  }
}

async function getAll(req, res, next) {
  try{
    await userService.getAll()
    .then(users => res.json({status: 200, message: 'success', data: users}))
    .catch(next);
  } catch (error) {
    next(error)
  }
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
        email: Joi.string().optional()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}