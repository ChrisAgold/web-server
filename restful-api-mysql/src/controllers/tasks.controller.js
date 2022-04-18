const mysql = require('mysql');
const connection = require('../db-config');
const {
    ALL_JOB,
    SINGLE_JOB,
    INSERT_JOB,
    UPDATE_JOB,
    DELETE_JOB,
} = require('../queries/tasks.queries');
const query = require('../utils/query');
const { serverError } = require('../utils/handlers');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

// http://localhost:3000/tasks
exports.getAllJobs = async (req, res) => {
    // establish connection
    const con = await connection().catch((err) => {
        throw err;
    });

    // query all tasks
    const jobs = await query(con, ALL_JOBS(req.user.id), []).catch(
        serverError(res)
    );

    // [] === true, 0 === false
    if (!job.length) {
        res.status(200).json({ msg: 'No tasks available for this user.' });
    }
    res.json(jobs);
};

// http://localhost:3000/tasks/1
exports.getJob = async (req, res) => {
    // establish connection
    const con = await connection().catch((err) => {
        throw err;
    });

    // query all task
    const job = await query(
        con,
        SINGLE_JOB(req.user.id, req.params.jobId)
    ).catch(serverError(res));

    if (!job.length) {
        res.status(400).json({ msg: 'No tasks available for this user.' });
    }
    res.json(job);
};

// http://localhost:3000/tasks
/**
 * POST request -
 * {
 *  name: 'A task name'
 * }
 */
exports.createJob = async (req, res) => {
    // verify valid token
    const user = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

    // take result of middleware check
    if (user.id) {
        // establish connection
        const con = await connection().catch((err) => {
            throw err;
        });

        // query add task
        const jobName = mysql.escape(req.body.jobName);
        const result = await query(con, INSERT_TASK(user.id, jobName)).catch(
            serverError(res)
        );

        if (result.affectedRows !== 1) {
            res
                .status(500)
                .json({ msg: `Unable to add task: ${req.body.jobName}` });
        }
        res.json({ msg: 'Added task successfully!' });
    }
};

/**
 * Build up values string.
 *
 * @example
 * 'key1 = value1, key2 = value2, ...'
 * "task_name = \'Task 1\', status = \'complete\', date = \'<today's_date>\'"
 */
const _buildValuesString = (req) => {
    const body = req.body;
    const values = Object.keys(body).map(
        // [task_name, status].map()
        (key) => `${key} = ${mysql.escape(body[key])}` // 'New 1 task name'
    );

    values.push(`created_date = NOW()`); // update current date and time
    values.join(', '); // make into a string
    return values;
};

// http://localhost:3000/tasks/1
/**
 * PUT request -
 * {
 *  name: 'A task name',
 *  state: 'completed'
 * }
 */
exports.updateJob = async (req, res) => {
    // establish connection
    const con = await connection().catch((err) => {
        throw err;
    });
    const values = _buildValuesString(req);

    // query update task
    const result = await query(
        con,
        UPDATE_JOB(req.user.id, req.params.jobId, values)
    ).catch(serverError(res));

    if (result.affectedRows !== 1) {
        res
            .status(500)
            .json({ msg: `Unable to update task: '${req.body.jobName}'` });
    }
    res.json(result);
};

// http://localhost:3000/tasks/1
exports.deleteJob = async (req, res) => {
    // establish connection
    const con = await connection().catch((err) => {
        throw err;
    });

    // query delete task
    const result = await query(
        con,
        DELETE_JOB(req.user.id, req.params.jobId)
    ).catch(serverError(res));

    if (result.affectedRows !== 1) {
        res
            .status(500)
            .json({ msg: `Unable to delete job at: ${req.params.jobId}` });
    }
    res.json({ msg: 'Deleted successfully.' });
};
