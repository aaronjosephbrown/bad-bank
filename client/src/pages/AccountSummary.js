import { useContext } from 'react'
import { AccountContext } from '../context/accountContext'
import formatToUSD from '../utils/formatToUSD'

const AccountSummary = () => {
  const { account } = useContext(AccountContext)

  if (!account) {
    return null
  }

  return (
    <section className='border rounded-lg p-6 mt-6 w-1/2'>
      {account ? (
        <>
          <h2 className='text-2xl mb-2 font-bold'>Account Summary</h2>
          <div className='flex gap-2'>
            <p className='font-bold'>Account Holder:</p>
            <p>{account.name}</p>
          </div>
          <div className='flex gap-2'>
            <p className='font-bold'>Account Email:</p>
            <p>{account.email}</p>
          </div>
          <div className='flex gap-2'>
            <p className='font-bold'>Account Balance:</p>
            <p className='font-semibold'>{formatToUSD(account.balance)}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  )
}
export default AccountSummary
