// add middlewares here related to projects
const projects = require('./projects-model');

function validateProjectId(req, res, next) {
    projects.get(req.params.id)
        .then(project => {
            if(project) {
                req.project = project;
                next();
            } else {
                throw Error("Projects not found");
            }
        })
        .catch(err => {
            res.status(404).json({error: "Projects not found", ...err});
        })
}

function validateProject(req, res, next) {
    const { name, description, completed } = req.body;
    console.log(completed)
    if (!name) {
        res.status(400).json({ message: "Project is missing aa Name."});
    } else if (!description || description.length > 128) {
        res.status(400).json({ message: "A Description is required, and cannot have a length larger than 128."});
    } else if (completed === null || completed === undefined) {
        res.status(400).json({ message: "Project is missing Completed boolean."})
    } else {
        req.project = {name: name, description: description, completed: (completed || false)};
        next();
    }
}

module.exports = {
    validateProjectId,
    validateProject
}