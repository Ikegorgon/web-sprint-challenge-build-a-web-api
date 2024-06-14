// add middlewares here related to actions
const actions = require('./actions-model');
const projects = require('../projects/projects-model');

function validateActionId(req, res, next) {
    actions.get(req.params.id)
        .then(action => {
            if(action) {
                req.action = action;
                next();
            } else {
                throw Error("Action not found");
            }
        })
        .catch(err => {
            res.status(404).json({error: "Action not found", ...err});
        })
}

async function validateAction(req, res, next) {
    const { project_id, description, notes, completed } = req.body;
    const project = await projects.get(project_id);
    if (!project_id || !project) {
        res.status(400).json({ message: "Action is missing an existing Project ID."});
    } else if (!description || description.length > 128) {
        res.status(400).json({ message: "A Description is required, and cannot have a length larger than 128."});
    } else if (!notes && notes !== "") {
        res.status(400).json({ message: "Action is missing a Notes section."});
    } else {
        req.action = {project_id: project_id, description: description, notes: notes, completed: (completed || false)};
        next();
    }
}

module.exports = {
    validateActionId,
    validateAction
}