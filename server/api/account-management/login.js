import findUser from './utils/findUser.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async (req, res) => {
  const { email, password } = req.body
  findUser({ email })
    .then((result) => {
      if (result === null) {
        return res.status(400).send('Email not found')
      } else if (result.email === email) {
        if (bcrypt.compareSync(password, result.password)) {
          const token = jwt.sign(
            {
              _id: result._id,
              email: result.email,
              balance: result.balance,
              name: result.name,
            },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
          )
          res.status(200).send(token)
        } else {
          res.status(400).send('Incorrect password')
        }
        return result
      }
    })
    .catch((err) => {
      return err.stack
    })
}


export default login
