const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ensahost_client_user',
  host: 'localhost',
  database: 'ensahost_client',
  password: 'ZCK,tCI8lv4o',
  port: 5432,
})

const getClients = (request, response) => {
    pool.query('SELECT id, key, name FROM clients ORDER BY id ASC', (error, results) => {
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

const createClient = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO clients (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}

module.exports = {
    getClients,
    getClientsById,
    createClient,
  }