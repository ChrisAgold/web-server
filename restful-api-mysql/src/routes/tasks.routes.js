const express = require('express');
const controllers = require('../controllers/tasks.controller');

const jobsRoutes = express.Router();
/**
 * Express routes for Tasks.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all tasks. Evaluates to `/tasks/`.
 */
jobsRoutes.get('/', controllers.getAllJOBS).post('/', controllers.createJOB);

/**
 * Routes for a task by id. Evalutes to `/tasks/:taskId`.
 */
jobsRoutes
    .get('/:id', controllers.getJOB) // GET http://locahost:3000/tasks/1
    .put('/:id', controllers.updateJOB)
    .delete('/:id', controllers.deleteJOB);

module.exports = jobsRoutes;
