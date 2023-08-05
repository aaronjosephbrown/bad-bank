import findUser from './utils/findUser.js'
import buildUser from './utils/buildUser.js'
import bcrypt from 'bcrypt'

const createAccount = async (req, res) => {
  const { email, password, name } = req.body

  let newAccount = await findUser({ email })
    .then((result) => {
      if (result === null) {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        return buildUser({ name, email, hashedPassword })
      } else if (result.email === email) {
        return res.status(400).send('Email already exists')
      }
    })
    .catch((err) => {
      return err.stack
    })
  res.status(201).send(newAccount.insertedId)
}

export default createAccount
