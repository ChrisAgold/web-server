/**
 * Tables follow syntax:
 * - CREATE TABLE <table_name>(<column_name> <data_type> <options>, ...)
 *
 * Create a table called `tasks` (case-insensitive), with
 * - id as an integer/number that can't have null values, auto-increment it
 * - name with a max of 255 characters, cannot have null values
 * - created_date set to date and time created
 * - status with a max of 10 characters, has a default of 'pending'
 *
 * NOTE: order is important.
 * - columns can have multiple options attached (take `id` column for example)
 * - id is always first (helps with inserting)
 * - defaults always specified last (helps with inserting)
 */

exports.CREATE_JOBS_TABLE = `CREATE TABLE IF NOT EXISTS jobs(
                                                                  id int NOT NULL AUTO_INCREMENT,
                                                                  job_id int NOT NULL,
                                                                  jobName varchar(255) NOT NULL,
                                                                  created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
                                                                  status varchar(10) DEFAULT 'pending',
                                                                  PRIMARY KEY (id),
                                                                  FOREIGN KEY (job_id) REFERENCES users(user_id)
                              )`;

// Get every task
exports.ALL_JOBS = `SELECT * FROM jobs`;

// Get a single task by id
exports.SINGLE_JOB = `SELECT * FROM jobs WHERE job_id = ?`;

/**
 * Insert follows syntax:
 * - INSERT INTO <table_name>(<col_name1>, <col_name3>, <col_name3>, ...)
 *    VALUES(<value1>, <value2>, <value3>, ...)
 *
 * Create a new task in `tasks` table where
 * - column names match the order the are in the table
 * - `?` allow us to use params in our controllers
 */
exports.INSERT_JOB = `INSERT INTO jobs (job_id, jobName) VALUES (?, ?)`;

/**
 * Update follows syntax:
 * - UPDATE <table_name> SET <colum_name> = '<new_value>' WHERE <colum_name> = '<old_value>'
 *
 * NOTE: omitting `WHERE` will result in updating every existing entry.
 */
exports.UPDATE_JOB = `UPDATE jobs SET jobName = ?, status = ? WHERE id = ?`;

// Delete a task by id
exports.DELETE_JOB = `DELETE FROM jobs WHERE id = ?`;

// mysqld => start mysql server
// npm run start

// just for debugging shell  //
// mysql -u root -p => enter password


