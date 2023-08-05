import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useRef } from 'react'
import { AccountContext } from '../context/accountContext'

const isAuthenticated = (account) => {
  if (!account || account.exp < Date.now() / 1000) {
    return false
  }
  return true
}

const ProtectedRoute = () => {
  const { account } = useContext(AccountContext)
  const navigate = useNavigate()

  const timeoutRef = useRef()

  useEffect(() => {
    if (!account) {
      return
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      if (account.exp < Date.now() / 1000) {
        navigate('/login')
      }
    }, account.exp * 1000 - Date.now() + 1000)

    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [account, navigate])

  const isAuth = isAuthenticated(account)

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace={true} />
  )
}
export default ProtectedRoute
