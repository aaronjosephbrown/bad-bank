import axios from 'axios'
import { toast } from 'react-toastify'

export default async function transaction(
  email,
  amount,
  transactionType,
  setTransaction,
  setAccount,
  account
) {
  if (transactionType === 'deposit' && transaction.amount < 1) {
    return toast('Please enter a positive number')
  }
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  const result = await axios
    .patch(
      `http://localhost:5001/api/${transactionType}`,
      {
        email: email,
        amount: amount,
      },
      config
    )
    .then((res) => {
      setAccount({
        ...account,
        balance: res.data.balance,
      })
      setTransaction({
        amount: '',
      })
      toast(`${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} successful.`)
    })
    .catch((err) => {
      console.log(err)
    })
    console.log(result)
  return result
}
