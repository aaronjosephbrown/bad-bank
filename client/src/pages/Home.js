import CreateAccount from '../components/CreateAccount'
import { useContext } from 'react'
import { AccountContext } from '../context/accountContext'
import BankImage from '../components/BankImage'

const Home = () => {
  const { account } = useContext(AccountContext)

  if (!account) {
    return (
      <div className='flex justify-center w-full'>
        <BankImage />
        <CreateAccount />
      </div>
    )
  }

  return (
    <div className='flex justify-center'>
      <BankImage />
    </div>
  )
}
export default Home
