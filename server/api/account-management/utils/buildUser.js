import client from '../../../db/db-connect.js'

const buildUser = async (initAccount) => {
  let newAccount = null
  const { name, email, hashedPassword } = initAccount

  const user = {
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
    balance: 0,
  }

  try {
    const db = client.db('badbank')
    const collection = db.collection('users')
    newAccount = await collection
      .insertOne(user)
      .then((result) => {
        return result
      })
      .catch((err) => {
        return err.stack
      })
  } catch (err) {
    return err.stack
  }
  return newAccount
}

export default buildUser
