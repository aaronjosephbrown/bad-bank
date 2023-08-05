import axios from 'axios'
import { toast } from 'react-toastify'

const send = async (account, transaction, setAccount) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  axios
    .post(
      'http://localhost:5001/api/send',
      {
        sender: account.email,
        recipent: transaction.recipentEmail,
        amount: transaction.amount,
      },
      config
    )
    .then((res) => {
      setAccount({
        ...account,
        balance: res.data.balance,
      })
      toast.success('Cash sent successfully')
    })
    .catch((err) => {
      console.log(err)
    })
}

export default send
