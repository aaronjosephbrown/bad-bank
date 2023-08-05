import { useState, useEffect, useContext } from 'react'
import { AccountContext } from '../context/accountContext'
import formatToUSD from '../utils/formatToUSD'
import transactions from '../api/transactions'

const Transaction = ({ transactionType }) => {
  const [transaction, setTransaction] = useState({
    transactionType: '',
    amount: '',
  })

  const { account, setAccount } = useContext(AccountContext)

  useEffect(() => {
    setTransaction({
      transactionType: transactionType,
      amount: '',
    })
  }, [transactionType])

  const handleChange = (e) => {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    transactions(
      account.email,
      transaction.amount,
      transactionType,
      setTransaction,
      setAccount,
      account
    )
  }

  return (
    <div className='border rounded-lg p-6 flex justify-between mt-6 w-1/2'>
      <form className='space-y-6' method='PUT' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email' className='text-2xl font-semibold'>
            {transactionType.charAt(0).toUpperCase() + transactionType.slice(1)}
          </label>
          <div className='mt-2'>
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
          </div>
          <div className='mt-2'>
            <button
              type='submit'
              className='border border-black rounded-lg p-3 text-white bg-gray-500 hover:bg-gray-400'
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className='flex flex-col ml-6 items-center'>
        <div className='underline'>Available Balance</div>
        <div className='font-semibold'>{formatToUSD(account.balance)}</div>
      </div>
    </div>
  )
}
export default Transaction
