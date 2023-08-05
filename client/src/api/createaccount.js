import axios from 'axios'
const createaccount = async (newUser) =>  {
  let { email, password, name } = newUser
  email = email.toLowerCase()

  try {
    const result = await axios.post(
      'http://localhost:5001/api/createaccount',
      {
        email,
        password,
        name
      }
    )
    return result.data
  } catch (error) {
    if (error.response.data === 'Email already exists') {
      return 'Email already exists'
    }
  }
}

export default createaccount