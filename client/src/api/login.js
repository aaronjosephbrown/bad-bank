import axios from 'axios'
import jwt_decode from 'jwt-decode'

const login = async (email, password, setAccount) => {
  try {
    const response = await axios.post('http://localhost:5001/api/login', {
      email,
      password,
    })
    const token = await response.data
    setAccount(jwt_decode(token))
    localStorage.setItem('account', JSON.stringify(jwt_decode(token)))
    localStorage.setItem('token', token)
    return token
  } catch (error) {
    console.error(error)
  }
}

export default login
