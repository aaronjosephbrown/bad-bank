import client from '../../../db/db-connect.js'

async function findUser(query) {
  let result = null

  const db = client.db('badbank')
  const collection = db.collection('users')
  result = collection
    .findOne(query)
    .then((result) => {
      return result
    })
    .catch((err) => {
      console.log(err.stack)
      return err.stack
    })
  return result
}

export default findUser
