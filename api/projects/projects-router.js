// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const projects = require('./projects-model');
const middleware = require('./projects-middleware');

router.get('/', (req, res, next) => {
    projects.get()
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            next(err);
        })
})

router.get('/:id', middleware.validateProjectId, (req, res, next) => {
    projects.get(req.params.id)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            next(err);
        })
})

router.post('/', middleware.validateProject, (req, res, next) => {
    console.log(req.project)
    projects.insert(req.project)
        .then(() => {
            res.status(201).json(req.project);
        })
        .catch(err => {
            next(err);
        })
})

router.put('/:id', middleware.validateProjectId, middleware.validateProject, (req, res, next) => {
    projects.update(req.params.id, req.project)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            next(err);
        })
})

router.delete('/:id', middleware.validateProjectId, (req, res, next) => {
    projects.remove(req.params.id)
        .then(() => {
            res.status(200).json(req.project);
        })
        .catch(err => {
            next(err);
        })
})

router.get('/:id/actions', middleware.validateProjectId, (req, res, next) => {
    projects.getProjectActions(req.params.id)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            next(err);
        })
})

router.use((err, req, res) => {
    res.status(500).json(err);
})

module.exports = router;