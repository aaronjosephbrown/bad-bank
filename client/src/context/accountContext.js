import { createContext, useState, useEffect } from 'react'

import login from '../api/login'

const AccountContext = createContext()

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(
    JSON.parse(localStorage.getItem('account')) || null
  )

  const handleLogin = async (email, password) => {
    return await login(email, password, setAccount)
  }

  const handleLogout = () => {
    setAccount(null)
    localStorage.removeItem('token')
    localStorage.removeItem('account')
    window.location.href = '/login'
  }

  useEffect(() => {
    if (account && (account.exp < Date.now() / 1000 || !localStorage.token)) {
      handleLogout()
    }
  }, [account])

  return (
    <AccountContext.Provider
      value={{ account, setAccount, handleLogin, handleLogout }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export { AccountContext, AccountProvider }
