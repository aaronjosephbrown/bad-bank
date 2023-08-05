import client from '../../db/db-connect.js'

const sendMoney = async (req, res) => {
  const { sender, recipent, amount } = req.body
  console.log(sender, recipent, amount)
  const db = client.db('badbank')
  const collection = db.collection('users')

  const senderResult = await collection
    .findOne({
      email: sender,
    })
    .catch((err) => {
      return res.status(500).json({ error: err.stack })
    })

console.log(senderResult)


  if (senderResult.balance < amount) {
    return res.status(500).json({ error: 'Insufficient funds' })
  }

  const senderBalance = await collection
    .findOneAndUpdate(
      { email: sender },
      { $inc: { balance: Number(-amount) } },
      { returnDocument: 'after' }
    )
    .catch((err) => {
      return res.status(500).json({ error: err.stack })
    })

  const recipentResult = await collection
    .findOneAndUpdate(
      {
        email: recipent,
      },
      { $inc: { balance: Number(amount) } }
    )
    .catch((err) => {
      return res.status(500).json({ error: err.stack })
    })

  if (!recipentResult.ok === 1) {
    return res.status(500).json({ error: 'Something went wrong' })
  }

  return res
    .status(202)
    .json({ balance: senderBalance.value.balance, transaction: 'complete' })
}

export default sendMoney
