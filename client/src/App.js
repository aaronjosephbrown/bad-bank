import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Login from './pages/Login'
import { AccountProvider } from './context/accountContext'
import AccountSummary from './pages/AccountSummary'
import ProtectedRoute from './components/ProtectedRoute'
import Withdraw from './pages/Withdraw'
import Deposit from './pages/Deposit'
import Container from './components/Container'
import Footer from './components/Footer'
import SendCash from './pages/SendCash'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <AccountProvider>
      <Router>
        <Nav />
        <Container>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/accountsummary' element={<AccountSummary />} />
              <Route path='/withdraw' element={<Withdraw />} />
              <Route path='/deposit' element={<Deposit />} />
              <Route path='/send' element={<SendCash />} />
            </Route>
          </Routes>
          <ToastContainer />
        </Container>
        <Footer />
      </Router>
    </AccountProvider>
  )
}

export default App
