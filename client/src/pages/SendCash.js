import { useState, useContext } from 'react'
import { AccountContext } from '../context/accountContext'
import send from '../api/send'

const SendCash = () => {
  const { account, setAccount } = useContext(AccountContext)
  const [transaction, setTransaction] = useState({
    recipentEmail: '',
    amount: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
   send(account, transaction, setAccount)
   setTransaction({
      ...transaction,
      amount: '',
   })
  }
  const handleChange = (e) => {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className='border rounded-lg p-6 flex justify-between mt-6 w-1/2'>
      <form
        className='flex flex-col gap-2'
        method='POST'
        onSubmit={handleSubmit}
      >
        <label htmlFor='email' className='text-2xl font-semibold'>
          Recipent Email
        </label>
        <input
          id='recipentEmail'
          name='recipentEmail'
          type='email'
          className='border rounded'
          onChange={handleChange}
          value={transaction.recipentEmail}
        />
        <label htmlFor='amount' className='text-2xl font-semibold'>
          Amount
        </label>
        <input
          id='amount'
          name='amount'
          type='text'
          pattern='[0-9]*'
          inputMode='numeric'
          onChange={handleChange}
          value={transaction.amount}
          className='border rounded'
          required
        />
        <div className='mt-2'>
          <button
            type='submit'
            className='border border-black rounded-lg p-3 text-white bg-gray-500 hover:bg-gray-400'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
export default SendCash
