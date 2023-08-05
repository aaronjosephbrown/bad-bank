import { useContext } from 'react'
import { AccountContext } from '../context/accountContext'

const Button = ({ title }) => {
  const { handleLogout } = useContext(AccountContext)

  const handleClick = () => {
    if (title === 'Logout') {
      handleLogout()
    } else if (title === 'Login') {
      window.location.href = '/login'
    }
  }
  return <button onClick={handleClick} className='text-white'>{title}</button>
}
export default Button
