import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'dotenv/config'
import colors from 'colors'
import createAccount from './api/account-management/createAccount.js'
import login from './api/account-management/login.js'
import protect from './middleware/protect.js'
import deposit from './api/transactions/deposit.js'
import withdraw from './api/transactions/withdraw.js'
import sendMoney from './api/transactions/sendMoney.js'

const PORT = process.env.PORT || 5002

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('/api/createaccount', createAccount)
.post('/api/login', login)
.patch('/api/deposit', protect, deposit)
.patch('/api/withdraw', protect, withdraw)
.post('/api/send', protect, sendMoney)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`.underline.cyan)
})
