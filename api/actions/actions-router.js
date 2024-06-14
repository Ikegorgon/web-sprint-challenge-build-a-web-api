// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const actions = require('./actions-model');
const middleware = require('./actions-middleware');

router.get('/', (req, res, next) => {
    actions.get()
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            next(err);
        })
})

router.get('/:id', middleware.validateActionId, (req, res, next) => {
    actions.get(req.params.id)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            next(err);
        })
})

router.post('/', middleware.validateAction, (req, res, next) => {
    actions.insert(req.action)
        .then(() => {
            res.status(201).json(req.action);
        })
        .catch(err => {
            next(err);
        })
})

router.put('/:id', middleware.validateActionId, middleware.validateAction, (req, res, next) => {
    actions.update(req.params.id, req.action)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            next(err);
        })
})

router.delete('/:id', middleware.validateActionId, (req, res, next) => {
    actions.remove(req.params.id)
        .then(() => {
            res.status(200).json(req.action);
        })
        .catch(err => {
            next(err);
        })
})

router.use((err, req, res) => {
    res.status(500).json(err);
})

module.exports = router;