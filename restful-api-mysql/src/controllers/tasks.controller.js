const con = require('../db-config');
const queries = require('../queries/tasks.queries');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

exports.getAllJOBS = function (req, res) {
    con.query(queries.ALL_JOBS, function (err, result, fields) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

// http://localhost:3000/tasks/1
exports.getJOB = function (req, res) {
    con.query(queries.SINGLE_JOBS, [req.params.jobId], function (err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

// http://localhost:3000/tasks/1
/**
 * POST request -
 * {
 *  name: 'A task name'
 * }
 */
exports.createJOB = function (req, res) {
    con.query(queries.INSERT_JOB, [req.body.jobName], function (err, result) {
        if (err) {
            res.send(err);
        }
        console.log(result);
        res.json({message: 'Number of records inserted: ' + result.affectedRows});
    });
};

// http://localhost:3000/tasks/1
/**
 * PUT request -
 * {
 *  name: 'A task name',
 *  state: 'completed'
 * }
 */
exports.updateJOB = function (req, res) {
    con.query(
        queries.UPDATE_JOB,
        [req.body.name, req.body.status, req.params.jobId],
        function (err, data) {
            if (err) {
                res.send(err);
            }
            res.json(data);
        }
    );
};

// http://localhost:3000/tasks/1
exports.deleteJOB = function (req, res) {
    con.query(queries.DELETE_JOB, [req.params.jobId], function (err) {
        if (err) {
            res.send(err);
        }
        res.json({message: 'Deleted successfully.'});
    });
};
