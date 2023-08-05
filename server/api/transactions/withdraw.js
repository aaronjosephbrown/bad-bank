import client from '../../db/db-connect.js'

const withdraw = async (req, res) => {
  const { email, amount } = req.body
  const db = client.db('badbank')
  const collection = db.collection('users')

  const result = await collection
    .findOneAndUpdate(
      { email },
      { $inc: { balance: Number(-amount) } },
      { returnDocument: 'after' }
    )
    .catch((err) => {
      return res.status(500).json({ error: err.stack })
    })

  res.status(202).json({ balance: result.value.balance })
}

export default withdraw
