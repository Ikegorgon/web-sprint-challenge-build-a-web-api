const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.use(express.json());
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);
server.use('*', (req, res) => {
    res.status(404).send(`
        <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;width:25%;margin:auto;padding:20px;border:2px solid black;">
            <h1>Error 404: Page not Found</h1>
            <p>Sorry, but it seems that ${req.params.url} is not built out.</p>
            <a href='/api/projects'>Click Here for Projects</a>
            <a href='/api/actions'>Click Here for Actions</a>
        </div>
    `)
})

module.exports = server;