const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ensahost_client_user',
  host: 'localhost',
  database: 'ensahost_client',
  password: 'ZCK,tCI8lv4o',
  port: 5432,
})

const getClients = (request, response) => {
    pool.query('SELECT * FROM clients ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getClientsById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM clients WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

module.exports = {
    getClients,
    getClientsById,
  }